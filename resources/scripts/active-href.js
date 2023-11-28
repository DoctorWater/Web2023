document.addEventListener("DOMContentLoaded", function () {
    console.log("STARTED")
    const currentPath = "#";
    const menuLinks = document.querySelectorAll(".side-nav a");

    menuLinks.forEach(link => {
        console.log(link.getAttribute("href"))
        if (link.getAttribute("href") === currentPath) {
            console.log("WORKED!")
            link.parentElement.classList.add("active");
        }
    });
});
