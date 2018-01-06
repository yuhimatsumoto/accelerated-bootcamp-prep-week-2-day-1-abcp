# Week 3, Day 1

Today, we'll come to understand the DOM as a tree-like structure that we can operate on to add, remove to change elements. We'll practice selecting elements from a nested `document` object. We'll learn the concept of "callback functions" in JavaScript and leverage that understanding, together with the ceonepts of event listeners, to build interactive web pages with JavaScript.

# The DOM is a Tree

The DOM, which stands for Document Object Model, provides a way of manipulating HTML and XML documents.

The DOM provides a structural representation of the document in tree form, enabling you to modify its content and visual presentation by using a scripting language such as JavaScript.

Think of the DOM as an object that contains other object--just as we've seen that an object can have a key that points to a value of an array.

```javascript
var dom = {
  children: [
    "paragraph tag", "paragraph tag", "list"
  ]
}
```

## The `document` object

The `document` object represents the entire web page that loads in the browser.

It contains all of the elements that make up the web page––all of the divs, paragraphs, list items, you name it. Each of these elements exists as an attribute, or node, of the nested document object.

## Operating on the `document`

We can operate on the document object to find out information about the page.

```javascript
document.all;
// returns all the nodes inside the document object

document.contentType;
// returns the type of content contained. Most web pages should return "text/html"

document.URL;
// returns the URL of the document object
```

We can operate on the document object to alter the page.


##  Tree structure of nested objects

Let's take a look at some example HTML:

```html
<document>
  <div>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ul>
  </div>
  <div>
    <form>
      <label>name:</label>
      <input type="text" name="name"></input>
      <input type="submit" name="">
    </form>
  </div>
  <div>
    <p>I'm a paragraph!</p>
  </div>
</document>
```

Now, let's map out this HTML page visually and as an object:

```javascript
var document = [
  {
    tagName: "div",
    children: [
      {
        tagName: "ul",
        children: [
          {tagName: "li", value: "list item 1"},
          {tagName: "li", value: "list item 2"},
          {tagName: "li", value: "list item 3"}
        ]
      }
    ]
  },
  {
    tagName: "div",
    children: [
      {
        tagName: "form",
        children: [
          {
            tagName: "input",
            type: "text",
            value: "name"
          },
          {
            tagName: "input",
            type: "submit"
          }
        ]
      }
    ]
  },
  {
    tagName: "div",
    children: [
      {
        tagName: "p",
        value: "I'm a paragraph"
      }
    ]
  }
]
```

The document object exists as a nested structure that contains nodes. Each node can in turn contain additional nodes, or key/value pairs.

In order to manipulate the complex document object, we have to understand and feel comfortable operating on nested data structures like the one above.

Using JavaScript, how would you:

* Access all of the children of the first div's ul node?
* Access the value of the paragraph that is the child of the last div?
* List the children of the second div?

Now that we're more comfortable with the idea of the DOM as a nested object, and with the concept of operating on and accessing values in such an object, let's operate on a real document object.

# Finding DOM Elements
* Find by ID
* Find by Class
* Query Selector
* Query Selector All
* Finding Nested Objects

# Creating and Inserting DOM Elements
* createElement()
* appendElement()

# Removing Elements

* removeElement()
* node.remove()

# Callback Functions

A function that is passed into another function as an argument, and called inside that other function

```javascript

function doStuffToNumberFive(callback) {
  return callback(5)
}

var plusTwo =  function(num) {
  return num + 2
}

var minusThree = function(num) {
  return num - 3
}

console.log(doStuffToNumberFive(plusTwo))

console.log(doStuffToNumberFive(minusThree))
```

* We can define a function and set a variable equal to that function
* Then, we can pass the variable into another function as a callback.
* In the previous example, we set a variable, plusTwo, equal to a simple function that takes in a number and adds 2 to it.
* Then, we passed that variable into another function as an argument. That other function invoked our callback function, plusTwo

Instead of defining a function and setting it equal to a variable, we can pass a function definition directly into our calling function.

This makes our callback function an “anonymous” function.

```javascript

function doStuffToNumberFive(callback) {
  return callback(5)
}



doStuffToNumberFive(function(num) {
  return num + 2
})
```

```javascript


var names = ["Sophie", "Zoe", "Victoria"]

names.forEach(sayHi)

// OR

names.forEach(function(name) {
  console.log(`Hi, ${name}`)
})

```

# Listening to HTML Nodes

We've seen that we can easily manipulate nodes in the DOM, and even create and remove elements at will. But how do we interact with nodes on the page?

Event listeners!

Pull down the Listening to DOM Nodes lesson on Learn

This function is called on an HTML node and takes in two arguments:
the event you are listening for (“click” for example)
the callback function that you want to invoke when the

```javascript
const main = document.getElementById('main')

main.addEventListener('click', function(event) {
  alert('I was clicked!')
})
```

The callback function gets automatically invoked for us when the event to which we are listening occurs.

The callback function gets passed an argument of the event that occurred. Yes––an event is an object!

Some events:

* click
* keydown
* change
* keyup
* mousover
* and more!

The event has a number of useful properties on it — keypress, keydown, and keyup events, for example, will have a which property that tells us which key was pressed.

The preventDefault() function is called on the event object.
It (you guessed it!) prevents the event from enacting its default behavior.

```javascript

const input = document.querySelector('input')

input.addEventListener('keydown', function(e) {
  if (e.which === 71) {
    return e.preventDefault()
  }
})
```

### Why is this useful?

What do you expect to happen when you hit “submit” on a form?
What would you want to happen if a user tried to a submit a form that they hadn’t filled out?

# Event Bubbling

Events “bubble up” the DOM. If an event occurs on a specific node, it move up the DOM tree and fire for each element above the original element until it reaches the top of the tree.

```javascript

let divs = document.querySelectorAll('div')

function bubble(e) {
  // remember all of those fancy DOM node properties?
  // we're making use of them to get the number
  // in each div here!

  // if `this` is a bit confusing, don't worry about it
  // for now, know that it refers to the div that
  // is triggering the current event handler.
  console.log(this.firstChild.nodeValue.trim() + ' bubbled')
}

for (let i = 0; i < divs.length; i++) {
  divs[i].addEventListener('click', bubble)
}
```

```
5 bubbled
4 bubbled
3 bubbled
2 bubbled
1 bubbled
```

# Event Capturing

The process by which events will trigger for each node below the given node.
Unlike bubbling, capturing does not happen by default.
We trigger it by passing a third argument of `true` to `addeventListener()`

```javascript

divs = document.querySelectorAll('div')

function capture(e) {
  console.log(this.firstChild.nodeValue.trim() + ' captured')
}

for (let i = 0; i < divs.length; i++) {
  // set the third argument to `true`!
  divs[i].addEventListener('click', capture, true)
}
```

* Bubbling: the “target node” is the node from which we bubble up
* Capturing: the “target node” is the node from which we capture down

### `stopPropagation()`

```javascript
const divs = document.querySelectorAll('div')

function bubble(e) {
  // stop! that! propagation!
  e.stopPropagation()

  console.log(this.firstChild.nodeValue.trim() + ' bubbled')
}

for (let i = 0; i < divs.length; i++) {
  divs[i].addEventListener('click', bubble)
}
```
