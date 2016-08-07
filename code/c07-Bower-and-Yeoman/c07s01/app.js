var jsonfile = require('jsonfile')
var file = 'data.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})
