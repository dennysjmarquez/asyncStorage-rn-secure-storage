# RNSecureStorage asyncStorage

This library helps to manage storage in an asynchronous way, with this library you can save simultaneous data without any problem without this library you will have to wait for the data to be saved to send to save others

## Usage

Do not install this library with npm, use it as one more file of your development, place it in a folder of your development and import it where you need it.

Example:

what would be your main folder of your development

**./app/libs/asyncSecureStorage.lib**


It depends on the library: **[https://github.com/talut/rn-secure-storage](https://github.com/talut/rn-secure-storage)**

```javascript

import { asyncStorageStack } from './asyncSecureStorage.lib';

```

**SET**
```javascript
/**
*
* @param key {string} Sets the name of the JSON Object key in which the information is to be saved
* @param value {string | Object } Set the information to be saved
* @param storageName {string} Set the name of the storage in which the information will be stored
*
*/
asyncStorageStack.setData('key', 'value', 'storageName')
.then((res) => {
console.log(res);
}, (err) => {
console.log(err);
});
```

**GET**

```javascript
/**
*
* @param storageName {string} Name of the storage in which the information will be obtained
* @param key {string | null} name of the key of the JSON Object in which the information is to be obtained,
* if it is not set, the complete data of the storage passed in the parameter {storageName} is obtained
*
*/
asyncStorageStack.getData('storageName', 'key').then((value) => {
console.log(value) // Will return direct value
}).catch((err) => {
console.log(err)
})
```
