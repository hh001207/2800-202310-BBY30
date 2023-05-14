function editUserInfo() {
    document.getElementById("personalInfoFields").removeAttribute("disabled");
  }
  
  function saveUserInfo() {
    const username = document.getElementById("usernameInput").value;
    const firstname = document.getElementById("nameInput").value;
    const lastname = document.getElementById("nameInput").value;
    const gender = document.getElementById("genderInput").value;
    const age = document.getElementById("ageInput").value;
    const job = document.getElementById("jobInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("password").value;

    currentUser
    .update({
      username: userName,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      age: age,
      job: job,
      email: email,
      password: password
    })
    .then(() => {
      console.log("Document successfully updated!");
    });
  document.getElementById("personalInfoFields").disabled = true;
  }
  
//   function userSession () {
//     if (req.session.authenticated)
//   }