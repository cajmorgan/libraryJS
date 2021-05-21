    //Global variables
    const books = document.querySelector('.books');
    const addBtn = document.querySelector('.add');
    const btn = document.querySelector('button');
    if(localStorage.length != 0) {
        bNum = parseInt(localStorage.getItem('num'));
    } else {
        bNum = 0;
    }
    
let library = [];

if(localStorage.length != 0) {
    for (let i = 1; i <= parseInt(localStorage.getItem('num')) + 1; i++) { 
        let storedBook = JSON.parse(localStorage.getItem("book" + i));
        // console.log(localStorage);
        if(storedBook != null) {
            library.push(storedBook);
        } else {
            continue;
        }
        console.log(storedBook)
    }
    showSavedBooks();
}

function showSavedBooks() {
    for(i = 0; i < library.length; i++) {
    let book = document.createElement('div')
    book.classList.add('book');
    book.setAttribute('id', `book${library[i].num}`)
    book.innerHTML = `<img src="${library[i].img}" width="200" height="300"><span>Title: ${library[i].title}</span> 
    <span>Author: ${library[i].author}</span> 
    <span>Pages: ${library[i].pages}</span> 
    <button id="readBtn" class="status" value="${library[i].num}">${library[i].read}</button>
    <button id="delete" value="${library[i].num}">Delete</button>
    `
    books.appendChild(book);
    const statusBtn = document.querySelectorAll('.status');
        for(j = 0; j < statusBtn.length; j++) {
            if(statusBtn[j].textContent == "Read") {
                statusBtn[j].style.backgroundColor = "#32CD32";
            } else {
                statusBtn[j].style.backgroundColor = "white";
            }
        }
    }
}

function showBooks() {
        let book = document.createElement('div')
        book.classList.add('book');
        book.setAttribute('id', `book${bNum}`)
        book.innerHTML = `<img src="${library[library.length-1].img}" width="200" height="300"><span>Title: ${library[library.length-1].title}</span> 
        <span>Author: ${library[library.length-1].author}</span> 
        <span>Pages: ${library[library.length-1].pages}</span> 
        <button id="readBtn" class="status" value="${bNum}">${library[library.length-1].read}</button>
        <button id="delete" value="${bNum}">Delete</button>
        `
        books.appendChild(book);
        const statusBtn = document.querySelectorAll('.status');
        for(i = 0; i < statusBtn.length; i++) {
        if(statusBtn[i].textContent == "Read") {
            statusBtn[i].style.backgroundColor = "#32CD32";
        } else {
            statusBtn[i].style.backgroundColor = "white";
        }
    }
}

function readChange(e) {
    if(e.target.id == "readBtn") {
        console.log('test')
        const status = document.querySelectorAll('.status')
        for(i = 0; i < library.length; i++) {
            if(library[i].num == e.target.value) {
                if(library[i].read == "Read") {
                    library[i].read = "Not Read";
                    e.target.textContent = library[i].read;
                    e.target.style.backgroundColor = "white";
                    //Change Local Storage
                    let changeObj = JSON.parse(localStorage.getItem(`book${library[i].num}`));
                    changeObj.read = "Not Read";
                    localStorage.setItem(`book${library[i].num}`, JSON.stringify(changeObj));

                } else if (library[i].read == "Not Read") {
                    library[i].read = "Read";
                    e.target.textContent = library[i].read;
                    e.target.style.backgroundColor = "#32CD32";
                    //Change Local Storage
                    let changeObj = JSON.parse(localStorage.getItem(`book${library[i].num}`));
                    changeObj.read = "Read";
                    localStorage.setItem(`book${library[i].num}`, JSON.stringify(changeObj));
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
            localStorage.removeItem("book" + e.target.value);
            console.log(e.target.value);
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
  constructor(title, author, pages, read, num, img) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
    this.num = num;
    this.img = img;
  }
  info = function() {
    return "The Book's Title is " + this.title + 
    " and the author is: " + this.author + 
    " with a total number of pages: " + this.pages + ". you have read it: " + this.read
  }
  
}

function addExamples(book) {
    if(bNum < 3) { 
    for(i = 1; i <= 3; i++) {
        bNum += 1;
        localStorage.setItem('num', bNum);
        if(i === 1) {
            book = new Book('Lord of The Rings', 'J.R.R Tolkien', '1178', 'Read', bNum, 'images/lotr.jpg');
            localStorage.setItem("book" + bNum, JSON.stringify(book))
            library.push(book);
            showBooks();
        } else if (i === 2) {
            book = new Book('Game of Thrones', 'George R.R Martin', '694', 'Read', bNum, 'images/got.jpg');
            localStorage.setItem("book" + bNum, JSON.stringify(book))
            library.push(book);
            showBooks();
        } else if (i === 3) {
            book = new Book('Javascript for Beginners', 'Stephen .B', '122', 'Not Read', bNum, 'images/javascript.jpg');
            localStorage.setItem("book" + bNum, JSON.stringify(book))
            library.push(book);
            showBooks();
        }
        }
    }
}

addExamples();

function addBookToLibrary(book) { 
    bNum += 1;
    localStorage.setItem('num', bNum);
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read');
    let imgUrl = document.querySelector('#imgSrc').value;
    if(imgUrl == "") {
        imgUrl = "images/dummy.jpg";
    }
    (read.checked == true) ? read.value = "Read" : read.value = "Not Read";
    console.log(read);
    if(title == "" || author == "" || pages == "") {
        return alert('You need to fill in Title, Author and Pages!')
    }
    document.querySelector('.popUp').style.display = "none";
    book = new Book(title, author, pages, read.value, bNum, imgUrl);
    localStorage.setItem("book" + bNum, JSON.stringify(book))
    library.push(book);
    reset(); 
    showBooks();
    // console.log(book)
    
}

function reset() {
    document.querySelector('#read').checked = false;
    const input = document.querySelectorAll('.input');
    for(i = 0; i < input.length; i++) {
        input[i].value = "";
    }

}

addBtn.addEventListener('click', addBookToLibrary)



function popIt() {
    document.querySelector('.popUp').style.display = "flex";
}

const addBookBtn = document.querySelector('.addBook');
addBookBtn.addEventListener('click', popIt)