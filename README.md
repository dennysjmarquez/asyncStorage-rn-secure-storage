# RNSecureStorage asyncStorage

This library helps to manage storage in an asynchronous way, with this library you can save simultaneous data without any problem without this library you will have to wait for the data to be saved to send to save others

## Usage

Do not install this library with npm, use it as one more file of your development, place it in a folder of your development and import it where you need it.

Example:

what would be your main folder of your development

**./app/libs/asyncSecureStorage.lib**


It depends on the library: **[https://github.com/talut/rn-secure-storage](https://github.com/talut/rn-secure-storage)**

```javascript

import { asyncStorageStack } from '../libs/asyncSecureStorage.lib';

```

**SET**
```javascript
* @param key {string} Establece el nombre de la key del Objeto JSON en el que se va a guardar la información
* @param value {string | Object } Establece la información que se va a guardar
* @param storageName {string} Establece el nombre del storage en que se va a guardar la información
asyncStorageStack.setData('key', 'value', 'storageName')
.then((res) => {
console.log(res);
}, (err) => {
console.log(err);
});
```

**GET**

```javascript
 * @param storageName {string} Nombre del storage en el que se va a obtener la información
 * @param key {string | null} nombre de la key del Objeto JSON en el que se va a obtener la información,
 * si no se establece se obtiene la data completa del storage pasado en el parametro {storageName}
asyncStorageStack.getData('storageName', 'key').then((value) => {
console.log(value) // Will return direct value
}).catch((err) => {
console.log(err)
})
```
