# ========== Stage 1: Build frontend ==========
FROM node:22 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
# Use --legacy-peer-deps to bypass dependency conflicts with old packages like atomize
RUN npm install --legacy-peer-deps

COPY frontend/ ./
RUN npm run build

# ========== Stage 2: Build backend ==========
FROM gradle:8.4-jdk21 AS backend-build

WORKDIR /app/backend

COPY backend/build.gradle backend/settings.gradle ./
COPY backend/gradle ./gradle
COPY backend/gradlew ./

RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix ./gradlew && chmod +x ./gradlew

COPY backend/src ./src

RUN ./gradlew bootJar --no-daemon

# ========== Stage 3: Package everything ==========
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=backend-build /app/backend/build/libs/*.jar app.jar
COPY --from=frontend-build /app/frontend/dist /app/static

ENV IS_DOCKER=true

EXPOSE 8080

# Use shell form to ensure environment variables are properly substituted before Java starts.
CMD exec java -jar app.jar --spring.web.resources.static-locations=file:/app/static/
