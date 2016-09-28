/*
 * useful functions
 */
exports.getIdFromPath = getIdFromPath

/* 
expected path is /api/vX/entity/id, thus split on '/' create 5 fields
NOTE: The first fields is empty: ['', 'api', 'vX', 'entity', id]
 */
function getIdFromPath(path) {
    var fields = path.split('/')
    if (5 != fields.length) {
        return -1
    }

    return fields[fields.length - 1]
}