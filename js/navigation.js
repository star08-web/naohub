let menu = document.getElementById("menu")
let closeicn = document.getElementById("close-icon-menu")
let openicn = document.getElementById("open-icon-menu")
let navbar = document.querySelector('.navbar');
document.addEventListener("DOMContentLoaded", () => {
    closeicn.style.opacity = 0;
    openicn.style.opacity = 1;
});
menu.addEventListener("click", () => {
    document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";
    menu.classList.toggle("menu-upper");
    if (document.body.dataset.nav === "false") {
        closeicn.style.opacity = 0;
        openicn.style.opacity = 1;
        navbar.classList.remove("open");
    } else {
        openicn.style.opacity = 0;
        closeicn.style.opacity = 1;
        navbar.classList.add("open");
    }
});