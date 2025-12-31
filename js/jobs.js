// -------------------- JOB API METHODS --------------------

// CREATE JOB
function createJob() {
    const companyId = Number(document.getElementById("companyIdCreateJob").value);
    const jobId = Number(document.getElementById("jobIdCreate").value);

    if (!jobId || !companyId) {
        showJobResult("❌ Job ID and Company ID are required");
        return;
    }

    const job = {
        jobId: jobId,
        titleString: document.getElementById("jobTitle").value || null,
        locationString: document.getElementById("jobLocation").value || null,
        jobTypeString: document.getElementById("jobType").value || null,
        publishedDateString: document.getElementById("publishedDate").value || null,
        descriptionString: document.getElementById("jobDescription").value || null,
        experienceLevelString: document.getElementById("experienceLevel").value || null,
        applicationUrlString: document.getElementById("applicationUrl").value || null,
        minSalaryString: document.getElementById("minSalary").value || null,
        maxSalaryString: document.getElementById("maxSalary").value || null,
        companyDto: { companyId }
    };

    fetch(`${API.jobs}/create/Job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "suhrid-api-key-dream": API_KEY
        },
        body: JSON.stringify(job)
    })
    .then(handleResponse)
    .then(showJobResult)
    .catch(err => showJobResult(err.message));
}



// UPDATE JOB
function updateJob() {
    const jobId = Number(document.getElementById("jobIdUpdate").value);
    const companyId = Number(document.getElementById("companyIdUpdateJob").value);

    if (!jobId) {
        showJobResult("❌ Job ID is required");
        return;
    }

    const job = {
        titleString: document.getElementById("jobTitle").value || null,
        locationString: document.getElementById("jobLocation").value || null,
        jobTypeString: document.getElementById("jobType").value || null,
        publishedDateString: document.getElementById("publishedDate").value || null,
        descriptionString: document.getElementById("jobDescription").value || null,
        experienceLevelString: document.getElementById("experienceLevel").value || null,
        applicationUrlString: document.getElementById("applicationUrl").value || null,
        minSalaryString: document.getElementById("minSalary").value || null,
        maxSalaryString: document.getElementById("maxSalary").value || null
    };

    if (companyId) {
        job.companyDto = { companyId };
    }

    fetch(`${API.jobs}/updateJob/${jobId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "suhrid-api-key-dream": API_KEY
        },
        body: JSON.stringify(job)
    })
    .then(handleResponse)
    .then(showJobResult)
    .catch(err => showJobResult(err.message));
}



// GET JOB BY ID
function getJobById() {
    const jobId = Number(document.getElementById("jobIdGet").value);

    if (!jobId) {
        showJobResult("❌ Job ID required");
        return;
    }

    fetch(`${API.jobs}/getJob/${jobId}`, {
        headers: { "suhrid-api-key-dream": API_KEY }
    })
    .then(handleResponse)
    .then(data => {
        document.getElementById("jobId").value = data?.jobId || "";
        document.getElementById("jobTitle").value = data?.titleString || "";
        document.getElementById("jobLocation").value = data?.locationString || "";
        document.getElementById("jobType").value = data?.jobTypeString || "";
        document.getElementById("publishedDate").value = data?.publishedDateString || "";
        document.getElementById("jobDescription").value = data?.descriptionString || "";
        document.getElementById("experienceLevel").value = data?.experienceLevelString || "";
        document.getElementById("applicationUrl").value = data?.applicationUrlString || "";
        document.getElementById("minSalary").value = data?.minSalaryString || "";
        document.getElementById("maxSalary").value = data?.maxSalaryString || "";
        document.getElementById("companyIdForJob").value =
            data?.company?.companyId || data?.companyDto?.companyId || "";

        showJobResult(data);
    })
    .catch(() => showJobResult("❌ Job not found"));
}


// DELETE JOB
function deleteJob() {
    const jobId = Number(document.getElementById("jobIdDelete").value);

    if (!jobId) {
        showJobResult("❌ Job ID required");
        return;
    }

    fetch(`${API.jobs}/dropDelete/${jobId}`, {
        method: "DELETE",
        headers: { "suhrid-api-key-dream": API_KEY }
    })
    .then(handleResponse)
    .then(showJobResult)
    .catch(err => showJobResult(err.message));
}


// GET ALL JOBS
function getAllJobs() {
    fetch(`${API.jobs}/getAll/Job`, {
        headers: { "suhrid-api-key-dream": API_KEY }
    })
    .then(handleResponse)
    .then(showJobResult)
    .catch(err => showJobResult(err.message));
}


// SEARCH FUNCTIONS (MATCH YOUR UI BUTTONS)
function searchByTitle() {
    search(`/getJob/title/`, "searchTitle");
}

function searchByLocation() {
    search(`/getJob/location/`, "searchLocation");
}

function searchByJobType() {
    search(`/getJob/jobType/`, "searchJobType");
}

function searchByPublishedDate() {
    search(`/getJob/publishedDate/`, "searchPublishedDate");
}

function searchByExperience() {
    search(`/getJob/experienceLevel/`, "searchExperience");
}

function searchByCompanyName() {
    search(`/getJob/companyName/`, "searchCompanyName");
}


function search(endpoint, inputId) {
    const value = document.getElementById(inputId).value;

    if (!value) {
        showJobResult("❌ Search value required");
        return;
    }

    fetch(`${API.jobs}${endpoint}${encodeURIComponent(value)}`, {
        headers: { "suhrid-api-key-dream": API_KEY }
    })
    .then(handleResponse)
    .then(showJobResult)
    .catch(err => showJobResult(err.message));
}



// -------------------- OUTPUT PANEL --------------------

function showJobResult(data) {
    const panel = document.getElementById("jobResult");

    if (!data) {
        panel.textContent = "No response";
        return;
    }

    panel.textContent =
        typeof data === "string"
            ? data
            : JSON.stringify(data, null, 2);
}
