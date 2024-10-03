# Stage 1: Build the Spring Boot application with the latest Maven and OpenJDK
FROM maven:3.9.4-eclipse-temurin-21 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy pom.xml and download dependencies (for layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the application source code and build it
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the Spring Boot application with the latest OpenJDK
FROM eclipse-temurin:21-jdk-alpine AS production-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build-stage /app/target/tasktracker-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that the Spring Boot app will run on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
