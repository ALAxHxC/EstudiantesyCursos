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
| [CreateFile](#createfile)| /file | POST    |
| [AllFiles](#allfiles) | /file | GET    |
| [OneFile](#onefile)| /file/:id | POST    |
| [UpdateFile](#updatefile)| /file/:id | PATCH    |
| [Eliminar archivo](#delete-file)| /file/:id | DELETE    |
| [Registro de usuario](#registro-de-usuario)| /user | POST    |

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



####  Registro de Usuario
* Request
```
{
"username":"daniel72584@gmail.com",
"password":"12345"
	
}
```
* Response
```
{
    "_id": "5d0f5bdb977b835b328efa4e",
    "username": "daniel72584@gmail.com",
    "password": "yH5pmR0WYxDetSpptRCrhvyKcNY4gswYGrYwID4cxKtNl3ocxnuv0+hfGKgrcAEh",
    "createdAt": "2019-06-23T11:00:43.093Z",
    "updatedAt": "2019-06-23T11:00:43.093Z",
    "__v": 0
}
```
#### Autenticacion
* POST `/oauth/token`
* Headers:
  * Authorization `Basic base64(client:secret)`
  * Example
```
{
    "client":"confidentialApplication"
    "clientSecret":"topSecret"
}
```
* Headers
```
{Authorization:Basic Y29uZmlkZW50aWFsQXBwbGljYXRpb246dG9wU2VjcmV0,Content-Type:application/x-www-form-urlencoded}
```
* Request
```
curl http://localhost:3000/oauth/token \
        -d "grant_type=password" \
        -d "username=daniel72584@gmail.com" \
        -d "password=12345" \
        -H "Authorization: Basic Y29uZmlkZW50aWFsQXBwbGljYXRpb246dG9wU2VjcmV0" \
        -H "Content-Type: application/x-www-form-urlencoded"

```

* Response
```
{
    "accessToken": "f7dd7efbfde399e5d5a7328bd295fc9bd98958a1",
    "accessTokenExpiresAt": "2019-06-23T12:18:56.445Z",
    "refreshToken": "746b18145890f9595bad4717f24f4e7f74f4cd81",
    "refreshTokenExpiresAt": "2019-07-07T11:18:56.446Z",
    "client": {
        "id": "confidentialApplication"
    },
    "user": {
        "id": "daniel72584@gmail.com"
    }
}
```

 * Una vez autenticado usar el token de respuesta como 
 ```
 {Authorization: Bearer accessToken}
 ```