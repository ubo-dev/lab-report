FROM amazoncorretto:17 AS build

COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN ./mvnw dependency:resolve

COPY src src
RUN ./mvnw package

FROM amazoncorretto:17
WORKDIR lab-report-api
COPY --from=build target/*.jar lab-report-api.jar
ENTRYPOINT ["java", "-jar", "lab-report-api.jar"]
