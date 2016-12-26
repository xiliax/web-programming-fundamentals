var app = angular.module("DemoApp", [])

app.controller("AController", function (Todo, TodoListFactory, TodoListService) {
    var t2 = new Todo("buy cheese", true)
    console.log("AController. t2:", JSON.stringify(t2))
})

app.controller("BController", function (TodoListService, Todo, TodoListFactory) {
    console.log("From BController.TodoListService: ")
    console.dir(TodoListService)
})

app.service("TodoListService", function () {
    console.log("This is my TodoListService")
    this.todos = ["Service todo 1", "Service todo 2"]
    this.doAwesomeStuff = function(){

    }
})

app.factory("Todo", function () {
    var Todo = function (sub, status) {
        this.subject = sub
        this.complete = status
    }

    return Todo
})

app.factory("TodoListFactory", function () {
    console.log("TodoListFactory initializing...")
    return ["Factory todo 1", "Factory todo 2"]
})

/*
var t0 = {}
t0.subject = "Clean up for the holidays 2016"
t0.complete = true
console.dir(t0)

function newTodo(sub, status) {
    var obj = {}
    obj.subject = sub
    obj.complete = status
    return obj
}

var t1 = newTodo("get milk", false)
console.dir(t1)

var Todo = function(sub, status) {
    // var this = {}
    this.subject = sub
    this.complete = status
    //return this
}

var t2 = new Todo("buy cheese", true)
console.dir(t2)

var t3 = Todo("something", false)
console.dir(t3) // undefined 

console.log(typeof t0)
console.log(typeof t1)
console.log(typeof t2)
console.log(t0 instanceof Object)
console.log(t1 instanceof Object)
console.log(t2 instanceof Object)

console.dir(t0.constructor)
console.dir(t1.constructor)
console.dir(t2.constructor)
*/