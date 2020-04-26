const library = document.getElementById('library');
const addBookBtn = document.getElementById('submit-book');
const errorMessage = document.getElementById('error-message');
let myLibrary = [];

// default books
let book = new Book('Lord of the Rings', 'J.R.R. Tolkien', 456);
addBookToLibrary(book);

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    
    this.info = function() {
        return `${this.title} | ${this.author} | ${this.pages} pages`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBook(e) {
    let container = e.currentTarget.parentNode;
    let idx = e.currentTarget.parentNode.dataset.book;
    myLibrary.splice(idx, 1);
    library.innerHTML = "";
    render();
}

function render() {
    for (let book of myLibrary) {
        // book container
        const bookContainer = document.createElement('li');
        bookContainer.textContent = book.info();
        bookContainer.dataset.book = `${myLibrary.length - 1}`;
        
        // delete btn
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "🗑️";
        deleteBtn.classList.add('delete');

        // click event to remove book
        deleteBtn.addEventListener('click', removeBook);
        
        // append book container + append delete btn to each book container
        bookContainer.classList.add('book');
        library.appendChild(bookContainer).appendChild(deleteBtn);
    }
}

function submitBook() {
    let title = document.getElementById('btitle').value;
    let author = document.getElementById('bauthor').value;
    let pages = document.getElementById('bpages').value;
    
    let book = new Book(title, author, pages);
    
    // render new book on page
    if (title && author && pages) {
        errorMessage.textContent = "";
        myLibrary.push(book);
        modal.style.display = 'none';
        library.innerHTML = "";
        render();
    } else {
        errorMessage.textContent = "Please fill out all the fields";
    }
}

render();
addBookBtn.addEventListener('click', submitBook);