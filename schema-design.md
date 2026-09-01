## MySQL Database Design

### Table: Admin
- id: INT, Primary Key, Auto Increment
- username: VARCHAR(50), Not Null, Unique
- password_hash: VARCHAR(255), Not Null
- email: VARCHAR(100), Not Null, Unique
- created_at: DATETIME, Default CURRENT_TIMESTAMP

Used to securely authenticate administrators. Formats for email should be validated in the Application Layer (Spring Boot) before hitting the database.


### Table: Doctors
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(50), Not Null
- last_name: VARCHAR(50), Not Null
- email: VARCHAR(100), Not Null, Unique
- password_hash: VARCHAR(255), Not Null
- specialization: VARCHAR(100), Not Null
- phone: VARCHAR(20)
- is_active: BOOLEAN, Default TRUE, Not Null

is_active flag is used for a soft delete. If an admin deletes a doctor, we toggle this to FALSE instead of dropping the row. This ensures old appointments tied to this doctor_id are not broken or lost.


### Table: Patients
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(50), Not Null
- last_name: VARCHAR(50), Not Null
- email: VARCHAR(100), Not Null, Unique
- password_hash: VARCHAR(255), Not Null
- phone: VARCHAR(20)
- date_of_birth: DATE, Not Null
- is_active: BOOLEAN, Default TRUE, Not Null

Similar to doctors table, patients should be soft-deleted. Medical history must be retained indefinitely for compliance and auditing. If a patient leaves, their past appointments must remain intact.


### Table: Appointments
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- patient_id: INT, Foreign Key → patients(id)
- appointment_time: DATETIME, Not Null
- duration_minutes: INT, Default 60, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled, 3 = No Show)

Doctors should not be allowed to have overlapping appointments. While a UNIQUE constraint can be added on (doctor_id, appointment_time), handling variable durations (e.g., 60 minutes) requires the Service Layer in Spring Boot to validate that the new appointment_time does not fall within the duration of an existing booking.


### Table: Doctor_availability
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- start_time: DATETIME, Not Null
- end_time: DATETIME, Not Null
- is_booked: BOOLEAN, Default FALSE, Not Null

Doctors should have their own available time slots. This table allows doctors to block out specific windows of availability. When a patient books a slot, is_booked flips to TRUE




## MongoDB Collection Design

### Collection: prescriptions
{
  "_id": "ObjectId('75def987654')",
  "appointmentId": 1054,
  "patientId": 42,
  "doctorId": 7,
  "issueDate": "2026-09-01T15:30:00Z",
  "status": "Active",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Every 8 hours",
      "route": "Oral",
      "durationDays": 7,
      "refillsRemaining": 0
    },
    {
      "name": "Ibuprofen",
      "dosage": "400mg",
      "frequency": "As needed for pain",
      "route": "Oral",
      "durationDays": null,
      "refillsRemaining": 2
    }
  ],
  "doctorNotes": "Patient should take antibiotics with a meal. Finish the entire course even if symptoms improve.",
  "pharmacy": {
    "name": "Apotek 1",
    "location": "Kristiansand",
    "contact": "+47 12 34 56 78",
    "isDigitalTransmission": true
  },
  "metadata": {
    "tags": ["antibiotic", "pain-relief", "post-operation"],
    "lastUpdated": "2026-09-01T15:35:00Z"
  }
}