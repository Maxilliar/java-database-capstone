import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js';

// Initialize Global Variables
const patientTableBody = document.querySelector('#patientTableBody');
const searchBar = document.querySelector('#searchBar');
const todayButton = document.querySelector('#todayButton');
const datePicker = document.querySelector('#datePicker');

let selectedDate = new Date().toISOString().split('T')[0];
const token = localStorage.getItem('token');
let patientName = "null";

// Setup Search Bar Functionality
searchBar.addEventListener('input', (e) => {
    const inputValue = e.target.value.trim();
    patientName = inputValue ? inputValue : "null";
    loadAppointments();
});

// Bind Event Listeners to Filter Controls

// "Today's Appointments" button
todayButton.addEventListener('click', () => {
    selectedDate = new Date().toISOString().split('T')[0];
    datePicker.value = selectedDate;
    loadAppointments();
});

// Date picker
datePicker.addEventListener('change', (e) => {
    selectedDate = e.target.value;
    loadAppointments();
});

// Define loadAppointments() Function
async function loadAppointments() {
    try {
        // Step 1: Fetch appointments from the backend
        const appointments = await getAllAppointments(selectedDate, patientName, token);
        
        // Step 2: Clear existing content
        patientTableBody.innerHTML = '';

        // Step 3: Handle no appointments
        if (!appointments || appointments.length === 0) {
            patientTableBody.innerHTML = '<tr><td colspan="100%" style="text-align: center;">No Appointments found for today.</td></tr>';
            return;
        }

        // Step 4: Render appointments
        appointments.forEach(app => {
            const patient = {
                id: app.id || app.patientId,
                name: app.name || app.patientName,
                phone: app.phone || app.patientPhone,
                email: app.email || app.patientEmail,
                ...app 
            };
            
            const row = createPatientRow(patient);
            
            // Safely handle string or DOM node return types from createPatientRow
            if (typeof row === 'string') {
                patientTableBody.insertAdjacentHTML('beforeend', row);
            } else {
                patientTableBody.appendChild(row);
            }
        });

    } catch (error) {
        // Step 5: Error handling
        console.error("Error fetching appointments:", error);
        patientTableBody.innerHTML = '<tr><td colspan="100%" style="text-align: center; color: red;">Error loading appointments. Try again later.</td></tr>';
    }
}

// Initial Render on Page Load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderContent === 'function') {
        renderContent();
    }
    
    // Sync UI with default selectedDate
    if (datePicker) {
        datePicker.value = selectedDate;
    }
    
    loadAppointments();
});
