# VanWatch
### Project Description
VanWatch is a mobile app aimed at helping travelers, business people, and residents in dangerous areas stay safe by providing real-time crime notifications, identifying high-potential crime occurrence regions, and offering personal safety tools. The app utilizes a comprehensive database of crime data combined with AI-powered algorithms to deliver accurate and timely information.

### Technologies Used
- Frontend: EJS
- Backend: Node.js
- Database: MongoDB
- Other Tech Tools: Google Maps API, Firebase
### File Contents
The file structure of the VanWatch project includes the following:

- README.md: Project documentation and instructions.
- index.js: Main server file for the backend.
- node_modules/: Folder containing project dependencies (not shown in the initial list).
- public/: Folder for public assets (not shown in the initial list).
- public/images/: Folder containing images for the frontend (not shown in the initial list).
- public/scripts/: Folder containing scripts for the frontend (not shown in the initial list).
- public/styles/: Folder containing stylesheets for the frontend (not shown in the initial list).
- public/service-worker.js: Service worker file for caching (not shown in the initial list).
- routes/: Folder containing server routes (not shown in the initial list).
- uploads/: Folder for uploaded files (not shown in the initial list).
- views/: Folder containing server-side views (not shown in the initial list).
- .gitignore: File specifying which files and directories to ignore in version control (not shown in the initial list).
- dev.txt: Text file for development purposes (not shown in the initial list).
- utils.js: JavaScript file with utility functions (not shown in the initial list).
### How to Install or Run the Project
To run the VanWatch project, follow these steps:

1. Clone the GitHub repository to your local machine.
2. Install Node.js and npm (Node Package Manager) if not already installed.
3. Install dependencies by running the command npm install in the project's root directory.
4. Set up a MongoDB database and obtain the connection URL.
5. Create a .env file in the root directory and add the following environment variables:
  - MONGODB_URL: URL for connecting to the MongoDB database.
  - GOOGLE_MAPS_API_KEY: API key for Google Maps integration.
  - FIREBASE_CONFIG: Firebase configuration object for push notifications.
6. Start the backend server by running node index.js or npm start in the root directory.
7. Navigate to the src/ directory and install frontend dependencies by running npm install.
8. Start the app on an Android or iOS emulator by running npx react-native run-android or npx react-native run-ios, respectively.
For more detailed instructions and configuration options, refer to the Installation Guide.

### How to Use the Product (Features)
VanWatch offers the following features to users:

1. Real-time Crime Notifications: Users receive instant notifications about nearby crimes based on their location.
2. Crime Occurrence Regions: The app highlights areas with a high potential for crime occurrence, helping users stay vigilant.
3. Personal Safety Tools: VanWatch provides safety tips, emergency contact numbers, and a panic button to alert authorities.
4. User Profile: Users can create profiles, customize their settings, and track their safety history.
5. Reporting Crimes: Users can report crimes they witness or become victims of, contributing to a collective safety network.
For a detailed overview of the app's features, please refer to the User Guide.

### Credits, References, and Licenses
- The VanWatch project utilizes crime data from various open data sources, including local law enforcement agencies.
- The Google Maps API is used for mapping and location services.
- Firebase is used for push notification services.
- TensorFlow is used for AI-powered analysis and predictions.
###How AI was Used
1. AI in App Development: AI services were utilized to enhance the app's functionality, such as natural language processing for sentiment analysis in crime reports, image recognition for automatic license plate reading, and predictive analytics for identifying potential crime hotspots.
2. AI in Data Cleaning: AI algorithms were employed to clean and preprocess crime datasets, removing inconsistencies and errors, and ensuring accurate and reliable information for analysis.
3. AI in App Functionality: The VanWatch app utilizes AI algorithms for crime prediction and identification of high-potential crime occurrence regions. These algorithms analyze historical crime data and patterns to provide users with proactive safety information.
4. Limitations and Overcoming Them: One limitation encountered was the availability and quality of crime data from open data sources. To overcome this, data cleaning techniques and AI algorithms were applied to handle missing or incomplete data. Additionally, the app relies on user-generated crime reports to supplement the existing data and improve accuracy over time.
### Contact Information
For any inquiries or feedback, please contact our team at vanwatch@example.com.
