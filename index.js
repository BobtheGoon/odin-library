let myLibrary = [];
let shelf = document.getElementById('shelf')

function Book(author, title, pages, read=false) {
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}


Book.prototype.changeRead = function () {
  this.read = !this.read
}


function addRemoveButton(div) {
  //Create remove button
  button = document.createElement('button')
  button.classList.add('removeButton')
  button.innerHTML = 'Remove'

  button.addEventListener('click', removeBook)

  div.appendChild(button)
  
  return div
}


function addToggleReadButton(div) {
  button = document.createElement('button')
  button.classList.add('toggleReadButton')
  button.innerHTML = 'Read'
  
  button.addEventListener('click', (event) => {
    //Get value of read property
    let read = event.target.parentNode.childNodes[3].innerHTML

    //If read == true set it to false and vice versa
    if (read === 'true') {
      event.target.parentNode.childNodes[3].innerHTML = 'false'
    }
    else {
      event.target.parentNode.childNodes[3].innerHTML = 'true'
    }
  })
  
  div.appendChild(button)

  return div
}

//Add the book object to our books "database"
function addBookToLibrary(book) {
  //Here we need to check the index of the book and add it to the book object, so we can delete it later from the array
  index = myLibrary.length
  book.data = index

  myLibrary.push(book)
}


function removeBook(e) {
  div = e.target.parentNode

  //Remove book from myLibrary array
  myLibrary.pop(div.dataset.index)
  //Remove Dom element
  div.remove()
}


//Create the book div from a book object
function createBookDiv(book) {
  div = document.createElement('div')
  div.classList.add('book')

  //Loop over book object
  Object.keys(book).forEach((key) => {
    //We do not want to display the index of the book in the UI
    if (key === 'data') {
      div.dataset.index = book.data
      return
    }

    let p = document.createElement('p')
    p.innerHTML = book[key]

    //Add a class according to the key of the value for easier styling
    switch(key) {
      case 'author':
        p.classList.add('author')
        break
      case 'title':
        p.classList.add('title')
        break
      case 'pages':
        p.classList.add('pages')
        break
      case 'read':
        p.classList.add('read')
        break
    }
    div.appendChild(p)
  })

  return div
}

//Take the created book div, add removal and read toggle buttons and add it to the shelf
function addBookDivToShelf(div) {
  div = addRemoveButton(div)
  div = addToggleReadButton(div)

  //Add book to shelf
  shelf.appendChild(div)
}


//Get the submit forms button and add an eventlistener to add the book of the form to the library
let bookFormBtn = document.getElementById('add_book')

bookFormBtn.addEventListener('submit', (e) => {
  e.preventDefault()
  
  //Check if book is read
  let read
  if (radio_yes.checked) {
    read = true
  }
  else {
    read = false
  }

  const book = new Book(author.value, title.value, Number(pages.value), read)

  div = createBookDiv(book)
  addBookToLibrary(book)
  addBookDivToShelf(div)
})


//Initial retrieval and display of books from the "database"
function displayBooks() {
  //Loop over myLibrary array and append the to the DOM
  for (i=0; i<myLibrary.length; ++i) {
    let book = myLibrary[i]

    div = createBookDiv(book)
    addBookDivToShelf(div)
  }
}



book1 = new Book('J.R.R Tolkien', 'The Hobbit', 283, false)
book2 = new Book('J.R.R Tolkien', 'The Lord of the Rings', 961, false)

addBookToLibrary(book1)
addBookToLibrary(book2)

console.log(myLibrary)
book2.changeRead()

displayBooks()