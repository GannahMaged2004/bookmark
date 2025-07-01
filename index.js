let siteNameInput = document.getElementById("siteName");
let siteURLInput = document.getElementById("siteURL");
let submitBtn = document.getElementById("submitBtn");
let tableContent = document.getElementById("tableContent");

let bookmarks = [];

if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks();
}

submitBtn.onclick = function () {
    let siteName = siteNameInput.value.trim();
    let siteURL = siteURLInput.value.trim();

    const modal = new bootstrap.Modal(document.getElementById('validationModal'));

    let nameInvalid = siteName.length < 3;
    let urlInvalid = !isValidURL(siteURL);

    if (nameInvalid || urlInvalid) {
        // You can also dynamically highlight the reasons in the modal if needed
        modal.show();
        return;
    }

    let bookmark = {
        name: siteName,
        url: siteURL
    };

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
    clearForm();
};



function displayBookmarks() {
    let content = '';
    for (let i = 0; i < bookmarks.length; i++) {
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].name}</td>
                <td><a class="visit-btn" href="${bookmarks[i].url}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button class="delete-btn" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
        `;
    }
    tableContent.innerHTML = content;
}

function clearForm() {
    siteNameInput.value = '';
    siteURLInput.value = '';
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
}

function isValidURL(url) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
        '((\\d{1,3}\\.){3}\\d{1,3}))' + 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(url);
}



