// Import Required Modules
import { openModal } from '../components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

// When the DOM is fully loaded:
document.addEventListener("DOMContentLoaded", () => {
  // Attach a click listener to the "Add Doctor" button
  // When clicked, it opens a modal form using openModal('addDoctor')
  const addDocBtn = document.getElementById('addDocBtn');
  if (addDocBtn) {
    addDocBtn.addEventListener('click', () => {
      openModal('addDoctor');
    });
  }

  // Call loadDoctorCards() to fetch and display all doctors on page load
  loadDoctorCards();

  // Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  // On any input change, call filterDoctorsOnChange()
  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
  if (filterSpecialty) filterSpecialty.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  try {
    // Clear the current content area
    const contentDiv = document.getElementById("content");
    if (!contentDiv) return;
    contentDiv.innerHTML = ""; 

    // Call getDoctors() from the service layer
    const doctors = await getDoctors();
    
    // For each doctor returned: Create a doctor card and append it to the content div
    renderDoctorCards(doctors);
  } catch (error) {
    // Handle any fetch errors by logging them
    console.error("Failed to load doctor cards:", error);
  }
}

async function filterDoctorsOnChange() {
  try {
    // Read values from the search bar and filters
    // Normalize empty values to null
    const name = document.getElementById("searchBar")?.value.trim() || null;
    const time = document.getElementById("filterTime")?.value || null;
    const specialty = document.getElementById("filterSpecialty")?.value || null;

    // Call filterDoctors(name, time, specialty) from the service
    const response = await filterDoctors(name, time, specialty);
    
    // Check if the response contains the doctors list or is the list itself
    const filteredDoctors = response.doctors || response || [];

    // Render them using renderDoctorCards()
    renderDoctorCards(filteredDoctors);
  } catch (error) {
    // Catch and display any errors with an alert
    console.error("Error filtering doctors:", error);
    alert("An error occurred while filtering doctors.");
  }
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return;
  
  // Clear the content area
  contentDiv.innerHTML = "";

  // If no doctors match the filter, show a message
  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = "<p class='no-doctors-msg'>No doctors found.</p>";
    return;
  }

  // Loop through the doctors and append each card to the content area
  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

window.adminAddDoctor = async function (event) {
  if (event) event.preventDefault(); // Prevent default form submission if triggered by a form

  // Collect input values from the modal form
  // Includes name, email, phone, password, specialty, and available times
  const name = document.getElementById("docName")?.value;
  const specialty = document.getElementById("docSpecialty")?.value;
  const email = document.getElementById("docEmail")?.value;
  const password = document.getElementById("docPassword")?.value;
  const phone = document.getElementById("docPhone")?.value;

  // Collect any checkbox values for doctor availability
  const availability = [];
  const timeCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
  timeCheckboxes.forEach(checkbox => {
    availability.push(checkbox.value);
  });

  // Retrieve the authentication token from localStorage
  const token = localStorage.getItem("token");
  
  // If no token is found, show an alert and stop execution
  if (!token) {
    alert("Session expired or invalid login. Please log in as Admin.");
    return;
  }

  // Build a doctor object with the form values
  const doctor = {
    name,
    specialty,
    email,
    password,
    phone,
    availability
  };

  try {
    // Call saveDoctor(doctor, token) from the service
    const response = await saveDoctor(doctor, token);

    // If save is successful:
    if (response && response.success) {
      // Show a success message
      alert(response.message || "Doctor added successfully!");
      
      // Close the modal and reload the page or doctor list
      const modal = document.getElementById("addDoctorModal"); // Adjust modal ID if needed
      if (modal) modal.style.display = 'none';
      
      // Refresh the doctor list
      await loadDoctorCards();
    } else {
      // If saving fails, show an error message
      alert(response?.message || "Failed to add doctor.");
    }
  } catch (error) {
    console.error("Error saving doctor:", error);
    alert("An unexpected error occurred while adding the doctor.");
  }
};