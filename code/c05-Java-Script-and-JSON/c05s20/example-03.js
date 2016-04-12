/**
 * deseralizing JSON object to JavaScript object
 */

console.log("INFO: date value in JSON:", JSON.stringify(new Date()))
console.log("---------------------------------------")

var jsonString = '{"going":true, "count":20, "aDate":"2016-04-12T14:43:35.239Z"}'
console.log("INFO: jsonString:", jsonString)
console.log("INFO: type of jsonString:", typeof (jsonString))

console.log("---------------------------------------")
var obj = JSON.parse(jsonString)

console.log("INFO: type of box:", typeof (obj))

console.log("INFO: obj:", obj)
console.log("INFO: obj.going: ", obj.going, "type is:", typeof (obj.going))
console.log("INFO: obj.count: ", obj.count, "type is:", typeof (obj.count))
console.log("INFO: obj.aDate: ", new Date(obj.aDate))

/* === Output ====

INFO: date value in JSON: "2016-04-12T15:31:37.428Z"
---------------------------------------
INFO: jsonString: {"going":true, "count":20, "aDate":"2016-04-12T14:43:35.239Z"}
INFO: type of jsonString: string
---------------------------------------
INFO: type of box: object
INFO: obj: { going: true, count: 20, aDate: '2016-04-12T14:43:35.239Z' }
INFO: obj.going:  true type is: boolean
INFO: obj.count:  20 type is: number
INFO: obj.aDate:  Tue Apr 12 2016 10:43:35 GMT-0400 (EDT)

*/
