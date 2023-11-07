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
  * USER (only can read reports and laborant listings.)
___
The application has 3 API's;
* LaborantAPI
* ReportAPI
* UserAPI
* ImageAPI

```html
POST /api/auth/register - registration
POST /api/auth/login - authentication

POST /api/laborant/createLaborant - creates new laborant
GET /api/laborant/getLaborantId/{laborantId} - retrieves a laborant by id
GET /api/laborant/getAllLaborant - retrieves all laborants
GET /api/laborant/getLaborantByName/{firstName}-{lastName} - retrieve a laborant by first name and last name

POST /api/report/createReport - creates new report (must authorized as role admin)
DELETE /api/report/deleteReportById/{reportId} - to delete a report (must authorized as role admin)
PUT /api/report/updateReport/{reportId} - updates existing report (must authorized as role admin)
GET /api/report/getReportById/{reportId} - retrieves a report by id
GET /api/report/getAllReport - retrieves all reports
GET /api/report/getAllByDate - retrieves all reports sorted by descending given date time
GET /api/report/getReportByIdentityNumber - retrieves report by identity number
GET /api/report/getReportByName/{firstName}-{lastName} - retrieve a report by first name and last name of patient

POST /api/image/createImage - create image
GET  /api/getImageInfoByName/{name} - get image information by name
GET  /api/getImageByName/{name} - get image by name
```


### Tech Stack

---
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- Java Records
- Lombok
- Restful API
- OpenAPI documentation
- MySQL database on Docker
- Docker
- Docker compose 
- JUnit 5
- JWT

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
```

#### React UI

```ssh
$ cd lab-report/lab-report-ui
$ npm install
$ npm start
```
