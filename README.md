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
| [CreateFile](createfile)| /file | POST    |
| [AllFiles](allfiles) | /file | GET    |
| [OneFile](onefile)| /file/:id | POST    |
| [UpdateFile](updatefile)| /file/:id | PATCH    |
| [Eliminar archivo]()| /file/:id | DELETE    |

### Createfile

  * POST `/file`
  * Enviando los datos en formulario recibe:
    * input file: file (nombre del componente)
    * Crea el archivo segun su nombre original
    * devuelve el id y la url de acceso publica:

```
    {
    "url": "https://firebasestorage.googleapis.com/v0/b/telemed-f679a.appspot.com/o/HOJA%20DE%20VIDA%201.pdf?alt=media&token=undefined",
    "id": "HOJA%20DE%20VIDA%201.pdf"
    }
```

#### Allfiles

 * POST `/file`

```
[
    {
        "id": "HOJA DE VIDA 1.pdf",
        "url": "https://firebasestorage.googleapis.com/v0/b/telemed-f679a.appspot.com/o/HOJA%20DE%20VIDA%201.pdf?alt=media&token=undefined"
    }
]
```
 
#### OneFile

* GET `/file/HOJA DE VIDA 1.pdf`

* Devuelve el archivo, [File](https://cloud.google.com/nodejs/docs/reference/storage/1.3.x/File)
```

```

### UpdateFile

* PATCH `/file/test.pdf`
* new_name: nuevo nombre del archivo, debe tener la misma extension. 
* Request
```
{
"new_name":"HOJADEVIDA 1.pdf"
}
```
* Response:
```
{
    "id": "HOJADEVIDA 1.pdf",
    "url": "https://firebasestorage.googleapis.com/v0/b/telemed-f679a.appspot.com/o/HOJADEVIDA%201.pdf?alt=media&token=undefined"
}
```


#### Delete file

* DELETE `/file/HOJADEVIDA 1.pdf`
```
{"delete":true,"data":{}}
```


####  Usuario
```
{
"name":"test",
"last":"secret",
"email":"daniel72584@gmail.com",
"password":"123456"
}
```

```
{
    "_id": "5d0efc13aef05e210784f89f",
    "name": "test",
    "last": "secret",
    "email": "daniel72584@gmail.com",
    "password": "$2a$10$K39Q22U.gXWfnsOE8R6KGurE9yGD7skBX7Adn174Q.iA1DoxpDBNe",
    "createdAt": "2019-06-23T04:12:03.267Z",
    "updatedAt": "2019-06-23T04:12:03.267Z",
    "__v": 0
}
```
#### Cliente
```
{
"name":"test",
"clientId":"secret",
"clientSecret":"daniel72584@gmail.com"
}
```