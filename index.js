let myLibrary = [];

function Book(author, title, pages, read=false) {
  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}

Book.prototype.changeRead = function () {
  this.read = !this.read
}

function addBookToLibrary(book) {
  //Here we need to check the index for the book and add it to the book object, so we can delete it later with more ease
  index = myLibrary.length
  book.index = index

  myLibrary.push(book)
}

function displayBooks() {
  shelf = document.getElementById('shelf')

  //Loop over myLibrary array and append the to the DOM
  for (i=0; i<myLibrary.length; ++i) {
    let book = myLibrary[i]

    div = document.createElement('div')
    div.classList.add('book')
    
    //Loop over book object
    Object.keys(book).forEach((key) => {
      //We do not want to display the index of the book in the UI
      if (key === 'index') {
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

    //Add book to shelf
    shelf.appendChild(div)
  }
}






book1 = new Book('J.R.R Tolkien', 'The Hobbit', 283, false)
book2 = new Book('J.R.R Tolkien', 'The Lord of the Rings', 961, false)

addBookToLibrary(book1)
addBookToLibrary(book2)

console.log(myLibrary)
book2.changeRead()

displayBooks()