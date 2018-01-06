// define the "calling function"
function doStuffToNumberFive(callback) {
  return callback(5)
}

// define some callback functions
var plusTwo =  function(num) {
  return num + 2
}

var minusThree = function(num) {
  return num - 3
}

// calling the "calling function" with a named callback function
console.log(doStuffToNumberFive(plusTwo))
console.log(doStuffToNumberFive(minusThree))

// calling the "calling function" with an anonymous callback function
doStuffToNumberFive(function(num) {
  return num + 2
})


// define a named callback function
var sayHi = function(name) {
  console.log(`Hi ${name}`)
}

var names = ["Sophie", "Zoe", "Victoria"]

// pass the named function into the calling function as a callback
names.forEach(sayHi)

// call the callback function with an anonymous function as a callback
names.forEach(function(name) {
  console.log(`Hi, ${name}`)
})


