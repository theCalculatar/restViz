const prettyJson = (obj) => {
    try {
        return JSON.stringify(obj, null, 2);
    } catch (e) {
        return '';
    }
}

export { prettyJson }