// CREATE JOB
function createJob() {
    const job = {
        jobId: Number(document.getElementById('jobId').value),
        titleString: document.getElementById('titleString').value,
        locationString: document.getElementById('locationString').value,
        jobTypeString: document.getElementById('jobTypeString').value,
        publishedDateString: document.getElementById('publishedDateString').value,
        descriptionString: document.getElementById('descriptionString').value,
        experienceLevelString: document.getElementById('experienceLevelString').value,
        applicationUrlString: document.getElementById('applicationUrlString').value,
        minSalaryString: document.getElementById('minSalaryString').value,
        maxSalaryString: document.getElementById('maxSalaryString').value,
        company: {
            companyId: Number(document.getElementById('companyIdForJob').value)
        }
    };

    fetch(`${BASE_URL}/jobs`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(job)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('jobResult').innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(err => console.error(err));
}


// UPDATE JOB
function updateJob() {

    const jobId = document.getElementById("jobId").value;

    const body = {
        titleString: document.getElementById("jobTitle").value,
        locationString: document.getElementById("jobLocation").value,
        jobTypeString: document.getElementById("jobType").value,
        experienceLevelString: document.getElementById("experienceLevel").value,
        publishedDateString: document.getElementById("publishedDate").value,
        minSalaryString: document.getElementById("minSalary").value,
        maxSalaryString: document.getElementById("maxSalary").value,
        companyId: document.getElementById("companyIdForJob").value
    };

    fetch(`${API.jobs}/updateJob/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("jobResult").textContent =
            JSON.stringify(data, null, 2);
    })
    .catch(err => alert(err));
}

// GET JOB BY ID
function getJobById() {

    const jobId = document.getElementById("jobId").value;

    fetch(`${API.jobs}/getJob/${jobId}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("jobTitle").value = data.titleString || "";
            document.getElementById("jobLocation").value = data.locationString || "";
            document.getElementById("jobType").value = data.jobTypeString || "";
            document.getElementById("experienceLevel").value = data.experienceLevelString || "";
            document.getElementById("publishedDate").value = data.publishedDateString || "";
            document.getElementById("minSalary").value = data.minSalaryString || "";
            document.getElementById("maxSalary").value = data.maxSalaryString || "";

            document.getElementById("jobResult").textContent =
                JSON.stringify(data, null, 2);
        })
        .catch(() => alert("Job not found"));
}

// DELETE JOB
function deleteJob() {

    const jobId = document.getElementById("jobId").value;

    fetch(`${API.jobs}/dropDelete/${jobId}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("jobResult").textContent =
            "Deleted: " + data;
    })
    .catch(err => alert(err));
}

// SEARCH JOBS
function searchJobs() {

    const value = document.getElementById("searchValue").value;
    const type = document.getElementById("searchType").value;

    fetch(`${API.jobs}/getJob/${type}/${value}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("jobResult").textContent =
                JSON.stringify(data, null, 2);
        })
        .catch(err => alert(err));
}
