/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(a, b) {
  let r = {};
  
  for (const [key, value] of Object.entries(a)) {

    if(a[key] !== b[key]) {
      r[key] = value
    }
  }

  return r
}
