function getDataForm() {
    const id = new Date().getTime();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;
    
    const bookData = makeBook(title, author, year, isCompleted);
    let target;

    const bookObject = composeBookObject(title, author, year, isCompleted);

    bookData['bookId'] = bookObject.id;
    books.push(bookObject);

    if (isCompleted) { target = 'completed-books'; }
    else { target = 'uncompleted-books'; }

    document.getElementById(target).appendChild(bookData);
    updateDataToStorage();
}

function makeBook(title, author, year, isCompleted) {

    const textTitle = document.createElement("h1");
    textTitle.innerText = title;

    const textParagraph = document.createElement("h2");
    textParagraph.innerText = author;

    const textYear = document.createElement("h3");
    textYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textParagraph, textYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        uncompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        deleteDataBook(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        completed(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function completed(taskElement){
    const bookcompleted = document.getElementById('completed-books');
    
    const title = taskElement.querySelector('.inner > h1').innerText;
    const author = taskElement.querySelector(".inner > h2").innerText;
    const year = taskElement.querySelector(".inner > h3").innerText;

    const book = makeBook(title, author, year, true);
    bookcompleted.append(book);

    const fineBook = findBook(taskElement['bookId']);
    fineBook.isCompleted = true;
    book['bookId'] = fineBook.id;
    
    taskElement.remove();
    updateDataToStorage();
}

function uncompleted(taskElement){
    const bookUncompleted = document.getElementById('uncompleted-books');

    const title = taskElement.querySelector('.inner > h1').innerText;
    const author = taskElement.querySelector(".inner > h2").innerText;
    const year = taskElement.querySelector(".inner > h3").innerText;

    const book = makeBook(title, author, year, false);
    bookUncompleted.append(book);

    const fineBook = findBook(taskElement['bookId']);
    fineBook.isCompleted = false;
    book['bookId'] = fineBook.id;
    
    taskElement.remove();
    updateDataToStorage();
}

function deleteDataBook(taskElement){
    const bookPosition = findBookIndex(taskElement['bookId']);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}