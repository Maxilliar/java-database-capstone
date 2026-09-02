// Import the base API URL from the config file
import { API_BASE_URL } from "../config/config.js";

// Define a constant DOCTOR_API to hold the full endpoint for doctor-related actions
const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
  try {
    // Use fetch() to send a GET request to the DOCTOR_API endpoint
    const response = await fetch(DOCTOR_API);
    
    // Convert the response to JSON
    const data = await response.json();
    
    // Return the 'doctors' array from the response (fallback to data if structured differently)
    return data.doctors || data; 
  } catch (error) {
    // If there's an error (e.g., network issue), log it and return an empty array
    console.error("Error fetching doctors:", error);
    return [];
  }
}

export async function deleteDoctor(id, token) {
  try {
    // Use fetch() with the DELETE method
    // The URL includes the doctor ID and token as path parameters
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`, {
      method: 'DELETE'
    });
    
    // Convert the response to JSON
    const data = await response.json();
    
    // Return an object with success status and message
    return {
      success: response.ok,
      message: data.message || "Doctor deleted successfully."
    };
  } catch (error) {
    // If an error occurs, log it and return a default failure response
    console.error("Error deleting doctor:", error);
    return { 
      success: false, 
      message: "An unexpected error occurred while deleting the doctor." 
    };
  }
}

export async function saveDoctor(doctor, token) {
  try {
    // Use fetch() with the POST method
    // URL includes the token in the path
    const response = await fetch(`${DOCTOR_API}/${token}`, {
      method: 'POST',
      // Set headers to specify JSON content type
      headers: {
        'Content-Type': 'application/json'
      },
      // Convert the doctor object to JSON in the request body
      body: JSON.stringify(doctor)
    });
    
    // Parse the JSON response
    const data = await response.json();
    
    // Return success status and message from the server
    return {
      success: response.ok,
      message: data.message || "Doctor saved successfully."
    };
  } catch (error) {
    // Catch and log errors, return a failure response if an error occurs
    console.error("Error saving doctor:", error);
    return { 
      success: false, 
      message: "An unexpected error occurred while saving the doctor." 
    };
  }
}

export async function filterDoctors(name, time, specialty) {
  try {
    // Ensure empty parameters don't break the URL route path (using 'all' or 'null' as placeholders)
    const filterName = name || 'all';
    const filterTime = time || 'all';
    const filterSpecialty = specialty || 'all';

    // Use fetch() with the GET method
    // Include the name, time, and specialty as URL path parameters
    const response = await fetch(`${DOCTOR_API}/${filterName}/${filterTime}/${filterSpecialty}`);
    
    // Check if the response is OK
    if (response.ok) {
      // If yes, parse and return the doctor data
      const data = await response.json();
      return data; // returning the data (which usually contains the doctors list)
    } else {
      // If no, log the error and return an object with an empty 'doctors' array
      console.error(`Failed to filter doctors. Status: ${response.status}`);
      return { doctors: [] };
    }
  } catch (error) {
    // Catch any other errors, alert the user, and return a default empty result
    console.error("Error filtering doctors:", error);
    alert("An error occurred while trying to filter doctors. Please try again.");
    return { doctors: [] };
  }
}