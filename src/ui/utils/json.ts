export const prettyJson = (obj: any, message: string = ''): string => {
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
