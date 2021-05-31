function getSearchBook() {
    let search = document.getElementById('search').value;

    let getData = document.getElementsByClassName('inner');
    for ( itemBook of getData) {
        let textInBook = itemBook.innerText.toUpperCase();
        let tes = search.toUpperCase();
        let checkSearchBook = textInBook.search(tes);
        
        if(checkSearchBook == -1) { itemBook.style.display = "none"; }
        else { itemBook.style.display = ""; }
    }
}
