function showRoles() {
    document.getElementById("roles").scrollIntoView({
        behavior: "smooth"
    });
}

function studentLogin() {
    window.location.href = "student-login.html";
}

function instructorLogin() {
    window.location.href = "instructor-login.html";
}

function adminLogin() {
    window.location.href = "admin-login.html";
}