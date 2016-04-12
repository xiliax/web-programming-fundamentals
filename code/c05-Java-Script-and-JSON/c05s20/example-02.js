/**
 * Serialization of nested-JavaScript object
 */

console.log("---------------------------------------")

box = {
    number: 5
    , name: 'Verrol'
    , date: new Date()
    , ar: []
    , things: {
        foo: 5
        , bar: 'baz'
        , list: [0, 1, 2]
    }
}
var jsonString = JSON.stringify(box)
console.log("INFO: type of box:", typeof (box))
console.log("INFO: type of jsonString:", typeof (jsonString))
console.log("INFO: jsonString:", jsonString)


/* === Output ====

---------------------------------------
INFO: type of box: object
INFO: type of jsonString: string
INFO: jsonString: {"number":5,"name":"Verrol","date":"2016-04-12T15:39:27.446Z","ar":[],"things":{"foo":5,"bar":"baz","list":[0,1,2]}}

*/
