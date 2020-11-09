/**
 * @description Check if a prop is defined else it initialize it with provided default value
 * @author Christian Colonna
 * @date 09-11-2020
 * @export
 * @param {any} prop
 * @param {any} defaultProp
 * @returns {any} retunr prop ? prop : defaultProp
 */
export function defineProp(prop, defaultProp) {
    return prop ? prop : defaultProp;
}
