const STORAGE_KEY = "BOOK_APPS";
let books = [];

function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

function findBook(bookId) {

    for(book of books){
        if(book.id === bookId)
            return book;
    }

    return null;
}

function refreshDataFromSaves() {
    const uncompleted = document.getElementById('uncompleted-books');
    let completed = document.getElementById('completed-books');
  
    for(itemBook of books){
        const book = makeBook(itemBook.title, itemBook.author, itemBook.year, itemBook.isCompleted);
        book['bookId'] = itemBook.id;
        
        if(itemBook.isCompleted){
            completed.append(book);
        } else {
            uncompleted.append(book);
        }
    }
 }

function findBookIndex(bookId) {
    
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;

        index++;
    }

    return -1;
}