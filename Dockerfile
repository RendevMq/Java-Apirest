# Hacemos una imagen de JAVA21 , dado que Railway no es compatible
# con este. Entonces hacemos la imagen para que luego se pueda desplegar
# en Docker dentro de Railway, de esta forma Railway solo nos sirve como plataforma
# y nosotros desplegamos la imagen java.

FROM eclipse-temurin:21-jdk as build

COPY /app 
WORKDIR /app

RUN chmod +x mvnw 
RUN ./mvnw package -DskipTests
RUN mv -f target/*.jar app.jar

FROM eclipse-temurin:21-jre

ARG PORT 
ENV PORT=${PORT}

COPY --from=build /app/app.jar .

RUN useradd runtime
USER runtime

ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]

