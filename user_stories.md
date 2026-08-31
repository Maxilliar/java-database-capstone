# User Stories

**Title: Comprehensive Admin Portal & System Management**
_As a admin, I want to authenticate, manage doctor profiles, and execute database usage reports, so that I can securely administer the platform and track system activity._

**Acceptance Criteria:**
1. The admin can securely log into the portal using valid credentials and log out to completely invalidate the active session.
2. The admin can create a new doctor profile through the UI form, saving the entity directly to the MySQL database.
3. The admin can remove a doctor profile with a confirmation prompt, safely handling associated appointment data.
4. The admin can log into the MySQL CLI and execute a stored procedure to view total appointments per month.

**Priority:** High
**Story Points:** 8
**Notes:**
- Passwords must be hashed with BCrypt, and sessions must be explicitly destroyed on logout.
- Doctor email addresses must be unique; deletion should default to a soft delete if active appointments exist.
- Database users executing the stored procedure in CLI require explicit EXECUTE permissions.



**Title: Comprehensive Patient Portal Access & Appointment Management**
_As a patient, I want to manage my account, explore available doctors, and handle my appointments, so that I can securely and efficiently organize my healthcare consultations._

**Acceptance Criteria:**
1. Unauthenticated users can successfully view a public directory of doctors.
2. Users can register a new account using an email and password, log in to access their personalized portal, and securely log out to terminate their session.
3. Authenticated users can select an available doctor and successfully reserve a 60-minute consultation time slot.
4. The authenticated patient portal accurately displays a chronological list of the user's upcoming appointments.

**Priority:** High
**Story Points:** 13
**Notes:**
- The booking system must check doctor availability in real-time to prevent overlapping or double-booked 1-hour slots.
- Upcoming appointments should automatically filter out past dates so the user only sees future commitments.
- Passwords must be hashed and stored securely upon registration.



# User Story Template

**Title:**
_As a doctor, I want to authenticate, manage my profile, set my availability, and review appointment details, so that I can securely administer my practice and prepare for patient consultations._

**Acceptance Criteria:**
1. The doctor can log into the portal to access their dedicated dashboard and log out to secure sensitive patient data.
2. The doctor can update their specialization and contact information, reflecting the latest details across the patient-facing directory.
3. The doctor can view a structured appointment calendar and mark custom time slots as unavailable to prevent patient bookings.
4. The doctor can view relevant patient profiles and details associated with their upcoming scheduled appointments.

**Priority:** High
**Story Points:** 8
**Notes:**
- Marking availability slots as "unavailable" must dynamically sync with the patient booking system to block those hours in real time.
- Patient details must be protected by Role-Based Access Control (RBAC), ensuring doctors can only access information for patients scheduled with them.
- Session timeouts should be strictly enforced to comply with health data privacy standards.
