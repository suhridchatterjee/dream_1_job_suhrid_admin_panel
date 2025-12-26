// CREATE COMPANY
function createCompany() {

    const body = {
        companyName: document.getElementById("companyName").value,
        companyLocation: document.getElementById("companyLocation").value,
        companyWebsite: document.getElementById("companyWebsite").value
    };

    fetch(`${API.company}/insert/companyDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("companyResult").textContent =
            JSON.stringify(data, null, 2);
    })
    .catch(err => alert(err));
}

// UPDATE COMPANY
function updateCompany() {

    const companyId = document.getElementById("companyId").value;

    const body = {
        companyName: document.getElementById("companyName").value,
        companyLocation: document.getElementById("companyLocation").value,
        companyWebsite: document.getElementById("companyWebsite").value
    };

    fetch(`${API.company}/update/companyDetails/${companyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("companyResult").textContent =
            JSON.stringify(data, null, 2);
    })
    .catch(err => alert(err));
}

// GET COMPANY BY ID
function getCompany() {

    const companyId = document.getElementById("companyId").value;

    fetch(`${API.company}/getCompanyDetails/${companyId}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("companyName").value = data.companyName || "";
            document.getElementById("companyLocation").value = data.companyLocation || "";
            document.getElementById("companyWebsite").value = data.companyWebsite || "";

            document.getElementById("companyResult").textContent =
                JSON.stringify(data, null, 2);
        })
        .catch(err => alert("Company not found"));
}

// DELETE COMPANY
function deleteCompany() {

    const companyId = document.getElementById("companyId").value;

    fetch(`${API.company}/deleteCompanyById/${companyId}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("companyResult").textContent =
            "Deleted: " + data;
    })
    .catch(err => alert(err));
}
