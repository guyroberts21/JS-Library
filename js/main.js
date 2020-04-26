const storage = window.localStorage

const library = document.getElementById('library');
const addBookBtn = document.getElementById('submit-book');
const errorMessage = document.getElementById('error-message');

let myLibrary = storage.getItem('items') ? JSON.parse(storage.getItem('items')) : [];
storage.setItem('items', JSON.stringify(myLibrary));

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    
    // this.info = function() {
    //     return `${this.title} | ${this.author} | ${this.pages} pages`;
    // }
}

function submitBook() {
    let title = document.getElementById('btitle').value;
    let author = document.getElementById('bauthor').value;
    let pages = document.getElementById('bpages').value;
    
    let book = new Book(title, author, pages);
    
    // render new book on page
    if (title && author && pages) {
        myLibrary.push(book);
        storage.setItem('items', JSON.stringify(myLibrary));

        errorMessage.textContent = "";
        modal.style.display = 'none';
        library.innerHTML = "";
        render();
    } else {
        errorMessage.textContent = "Please fill out all the fields";
    }
}

function removeBook(e) {
    let idx = e.currentTarget.parentNode.dataset.book;
    myLibrary.splice(idx, 1);
    library.innerHTML = "";
    render();
}


function render() {
    for (let book of myLibrary) {
        // book container
        const bookContainer = document.createElement('li');
        bookContainer.textContent = `${book.title} | ${book.author} | ${book.pages} pages`
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

if (myLibrary.length) {
    render();
}

addBookBtn.addEventListener('click', submitBook);