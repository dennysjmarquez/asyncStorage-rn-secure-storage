"use strict";

import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

/**
 *
 * Class, for asynchronous handling of information entry in Storage
 *
 */
export const asyncStorageStack = new (function() {

  const _definePrivate = (thas, key, value) => (thas[key] = value);

  class StorageStack {

    constructor() {

      _definePrivate(this, 'stack',{});

      /**
       *
       * Procesa la pila de funciones async en cola
       *
       * @param storageName {string} Nombre de la casilla del almacenamiento en el stack
       */
      _definePrivate(this, 'stackFunc',(storageName) => {

        if (!this.stack[storageName] || !this.stack[storageName].stackFunc.length) return;

        // Se obtiene la siguiente función de la lista
        const currentStackFunc = this.stack[storageName].stackFunc[
        this.stack[storageName].stackFunc.length - 1
          ];

        // Se quita la función de la lista
        this.stack[storageName].stackFunc.pop();

        // Se procesa la función obtenida de la lista
        currentStackFunc();

      });

    }

    /**
     *
     * Agrega un dato al Storage
     *
     * @param key {string} Establece el nombre de la key del Objeto JSON en el que se va a guardar la información
     * @param value {string | Object } Establece la información que se va a guardar
     * @param storageName {string} Establece el nombre del storage en que se va a guardar la información
     * @returns {Promise<string | null>}
     */
    setData = ( key, value, storageName) => new Promise((resolve, reject) => {

      this.stack[storageName] || (this.stack[storageName] = {});
      this.stack[storageName].stackFunc || (this.stack[storageName].stackFunc = []);

      const callback = () => {

        // Se obtiene los datos del Storage
        RNSecureStorage.get(storageName)
          .then((dataUser) => storageSet(dataUser, (typeof value === 'object' || !!key)))
          .catch(() => storageSet(null, (typeof value === 'object' || !!key)));

        // Almacena los datos en el Storage
        const storageSet = (prevData, isObject) => {

          let newData = '';

          // Se suma los nuevos datos a los anteriores, o se remplazan con los nuevos
          isObject && key
            ? ((newData = prevData ? JSON.parse(prevData) : {}), (newData[key] = value))
            : isObject
            ? (newData = { ...(prevData ? JSON.parse(prevData) : {}), ...value })
            : (newData = value);

          // Se transforma al tipo String los datos para ser almacenada
          const valueString = String(isObject
            ? JSON.stringify(newData)
            : newData);

          // Se guardan los datos en el Storage
          RNSecureStorage.set(storageName, valueString, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
            .then((res) => resolve(res) )
            .catch((err) => reject(err))
            .finally(()=>{

              this.stack[storageName].stackFunc.length
                ? this.stackFunc(storageName)
                : delete this.stack[storageName];

            })

        };

      };

      //  se Procesa una función async para guardar los datos o la agrega a la pila de función async
      this.stack[storageName].wait

        // Si ya se esta procesando una función
        // se agrega a la pila de función async
        ? this.stack[storageName].stackFunc.unshift(callback)

        // Si aún no se ha procesado ninguna función
        // se procesa de una vez sin mandarla a la pila de función async
        : (this.stack[storageName].wait = true, callback());

    });

    /**
     *
     * Obtiene un dato del Storage
     *
     * @param storageName {string} Nombre del storage en el que se va a obtener la información
     * @param key {string | null} nombre de la key del Objeto JSON en el que se va a obtener la información,
     * si no se establece se obtiene la data completa del storage pasado en el parametro {storageName}
     * @returns {Promise<string | null>}
     */
    getData = (storageName, key) => new Promise((resolve, reject) => RNSecureStorage.get(storageName).then((data) => resolve(!!key ? JSON.parse(data)[key] : data)).catch((error) => resolve(null)));

  }

  return StorageStack;

}());
