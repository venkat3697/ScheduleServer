// Import the fetch function from node-fetch
import fetch from "node-fetch";

const getGoogleOAuthToken = async () => {
  try {
    const response = await fetch(
      "https://developers.google.com/oauthplayground/?code=4/0AVG7fiSb7tt7FpHkYCxgsk5wPbwFgCMYbqEibhahnXX5VHMhGVpoJ-6tX90vuzEIHr2L2A&scope=https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/calendar.events"
    );
    console.log("Access Token:", response);
  } catch (error) {
    console.log(error);
  }
};
// Call the function to test it
getGoogleOAuthToken();
