function big(img) {
    const inmg = document.querySelector('.big');
    inmg.src = img;
    inmg.style.opacity = "1";

    inmg.style.animation = 'none';
    void inmg.offsetWidth;
    inmg.style.animation = 'popup 0.3s ease-in-out';
}

function hideimage() {
    const inmg = document.querySelector(".big")
    inmg.style.opacity = "0";
}

const section = document.querySelectorAll('section');
const navlink = document.querySelectorAll('nav ul li a');

window.addEventListener("scroll", () => {

    let current = "";

    section.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 20;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            current = id;
        }
    });

    navlink.forEach(nav => {
        nav.classList.remove("active");
        if (nav.getAttribute("href") === "#" + current) {
            nav.classList.add("active");
        }
    })
});

// nav bar toggle event in mobile view 

const hamber = document.querySelector(".hamberger");
const navbar = document.querySelector("nav ul");
const nalink = navbar.querySelectorAll("a");

hamber.addEventListener("click", () => {
    navbar.classList.toggle("show");
});

nalink.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");
    });
});

document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !hamber.contains(e.target)) {
        navbar.classList.remove("show");
    }
});