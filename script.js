/* =========================================================
   HIRA ASIM — INTERACTIONS
   ========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   PRELOADER
   ========================================================= */

const loaderPercent = document.querySelector("#loaderPercent");
const loaderBar = document.querySelector(".loader-line span");

let loaderValue = 0;

const loaderInterval = setInterval(() => {

    loaderValue += Math.floor(Math.random() * 8) + 2;

    if (loaderValue >= 100) {

        loaderValue = 100;

        clearInterval(loaderInterval);

        gsap.to(".preloader", {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            delay: .3
        });

        startHeroAnimation();
    }

    loaderPercent.textContent = loaderValue;
    loaderBar.style.width = `${loaderValue}%`;

}, 45);


/* =========================================================
   HERO ANIMATION
   ========================================================= */

function startHeroAnimation() {

    const tl = gsap.timeline();

    tl.from(".navbar", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })

    .from(".eyebrow", {
        y: 30,
        opacity: 0,
        duration: .8,
        ease: "power3.out"
    }, "-=.5")

    .from(".hero-line-text", {
        yPercent: 110,
        opacity: 0,
        stagger: .12,
        duration: 1.2,
        ease: "power4.out"
    }, "-=.5")

    .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: .8,
        ease: "power3.out"
    }, "-=.7")

    .from(".circle-button", {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, .6)"
    }, "-=.7")

    .from(".hero-image-wrapper", {
        y: 80,
        opacity: 0,
        scale: .9,
        duration: 1.4,
        ease: "power4.out"
    }, "-=1")

    .from(".orbit-one, .orbit-two", {
        scale: .7,
        opacity: 0,
        duration: 1.4,
        stagger: .1,
        ease: "power3.out"
    }, "-=1");

}


/* =========================================================
   NAVBAR SCROLL
   ========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

});


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: .1
    });

});


function animateCursor() {

    ringX += (mouseX - ringX) * .12;
    ringY += (mouseY - ringY) * .12;

    gsap.set(cursorRing, {
        x: ringX,
        y: ringY
    });

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* =========================================================
   MAGNETIC BUTTONS
   ========================================================= */

document.querySelectorAll(".magnetic").forEach(button => {

    button.addEventListener("mousemove", (event) => {

        const rect = button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        gsap.to(button, {
            x: x * .15,
            y: y * .15,
            duration: .4,
            ease: "power3.out"
        });

    });

    button.addEventListener("mouseleave", () => {

        gsap.to(button, {
            x: 0,
            y: 0,
            duration: .7,
            ease: "elastic.out(1,.4)"
        });

    });

});


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

gsap.utils.toArray(
    ".about-heading, .about-copy, .section-header, .project, .services-intro, .service-row, .process-header, .process-item, blockquote"
).forEach(element => {

    gsap.from(element, {

        y: 70,
        opacity: 0,

        duration: 1.1,

        ease: "power4.out",

        scrollTrigger: {

            trigger: element,

            start: "top 85%",

            toggleActions: "play none none reverse"

        }

    });

});


/* =========================================================
   STATS COUNTER
   ========================================================= */

document.querySelectorAll(".counter").forEach(counter => {

    const target = Number(counter.dataset.target);

    ScrollTrigger.create({

        trigger: counter,

        start: "top 85%",

        once: true,

        onEnter: () => {

            const obj = { value: 0 };

            gsap.to(obj, {

                value: target,

                duration: 1.6,

                ease: "power2.out",

                onUpdate: () => {
                    counter.textContent = Math.round(obj.value);
                }

            });

        }

    });

});


/* =========================================================
   HERO IMAGE PARALLAX
   ========================================================= */

gsap.to(".hero-image-wrapper", {

    y: 50,

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: 1

    }

});


/* =========================================================
   ORBIT ROTATION
   ========================================================= */

gsap.to(".orbit-one", {

    rotation: 360,

    duration: 30,

    repeat: -1,

    ease: "none"

});

gsap.to(".orbit-two", {

    rotation: -360,

    duration: 45,

    repeat: -1,

    ease: "none"

});


/* =========================================================
   HERO GLOW MOVEMENT
   ========================================================= */

gsap.to(".hero-glow-one", {

    x: -100,
    y: 80,

    duration: 7,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* =========================================================
   STATEMENT TEXT PARALLAX
   ========================================================= */

gsap.from(".statement h2", {

    y: 100,

    opacity: 0,

    scrollTrigger: {

        trigger: ".statement",

        start: "top 70%",

        end: "center center",

        scrub: 1

    }

});


/* =========================================================
   SERVICE HOVER CURSOR
   ========================================================= */

document.querySelectorAll(".service-row").forEach(row => {

    row.addEventListener("mouseenter", () => {

        gsap.to(cursorRing, {

            scale: 2,

            borderColor: "rgba(239,44,145,.7)",

            duration: .3

        });

    });

    row.addEventListener("mouseleave", () => {

        gsap.to(cursorRing, {

            scale: 1,

            borderColor: "rgba(239,44,145,.5)",

            duration: .3

        });

    });

});


/* =========================================================
   SMOOTH IMAGE HOVER
   ========================================================= */

document.querySelectorAll(".project-image").forEach(image => {

    image.addEventListener("mouseenter", () => {

        gsap.to(image, {

            scale: .98,

            duration: .6,

            ease: "power3.out"

        });

    });

    image.addEventListener("mouseleave", () => {

        gsap.to(image, {

            scale: 1,

            duration: .6,

            ease: "power3.out"

        });

    });

});


/* =========================================================
   REFRESH SCROLLTRIGGER
   ========================================================= */

window.addEventListener("load", () => {

    ScrollTrigger.refresh();

});