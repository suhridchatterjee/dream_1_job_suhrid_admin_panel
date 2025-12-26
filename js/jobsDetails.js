// CREATE JOB DETAILS
function createJobDetails() {

    const body = {
        jobId: document.getElementById("detailsJobId").value,
        jobHighlights: document.getElementById("jobHighlights").value,
        jobDescription: document.getElementById("jobDescription").value,
        aboutCompany: document.getElementById("aboutCompany").value
    };

    fetch(`${API.jobDetails}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("detailsResult").textContent =
            JSON.stringify(data, null, 2);
    })
    .catch(err => alert(err));
}

// UPDATE JOB DETAILS
function updateJobDetails() {

    const jobId = document.getElementById("detailsJobId").value;

    const body = {
        jobHighlights: document.getElementById("jobHighlights").value,
        jobDescription: document.getElementById("jobDescription").value,
        aboutCompany: document.getElementById("aboutCompany").value
    };

    fetch(`${API.jobDetails}/update/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("detailsResult").textContent =
            JSON.stringify(data, null, 2);
    })
    .catch(err => alert(err));
}

// GET JOB DETAILS
function getJobDetails() {

    const jobId = document.getElementById("detailsJobId").value;

    fetch(`${API.jobDetails}/get/${jobId}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("jobHighlights").value =
                data.jobHighlights || "";
            document.getElementById("jobDescription").value =
                data.jobDescription || "";
            document.getElementById("aboutCompany").value =
                data.aboutCompany || "";

            document.getElementById("detailsResult").textContent =
                JSON.stringify(data, null, 2);
        })
        .catch(() => alert("No details found"));
}

// DELETE JOB DETAILS
function deleteJobDetails() {

    const jobId = document.getElementById("detailsJobId").value;

    fetch(`${API.jobDetails}/delete/${jobId}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(data => {
        document.getElementById("detailsResult").textContent =
            "Deleted Successfully";
    })
    .catch(err => alert(err));
}
