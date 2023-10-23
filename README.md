# Lab Report API 
___
### Spring Boot and ReactJS Application

---
This project provides to reach listing of existing reports or creating and editing new ones if you are authorized as admin. 

### Summary
The assessment consists of an API to be used for creating a new lab report as admin or to keep track of their detailed reports as standart user.  

#### Requirements

• The API will expose an endpoint which accepts the report information, laborant information and also user information.

• There will be two types of roles for user;

  * ADMIN (can create, delete, read and update reports.)
  * USER (only can read reports.)

• By initialization, laborants are assigned as ADMIN and users are assigned as USER.
___
The application has 3 API's;
* LaborantAPI
* ReportAPI
* UserAPI

```html
POST /v1/auth/register - registration
POST /v1/auth/authenticate - authentication

POST /v1/laborant - creates new laborant
GET /v1/laborant/{laborantId} - retrieves a laborant by id
GET /v1/laborant - retrieves all laborants
GET /v1/laborant/{firstName}-{lastName} - retrieve a laborant by first name and last name

POST /v1/report - creates new report (must authorized as role admin)
DELETE /v1/report/{reportId} - to delete a report (must authorized as role admin)
PUT /v1/report/updateReport/{reportId} - updates existing report (must authorized as role admin)
GET /v1/report/{report} - retrieves a report by id
GET /v1/report - retrieves all reports
GET /v1/report/getAllByDate - retrieves all reports sorted by descending given date time
GET /v1/report/getReportByIdentityNumber - retrieves report by identity number
GET /v1/report/{firstName}-{lastName} - retrieve a report by first name and last name of patient
```

JUnit test coverage is 100% as well as integration tests are available.


### Tech Stack

---
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- Java Records
- Kotlin 1.9.0
- Restful API
- OpenAPI documentation
- MySQL database on Docker
- Docker
- Docker composeused 
- JUnit 5
- JWT

- I preffered to use Kotlin data classes as my entity classes instead of using Project Lombok to get rid of boilerplate code. Lombok creates unnecessary dependency and create some immutability problems. While Kotlin data classes provides the ability to don't write boilerplate code, it also works full compatible with Java and Spring since its runs on JVM, too. I also used Java Records as DTOs(data transfer objects) to sustain immutability.

### Prerequisites

---
- Maven
- Docker

### Run & Build

---
There are 2 ways of run & build the application.

#### Docker Compose

For docker compose usage, docker images already pushed to docker.io.

You just need to run `docker-compose up` command.
___
*$PORT: 8080*
```ssh
$ cd lab-report-api
$ docker-compose up
```

#### Maven
___
*$PORT: 8080*
```ssh
$ cd lab-report/lab-report-api
$ mvn clean install
$ mvn spring-boot:run

$ cd lab-report/lab-report-ui
$ npm install
$ npm start
```

### Swagger UI will be run on this url
`http://localhost:${PORT}/swagger-ui.html`
