# INSTRUCCIONES

Este documento describe las instrucciones detalladas para el uso de la API que simula un pago pendiente y su confirmación.

## Requisitos

Es necesario tener instalado en el servidor:
- **Node.js**
- **MongoDB**
- **NestJS**

> **Nota**: Para la prueba, se accede a la base de datos sin credenciales. Esto se realiza para agilizar el proceso, ya que es solo una simulación.

## Instalación

1. Ejecutar el comando:

   ```bash
   npm install

2. Crear en la ruta del proyecto un archivo ```.env``` donde se asignaran los pares clave-valor indicados en el archivo ```env.example``` que también se encuentra en la raíz del proyecto.

3. Correr el comando: 
   ```bash
   npm run start:dev

## Lógica de negocio
1. Para entender y ejecutar los siguientes pasos vea la documentación de la API, accediendo a "http://localhost:3001/api". Aquí se encontrará detallada la API que sirve de puente para conectar con el servisio SOAP, las de este último servicio no se encuentran documentadas, ya que se supone que es la API la que accede internamente a el.

2. Se debe crear un cliente (```client```).

3. Se debe crear una billetera (```wallet```), vinculandola a un cliente.

4. Se debe cargar la billetera, enviando los datos requeridos.

5. Se procede a realizar un pago con el método PUT ```wallets/pay/{id}```. Este método simula un envío de información a un email. En este caso, debido a que no tenemos un email configurado para ello ni tampoco un servicio que permita enviar de forma segura dicho email, la información que se enviaría en un template, quedará guardada en un archivo llamado ```inbox.json``` en la raíz del proyecto. Dicho archivo se podrá ver el enlace al cual el usuario daría click desde email.

6. Mire en base de datos la colección ```payments``` que indica el historial de pagos con su debido estado, monto y fechas, luego copie el enlace que se enviaría al email, que se encuentra en el archivo ```inbox.json```.

7. Pegue el enlace en su programa preferido para hacer peticiones a la API y haga una petición de tipo PUT cuyo cuerpo de la petición llevará el código de 6 dígitos que también está en el archivo ```inbox.json``` así ```{ token: "ABBFRH" }``` para confirmar el pago.

Lo anterior se realiza de esta forma ya que la lógica indicaría que una vez el usuario reciba el link en su email, al dar click en el, este sería redireccionado a una interfaz con un formulario para ingresar el token de 6 dígitos en donde también se capturarían los parámetros en el link. Una vez el usuario de click en "confirmar", la interfaz realizaría la petición a la API, retornando el mensaje de respuesta.