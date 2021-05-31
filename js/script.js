document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("form");
    const submitSearch = document.getElementById("searchBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        getDataForm();
    });

    submitSearch.addEventListener("submit", function (event) {
        event.preventDefault();
        getSearchBook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromSaves();
});
