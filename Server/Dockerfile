FROM maven:3.9.8-eclipse-temurin-21 AS build

WORKDIR /build

COPY pom.xml .
COPY Server Server/

WORKDIR /build/Server
RUN chown -R 1000:1000 /build
RUN mvn clean install -DskipTests


FROM eclipse-temurin:21-jdk
WORKDIR /demeter
COPY --from=build ["/build/Server/target/*.jar", "/demeter/demeter.jar"]
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", \
    "-Dspring.datasource.url=jdbc:postgresql://demeter_postgres:5432/demeter", \
    "/demeter/demeter.jar"]