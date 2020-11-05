/**
 * Return label from uri removing # and / namespaces
 *
 * @param {String} uri
 */
export function getURILabel(uri) {
    let property = '';
    let tmp = uri;
    let tmp2 = tmp.split('#');
    if (tmp2.length > 1) {
        property = tmp2[1];
    } else {
        tmp2 = tmp.split('/');
        property = tmp2[tmp2.length - 1];
    }
    return property;
}
