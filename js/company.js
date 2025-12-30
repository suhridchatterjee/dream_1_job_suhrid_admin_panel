// -------------------- COMPANY API METHODS --------------------

/*
 UI FIELD MAPPING
 ----------------
 GET:
   companyIdGet

 CREATE:
   companyIdCreate
   nameStringCreate
   logoStringTKCreate
   websiteStringTkCreate

 UPDATE:
   companyIdUpdate
   nameStringUpdate
   logoStringTKUpdate
   websiteStringTkUpdate

 DELETE:
   companyIdDelete
*/

// ==================== CREATE COMPANY ====================
function createCompany() {

    const company = {
        companyId: Number(document.getElementById('companyIdCreate').value),
        nameString: document.getElementById('nameStringCreate').value,
        logoStringTK: document.getElementById('logoStringTKCreate').value,
        websiteStringTk: document.getElementById('websiteStringTkCreate').value
    };

    fetch(`${API.company}/insert/companyDetails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'suhrid-api-key-dream': API_KEY
        },
        body: JSON.stringify(company)
    })
        .then(handleResponse)
        .then(showCompanyResult)
        .catch(showError);
}


// ==================== UPDATE COMPANY ====================
function updateCompany() {

    const companyId = Number(document.getElementById('companyIdUpdate').value);

    const company = {
        nameString: document.getElementById('nameStringUpdate').value,
        logoStringTK: document.getElementById('logoStringTKUpdate').value,
        websiteStringTk: document.getElementById('websiteStringTkUpdate').value
    };

    fetch(`${API.company}/update/companyDetails/${companyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'suhrid-api-key-dream': API_KEY
        },
        body: JSON.stringify(company)
    })
        .then(handleResponse)
        .then(showCompanyResult)
        .catch(showError);
}


// ==================== GET COMPANY ====================
function getCompany() {

    const companyId = Number(document.getElementById('companyIdGet').value);

    fetch(`${API.company}/getCompanyDetails/${companyId}`, {
        headers: {
            'suhrid-api-key-dream': API_KEY
        }
    })
        .then(handleResponse)
        .then(showCompanyResult)
        .catch(showError);
}


// ==================== DELETE COMPANY ====================
function deleteCompany() {

    const companyId = Number(document.getElementById('companyIdDelete').value);

    fetch(`${API.company}/deleteCompanyById/${companyId}`, {
        method: 'DELETE',
        headers: {
            'suhrid-api-key-dream': API_KEY
        }
    })
        .then(handleResponse)
        .then(showCompanyResult)
        .catch(showError);
}


// -------------------- COMMON HELPERS --------------------

// Handles JSON + plain text + API errors
function handleResponse(response) {
    if (!response.ok) {
        return response.text().then(text => {
            throw new Error(text || `HTTP Error ${response.status}`);
        });
    }

    return response.text().then(text => {
        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    });
}

// Displays result in <pre>
function showCompanyResult(data) {
    document.getElementById('companyResult').textContent =
        typeof data === 'string'
            ? data
            : JSON.stringify(data, null, 2);
}

// Centralized error handler
function showError(error) {
    document.getElementById('companyResult').textContent =
        `❌ Error: ${error.message}`;
    console.error(error);
}
