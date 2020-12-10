"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineProp = defineProp;
exports.Queue = Queue;

/**
 * @description Check if a prop is defined else it initialize it with provided default value
 * @author Christian Colonna
 * @date 09-11-2020
 * @export
 * @param {any} prop
 * @param {any} defaultProp
 * @returns {any} retunr prop ? prop : defaultProp
 */
function defineProp(prop, defaultProp) {
  return prop ? prop : defaultProp;
}
/**
 * @description Creates a queue
 * @author Christian Colonna
 * @date 10-11-2020
 */


function Queue() {
  var a = [],
      b = 0;
  /* returns queu length */

  this.getLength = function () {
    return a.length - b;
  };
  /* check if queue is empty */


  this.isEmpty = function () {
    return 0 == a.length;
  };
  /* enque item */


  this.enqueue = function (b) {
    a.push(b);
  };
  /* dequeue item or undefined if empty */


  this.dequeue = function () {
    if (0 != a.length) {
      var c = a[b];
      2 * ++b >= a.length && (a = a.slice(b), b = 0);
      return c;
    }
  };
  /* Return first queue item without dequeying */


  this.peek = function () {
    return 0 < a.length ? a[b] : void 0;
  };
}