/**
 * creating JSON objects for data exchange
 */
var number = 5
var name = 'Verrol'
var date = new Date()
var ar = []
var list = [number, name, date, ar]
var box = {
    number: number
    , name: name
    , date: date
    , ar: ar
}

console.log("INFO: number =", number, "as JSON object =", JSON.stringify(number))
console.log("INFO: name =", name, "as JSON object =", JSON.stringify(name))
console.log("INFO: date =", date, "as JSON object =", JSON.stringify(date))
console.log("INFO: ar =", ar, "as JSON object =", JSON.stringify(ar))
console.log("INFO: list =", list, "as JSON object =", JSON.stringify(list))
console.log("---------------------------------------")
console.log("INFO: box =", box, "as JSON object =", JSON.stringify(box))

/* === Output ====

INFO: number = 5 as JSON object = 5
INFO: name = Verrol as JSON object = "Verrol"
INFO: date = Tue Apr 12 2016 11:38:33 GMT-0400 (EDT) as JSON object = "2016-04-12T15:38:33.328Z"
INFO: ar = [] as JSON object = []
INFO: list = [ 5, 'Verrol', Tue Apr 12 2016 11:38:33 GMT-0400 (EDT), [] ] as JSON object = [5,"Verrol","2016-04-12T15:38:33.328Z",[]]
---------------------------------------
INFO: box = { number: 5,
  name: 'Verrol',
  date: Tue Apr 12 2016 11:38:33 GMT-0400 (EDT),
  ar: [] } as JSON object = {"number":5,"name":"Verrol","date":"2016-04-12T15:38:33.328Z","ar":[]}

*/
