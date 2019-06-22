Welcome
¡ Gracias por querer realizar nuestra prueba para poder optar al puesto de Node.JS Developer Junior ! En esta prueba queremos ver que tal se te da codear y si tu estilo coincide con el nuestro.

Definición
Realizar un API Rest para una web de subida y gestión de archivos. Entre los servicios que se tendrán que realizar están:

Login
Registro
Olvide contraseña con envío de email.
Subida de archivos
Bajada de archivos
Gestor de archivos donde puedes: Eliminar, cambiar nombre y obtener enlace de archivo.
Especificaciones
Para el almacenamiento de los archivos el uso de S3, te dejamos un info para nuestra Bucket:
key: AKIAY74DF3JTP4IZTGFQ secret: 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 bucket: aluxion.bucket/tests

Para base de datos:
El sistema que mejor consideres para el tipo de estructura.

Para autenticación:
Un servicio de OAuth mediante Token.

Se valorará el uso de las siguientes tecnologías:
Typescript como sustituto de Javascript
Nest.Js como framework.
Basar la arquitectura en micro-servicios.
Documentación de servicios con SWAGER.
Uso de Docker.
Tiempo
Se dispone de 3 días para su realización.

Entrega
Se tendrá que subir en un rama llamada "develop" el código desarrollado e instrucciones de montaje.


| SERVICE    | PATH    | METHOD | 
| --------|---------|-------|
| [Crear archivo]()| /file | POST    |
| [Listar todos]() | /file | GET    |
| [Archivo por Id]()| /file/:id | POST    |
| [Actualizar archivo]()| /file/:id | POST    |
| [Eliminar archivo]()| /file/:id | POST    |

