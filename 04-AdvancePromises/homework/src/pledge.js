'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

// var Promise = require('pledge');
// const fs = require('fs');
// var promise = new Promise(function (resolve, reject) {
    

// });
function $Promise(executor){
    if(typeof executor !== 'function'){
       throw TypeError('executor no es una function');
    }
 this._state = "pending";
 this._handlerGroups=[]

 executor(this._internalResolve.bind(this),this._internalReject.bind(this));
};
 
$Promise.prototype._internalResolve = function(data){
    if(this._state === "pending"){
        this._state = "fulfilled"
        this._value = data
        this._callHandlers()
    }

}
$Promise.prototype._internalReject= function(reison){
    if(this._state === "pending"){
        this._state = "rejected"
        this._value = reison
        this._callHandlers()
    }

} 
//pasando el valor valor handler
$Promise.prototype.then = function(successCb,errorCb){
  
    if(typeof successCb !== "function")successCb= false;    
    if(typeof errorCb !== "function")errorCb= false;  
    this._handlerGroups.push({successCb,errorCb})
    if(this._state !== "pending")this._callHandlers()

}

//llamando el valor de la handler
$Promise.prototype._callHandlers = function(){
    while(this._handlerGroups.length > 0){
        let {successCb,errorCb}= this._handlerGroups.shift();
        if(this._state === "fulfilled"){
            successCb && successCb(this._value)
        }else if(this._state === "rejected"){
            errorCb && errorCb(this._value)
        }
    }
}
$Promise.prototype.catch = function(error){
    return this.then(null, error)
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
