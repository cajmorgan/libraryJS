    //Global variables
    const books = document.querySelector('.books');
    const addBtn = document.querySelector('.add');
    const btn = document.querySelector('button');
    let bNum = 0;
    
let library = [];

function showBooks() {
        let book = document.createElement('div')
        book.classList.add('book');
        book.setAttribute('id', `book${bNum}`)
        book.innerHTML = `<span>Title: ${library[0].title}</span> 
        <span>Author: ${library[0].author}</span> 
        <span>Pages: ${library[0].pages}</span> 
        <button id="readBtn" class="status" value="${bNum}">${library[0].read}</button>
        <button id="delete" value="${bNum}">Delete</button>
        `
        books.appendChild(book);
}

function readChange(e) {
    if(e.target.id == "readBtn") {
        const status = document.querySelectorAll('.status')
        for(i = 0; i < status.length; i++) {
            if(status[i].value === e.target.value) {
                if(library[i].read == "Read") {
                    library[i].read = "Not Read";
                    e.target.textContent = library[i].read;
                } else if(library[i].read == "Not Read") {
                    library[i].read = "Read";
                    e.target.textContent = library[i].read;
                }
            }
        }
        
    }

}
document.addEventListener('click', readChange)
function deleteBook(e) {
    if(e.target.id == "delete") {
    for(i = 0; i < library.length; i++) {
        if(e.target.value == library[i].num) {
           library.splice(library.indexOf(library[i]), 1);
        }
    }
    const deleter = document.querySelectorAll('.book');  
    for(i = 0; i < deleter.length; i++) {
        if(deleter[i].id == 'book' + e.target.value) {
            books.removeChild(deleter[i]);
        } 
    }  
    console.log('delete');
    }
}

document.addEventListener('click', deleteBook)



class Book {
  constructor(title, author, pages, read, num) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
    this.num = num;
  }
  info = function() {
    return "The Book's Title is " + this.title + 
    " and the author is: " + this.author + 
    " with a total number of pages: " + this.pages + ". you have read it: " + this.read
  }
  
}

function addBookToLibrary(book) { 
    bNum += 1;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read');
    (read.checked == true) ? read.value = "Read" : read.value = "Not Read";
    console.log(read);
    if(title == "" || author == "" || pages == "") {
        return alert('You need to fill in Title, Author and Pages!')
    }
    book = new Book(title, author, pages, read.value, bNum);
    library.unshift(book);
    reset(); 
    showBooks();
    // console.log(book)
    
}

function reset() {
    // document.querySelector('#read').checked = false;
    const input = document.querySelectorAll('.input');
    for(i = 0; i < input.length; i++) {
        input[i].value = "";
    }

}

addBtn.addEventListener('click', addBookToLibrary)