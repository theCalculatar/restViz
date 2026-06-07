/**
 * @param {any} obj - Any type of object
 * @param {string} message - Custom message to return if JSON string is undefined
 */
const prettyJson = (obj, message = '') => {
  try {
    const jsonString = JSON.stringify(obj, null, 2)

    if (!jsonString) {
      throw new Error('JSON string is undefined')
    }
    return jsonString
  } catch (_) {
    return message
  }
}

export { prettyJson }
