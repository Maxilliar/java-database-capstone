This Spring Boot application uses both MVC and REST controllers. Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules. The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions). All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories. MySQL uses JPA entities while MongoDB uses document models.

1. The user interacts with AdminDashboard/DoctorDashboard (Web UI) or REST endpoints (Appointments).
2. The request is routed to Thymeleaf Controllers (views) or REST Controllers (JSON API).
3. The controller calls the Service Layer to execute business logic.
4. The Service Layer uses MySQL Repositories for data access operations.
5. MySQL Repositories query or update the MySQL Database.
6. The MySQL Database reads or writes values using the MySQL Models Java objects.
7. MySQL Models (Patient, Doctor, Appointment, Admin) use @Entity (JPA Entity) to map fields directly to relational database tables.