Welcome


### Run app

* instalar dependencias `npm install`
*  correr proyecto `npm start`
### .env:

```
BUCKET_NAME=bucket de AWS
IAM_USER_KEY=IAM de AWS no funciono
IAM_USER_SECRET=Secrete de AWS no funcion
PROJECT_ID=projecto de google cloud/firebase
CERT=credenciales firebase admin/googlecloud
GCS_BUCKET=nombre del bucket de aws
MONGO=url de conexion de mongo
SENDGRID_API_KEY=key sendgrid para enviar correos
SUBJECT=Asunto del correo de restaurar contraseña
EMAIL_FROM=correo configurado en sendgrind
```

| SERVICE    | PATH    | METHOD | 
| --------|---------|-------|
| [CreateFile](#createfile)| /file | POST    |
| [AllFiles](#allfiles) | /file | GET    |
| [OneFile](#onefile)| /file/:id | POST    |
| [UpdateFile](#updatefile)| /file/:id | PATCH    |
| [Eliminar archivo](#delete-file)| /file/:id | DELETE    |
| [Recover](#recover)|/user/recover/:email| GET    |
| [Registro de usuario](#registro-de-usuario)| /user | POST    |
| [Autenticacion](#autenticacion)| /oauth/token | POST    |

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
#### Recover password

* GET `/user/recover/:email`
* Response: revisa tu spam de emails, con el remitente daniel72584@gmail.com, en el correo estara la contraseña. 
```
{
    "user": {
        "_id": "5d0f5bdb977b835b328efa4e",
        "username": "daniel72584@gmail.com",
        "createdAt": "2019-06-23T11:00:43.093Z",
        "updatedAt": "2019-06-23T13:25:01.595Z",
        "__v": 0,
        "password": "TamNvR8cCp"
    },
    "mail": {}
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