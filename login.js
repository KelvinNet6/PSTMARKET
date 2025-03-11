document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        const defaultEmail = "kelvin.net6@gmail.com";
        const defaultPassword = "433677kk";
        
        if (email === defaultEmail && password === defaultPassword) {
            alert("Login successful!");
            window.location.href = "home.html"; // Redirect to dashboard
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});
