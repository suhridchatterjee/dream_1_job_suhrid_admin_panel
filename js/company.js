function createCompany() {
    const company = {
        companyId: Number(document.getElementById('companyId').value),
        nameString: document.getElementById('nameString').value,
        logoStringTK: document.getElementById('logoStringTK').value,
        websiteStringTk: document.getElementById('websiteStringTk').value
    };

    fetch(`${BASE_URL}/companies`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(company)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('companyResult').innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(err => console.error(err));
}

function updateCompany() {
    const companyId = Number(document.getElementById('companyId').value);
    const company = {
        nameString: document.getElementById('nameString').value,
        logoStringTK: document.getElementById('logoStringTK').value,
        websiteStringTk: document.getElementById('websiteStringTk').value
    };

    fetch(`${BASE_URL}/companies/${companyId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(company)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('companyResult').innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(err => console.error(err));
}

function getCompany() {
    const companyId = Number(document.getElementById('companyId').value);
    fetch(`${BASE_URL}/companies/${companyId}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('companyResult').innerHTML = JSON.stringify(data, null, 2);
        // Optional: populate inputs with fetched data
        document.getElementById('nameString').value = data.nameString || '';
        document.getElementById('logoStringTK').value = data.logoStringTK || '';
        document.getElementById('websiteStringTk').value = data.websiteStringTk || '';
    })
    .catch(err => console.error(err));
}

function deleteCompany() {
    const companyId = Number(document.getElementById('companyId').value);
    fetch(`${BASE_URL}/companies/${companyId}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
        document.getElementById('companyResult').innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(err => console.error(err));
}
