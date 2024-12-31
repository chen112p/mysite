document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.getElementById("email-link");
    const user = "chen112p"; // Replace with your email username (before the @)
    const domain = "gmail.com"; // Replace with your email domain

    emailLink.addEventListener("click", (event) => {
        event.preventDefault();
        const email = `${user}@${domain}`;
        window.location.href = `mailto:${email}`;
    });

    emailLink.title = "Click to reveal email";
});

