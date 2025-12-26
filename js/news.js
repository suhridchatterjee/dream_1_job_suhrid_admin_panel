// CREATE NEWS
function createNews() {

    const body = {
        headline: document.getElementById("headline").value,
        brief: document.getElementById("brief").value,
        imageUrl: document.getElementById("imageUrl").value,
        source: document.getElementById("source").value,
        newsUrl: document.getElementById("newsUrl").value,
        publishedDate: document.getElementById("publishedDate").value
    };

    fetch(`${API.news}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("newsResult").textContent =
            JSON.stringify(data, null, 2);
    })
    .catch(err => alert(err));
}

// UPDATE NEWS
function updateNews() {

    const id = document.getElementById("newsId").value;

    const body = {
        headline: document.getElementById("headline").value,
        brief: document.getElementById("brief").value,
        imageUrl: document.getElementById("imageUrl").value,
        source: document.getElementById("source").value,
        newsUrl: document.getElementById("newsUrl").value,
        publishedDate: document.getElementById("publishedDate").value
    };

    fetch(`${API.news}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("newsResult").textContent =
            JSON.stringify(data, null, 2);
    })
    .catch(err => alert(err));
}

// GET ALL NEWS
function getAllNews() {

    fetch(`${API.news}/all`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("newsResult").textContent =
                JSON.stringify(data, null, 2);
        })
        .catch(err => alert(err));
}

// DELETE NEWS
function deleteNews() {

    const id = document.getElementById("newsId").value;

    fetch(`${API.news}/delete/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        document.getElementById("newsResult").textContent =
            "News deleted successfully";
    })
    .catch(err => alert(err));
}
