// for testing my Code, I keep the code in this file;however, the main function is for user report crime issues.
require("./units.js");

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const port = process.env.PORT || 3000;
const app = express();
const Joi = require('joi');

const expireTime = 24 * 60 * 60 * 1000;

const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;

const node_session_secret = process.env.NODE_SESSION_SECRET;

var {database} = include('databaseConnection');

app.set('view engine', 'ejs');
const userCollection = database.db(mongodb_database).collection('users');
// const shareCollection = database.db(mongodb_database).collection('shares');
// const shareCollection = (req) => database.db(mongodb_database).collection(req.session.username);

const shareCollection = (req) => {
	console.log('req.session.username:', req.session.username);
	return database.db(mongodb_database).collection(req.session.username);
  };
app.use(express.json());
app.use(express.urlencoded({extended: false}));

var mongoStore = MongoStore.create({
	    mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
	    crypto: {
			     secret: mongodb_session_secret
		}
});

app.use(session({
	    secret: node_session_secret,
	        store: mongoStore,
	        saveUninitialized: false,
			resave: true,
}
));

app.get('/', (req, res) => {
	res.send(`
        <h1>Ning's Page</h1>
        <ul>
            <li><a href="/SignUp">Sign Up</a></li>
            <li><a href="/login">Log in</a></li>
        </ul>
    `);
});



app.get('/nosql-injection', async (req,res) => {
	var username = req.query.user;

	if (!username) {
		res.send(`<h3>no user provided - try /nosql-injection?user=name</h3> <h3>or /nosql-injection?user[$ne]=name</h3>`);
		return;
	}
	console.log("user: "+username);

	const schema = Joi.string().max(20).required();
	const validationResult = schema.validate(username);

	//If we didn't use Joi to validate and check for a valid URL parameter below
	// we could run our userCollection.find and it would be possible to attack.
	// A URL parameter of user[$ne]=name would get executed as a MongoDB command
	// and may result in revealing information about all users or a successful
	// login without knowing the correct password.
	if (validationResult.error != null) {  
	   console.log(validationResult.error);
	   res.send("<h1 style='color:darkred;'>A NoSQL injection attack was detected!!</h1>");
	   return;
	}	

	const result = await userCollection.find({username: username}).project({username: 1, password: 1, _id: 1}).toArray();

	console.log(result);

    res.send(`<h1>Hello ${username}</h1>`);
});

app.get('/about', (req,res) => {
    var color = req.query.color;

    res.send("<h1 style='color:"+color+";'>Ning Feng</h1>");
});

app.get('/content', (req,res) => {
	Content.find({}, (err, content) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.render('content', {content: content});
		}
	});
});

app.get('/contact', (req,res) => {
    var missingEmail = req.query.missing;
    var html = `
        email address:
        <form action='/submitEmail' method='post'>
            <input name='email' type='text' placeholder='email'>
            <button>Submit</button>
        </form>
    `;
    if (missingEmail) {
        html += "<br> email is required";
    }
    res.send(html);
});

app.get('/SignUp', (req,res) => {
    var html = `
    Sign Up
    <form action='/submitUser' method='post'>
    <input name='username' type='text' placeholder='username'>
	<br>
	<input name = 'email' type='text' placeholder='email'>
	<br>
    <input name='password' type='password' placeholder='password'>
	<br>
    <button>Submit</button>
    </form>
    `;
    res.send(html);
});



app.post('/submitEmail', (req,res) => {
    var email = req.body.email;
    if (!email) {
        res.redirect('/contact?missing=1');
    }
    else {
        res.send("Thanks for subscribing with your email: "+email);
    }
});


app.get('/createUser', (req,res) => {
    var html = `
    create user
    <form action='/submitUser' method='post'>
    <input name='username' type='text' placeholder='username'>
    <input name='password' type='password' placeholder='password'>
    <button>Submit</button>
    </form>
    `;
    res.send(html);
});


app.get('/login', (req,res) => {
    var html = `
    log in
    <form action='/loggingin' method='post'>
    <input name='username' type='text' placeholder='username'>
    <input name='password' type='password' placeholder='password'>
    <button>Submit</button>
    </form>
    `;
    res.send(html);
});

app.post('/submitUser', async (req,res) => {
    var username = req.body.username;
    var password = req.body.password;

	const schema = Joi.object(
		{
			username: Joi.string().alphanum().max(20).required(),
			password: Joi.string().max(20).required()
		});
	
	const validationResult = schema.validate({username, password});
	if (validationResult.error != null) {
	   console.log(validationResult.error);
	   res.redirect("/createUser");
	   return;
   }

    var hashedPassword = await bcrypt.hash(password, saltRounds);
	
	await userCollection.insertOne({username: username, password: hashedPassword});
	console.log("Inserted user");

    var html = "successfully created user";
    res.send(html);
});

app.post('/loggingin', async (req,res) => {
    var username = req.body.username;
    var password = req.body.password;

	const schema = Joi.string().max(20).required();
	const validationResult = schema.validate(username);
	if (validationResult.error != null) {
	   console.log(validationResult.error);
	   res.redirect("/login");
	   return;
	}

	const result = await userCollection.find({username: username}).project({username: 1, password: 1, _id: 1}).toArray();

	console.log(result);
	if (result.length != 1) {
		console.log("user not found");
		res.redirect("/login");
		return;
	}
	if (await bcrypt.compare(password, result[0].password)) {
		console.log("correct password");
		req.session.authenticated = true;
		req.session.username = username;
		req.session.cookie.maxAge = expireTime;

		res.redirect('/loggedIn');
		return;
	}
	else {
		console.log("incorrect password");
		res.redirect("/login");
		return;
	}
});

app.get('/loggedin', (req,res) => {
    if (!req.session.authenticated) {
        res.redirect('/login');
    }
    var html = `
    You are logged in!
    `;
    res.send(html);
});
function requireAuth(req, res, next) {
	if (req.session.authenticated) {
	  next();
	} else {
	  res.redirect('/login');
	}
  }
  
app.use('/report', requireAuth);

app.get('/reportsucceed', (req, res) => {
	res.render('reportsucceed');
  });
  

app.get('/report', (req, res) => {
	res.render('report'); 
  });

app.post('/report', async (req, res) => {
	console.log('Handling share request1...');
	console.log('Request body:', req.body);
	if (!req.session.authenticated) {
	  res.redirect('/login');
	  return;
	}
	
	const { title, year, month, day, description, street, city, postCode } = req.body;
	const location = `${street}, ${city}, ${postCode}`;
	console.log('Location:', street, city, postCode);

  const share = {
	_id: null,
	userId: req.session.username,
    title: title || '',
	//let system to get the current date
	year: new Date().getFullYear(),
	month: new Date().getMonth() + 1,
	day: new Date().getDate(),
    description: description || '',
	location: location || '',
  };

  try {
    const shareCollection = database.db(mongodb_database).collection('shares');
    const result = await shareCollection.insertOne(share);
	console.log('Share created successfully:', result);
    res.render('reportsucceed');
  } catch (error) {
    console.error('Error adding share:', error);
    res.status(500).send(`Error adding share: ${error.message}`);
  }
});



app.get('/review', (req, res) => {
	// Add this line to check the request URL and method
	console.log(req.url, req.method); 
    // Query the database to retrieve the data
    userCollection.find().toArray((err, data) => {
      if (err) throw err;
	  console.log(data);
      // Render the EJS template with the data and send it to the client
      res.render('review_write', { data: data });
    });
  });

app.get('/logout', (req,res) => {
	req.session.destroy();
    var html = `
    You are logged out.
    `;
    res.send(html);
});


app.use(express.static(__dirname + "/public"));

app.get("*", (req,res) => {
	res.status(404);
	res.send("Page not found - 404");
})

app.listen(port, () => {
	console.log("Node application listening on port "+port);
});
