/* =========================================================
   HIRA ASIM — ROAR WITH VISUALS
   INTERACTION + MOTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNavigation =
        document.querySelector(".mobile-navigation");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav-links a");

    const cursor =
        document.querySelector(".cursor");

    const cursorRing =
        document.querySelector(".cursor-ring");


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function openMenu() {

        body.classList.add("menu-open");

        if (menuToggle) {
            menuToggle.classList.add("active");
            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );
        }

    }


    function closeMenu() {

        body.classList.remove("menu-open");

        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );
        }

    }


    function toggleMenu() {

        if (body.classList.contains("menu-open")) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    if (menuToggle) {
        menuToggle.addEventListener(
            "click",
            toggleMenu
        );
    }


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /*
       If user resizes from mobile to desktop
       while the menu is open, close it.
    */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 900 &&
            body.classList.contains("menu-open")
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       CURSOR
    ====================================================== */

    if (
        cursor &&
        cursorRing &&
        window.matchMedia("(hover: hover)").matches
    ) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;


        window.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });


        function animateCursor() {

            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        const hoverTargets = document.querySelectorAll(
            "a, button, .work-card, .service-row, .transform-card"
        );


        hoverTargets.forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => body.classList.add("cursor-hover")
            );

            element.addEventListener(
                "mouseleave",
                () => body.classList.remove("cursor-hover")
            );

        });

    }


    /* =====================================================
       IMAGE FALLBACK
    ====================================================== */

    document.querySelectorAll("img").forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            const parent = image.parentElement;

            if (parent) {
                parent.style.background =
                    "linear-gradient(135deg, #65152b, #181615)";
            }

        });

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetID);

            if (!target) {
                return;
            }


            event.preventDefault();


            const headerOffset = 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       GSAP
    ====================================================== */

    function initAnimations() {

        if (
            typeof gsap === "undefined" ||
            typeof ScrollTrigger === "undefined"
        ) {
            return;
        }


        gsap.registerPlugin(ScrollTrigger);


        /* -----------------------------------------------
           LOADER
        ------------------------------------------------ */

        const loader =
            document.querySelector(".loader");

        const loaderSpans =
            document.querySelectorAll(".loader-inner span");

        const loaderBar =
            document.querySelector(".loader-line span");


        const loaderTimeline = gsap.timeline({
            defaults: {
                ease: "power4.out"
            }
        });


        loaderTimeline
            .to(loaderSpans, {
                y: 0,
                duration: 0.9,
                stagger: 0.1
            })
            .to(loaderBar, {
                width: "100%",
                duration: 0.9,
                ease: "power2.inOut"
            }, "-=0.35")
            .to(loader, {
                yPercent: -100,
                duration: 1.1,
                ease: "power4.inOut"
            }, "+=0.15")
            .set(loader, {
                display: "none"
            })
            .add(() => {
                heroAnimation();
            });


        /* -----------------------------------------------
           HERO
        ------------------------------------------------ */

        function heroAnimation() {

            const heroLines =
                document.querySelectorAll(".reveal-line");

            gsap.fromTo(
                heroLines,
                {
                    yPercent: 120,
                    opacity: 0
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.09,
                    ease: "power4.out"
                }
            );


            gsap.fromTo(
                ".hero-topline",
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    delay: 0.2,
                    ease: "power3.out"
                }
            );


            gsap.fromTo(
                ".hero-image-wrap",
                {
                    y: 70,
                    opacity: 0,
                    clipPath: "inset(100% 0 0 0)"
                },
                {
                    y: 0,
                    opacity: 1,
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.5,
                    delay: 0.25,
                    ease: "power4.out"
                }
            );


            gsap.fromTo(
                ".hero-copy",
                {
                    y: 35,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.45,
                    ease: "power3.out"
                }
            );


            gsap.fromTo(
                ".hero-bottom",
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.7,
                    ease: "power3.out"
                }
            );

        }


        /* -----------------------------------------------
           GENERAL REVEALS
        ------------------------------------------------ */

        gsap.utils.toArray(
            ".section-number, .eyebrow, .clarity-statement, .clarity-side"
        ).forEach((element) => {

            gsap.fromTo(
                element,
                {
                    y: 40,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    }
                }
            );

        });


        /* -----------------------------------------------
           CLARITY HEADING
        ------------------------------------------------ */

        gsap.fromTo(
            ".clarity-heading h2",
            {
                yPercent: 30,
                opacity: 0
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 1.3,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".clarity-heading",
                    start: "top 75%",
                    once: true
                }
            }
        );


        /* -----------------------------------------------
           TRANSFORMATION CARDS
        ------------------------------------------------ */

        gsap.fromTo(
            ".transform-card",
            {
                y: 80,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.18,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".transformation-grid",
                    start: "top 75%",
                    once: true
                }
            }
        );


        /* -----------------------------------------------
           ABOUT IMAGES
        ------------------------------------------------ */

        gsap.utils.toArray(".reveal-image").forEach((image) => {

            gsap.fromTo(
                image,
                {
                    clipPath: "inset(100% 0 0 0)",
                    y: 60
                },
                {
                    clipPath: "inset(0% 0 0 0)",
                    y: 0,
                    duration: 1.4,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: image,
                        start: "top 80%",
                        once: true
                    }
                }
            );

        });


        /* -----------------------------------------------
           ABOUT CONTENT
        ------------------------------------------------ */

        gsap.fromTo(
            ".about-content h2",
            {
                y: 80,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".about-content",
                    start: "top 75%",
                    once: true
                }
            }
        );


        gsap.fromTo(
            ".about-copy p",
            {
                y: 30,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-copy",
                    start: "top 82%",
                    once: true
                }
            }
        );


        /* -----------------------------------------------
           PROOF NUMBER
        ------------------------------------------------ */

        gsap.fromTo(
            ".proof-number",
            {
                x: -100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.4,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".proof-section",
                    start: "top 70%",
                    once: true
                }
            }
        );


        gsap.fromTo(
            ".proof-text",
            {
                x: 80,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".proof-section",
                    start: "top 70%",
                    once: true
                }
            }
        );


        /* -----------------------------------------------
           WORK HEADING
        ------------------------------------------------ */

        gsap.fromTo(
            ".work-heading h2",
            {
                y: 70,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".work-heading",
                    start: "top 75%",
                    once: true
                }
            }
        );


        /* -----------------------------------------------
           DESKTOP HORIZONTAL WORK
        ------------------------------------------------ */

        const workScroller =
            document.querySelector(".work-scroller");


        if (
            workScroller &&
            window.innerWidth > 900
        ) {

            const getScrollAmount = () => {

                return Math.max(
                    0,
                    workScroller.scrollWidth -
                    window.innerWidth +
                    window.innerWidth * 0.08
                );

            };


            gsap.to(workScroller, {

                x: () => -getScrollAmount(),

                ease: "none",

                scrollTrigger: {
                    trigger: ".work-section",
                    start: "top top",
                    end: () =>
                        `+=${getScrollAmount() * 1.15}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true
                }

            });

        }


        /* -----------------------------------------------
           SERVICES
        ------------------------------------------------ */

        gsap.utils.toArray(".service-row").forEach(
            (row, index) => {

                gsap.fromTo(
                    row,
                    {
                        x: index % 2 === 0
                            ? -50
                            : 50,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 88%",
                            once: true
                        }
                    }
                );

            }
        );


        /* -----------------------------------------------
           MANIFESTO
        ------------------------------------------------ */

        gsap.utils.toArray(
            ".manifesto-copy p"
        ).forEach((line, index) => {

            gsap.fromTo(
                line,
                {
                    y: 60,
                    opacity: 0.15
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: line,
                        start: "top 88%",
                        once: true
                    }
                }
            );

        });


        /* -----------------------------------------------
           CONTACT
        ------------------------------------------------ */

        gsap.fromTo(
            ".contact-main h2",
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1.3,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".contact-section",
                    start: "top 75%",
                    once: true
                }
            }
        );


        /* -----------------------------------------------
           PARALLAX IMAGES
        ------------------------------------------------ */

        gsap.utils.toArray(
            ".about-image-main img, .about-image-small img"
        ).forEach((image) => {

            gsap.to(
                image,
                {
                    yPercent: 8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: image.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );

        });


        /* -----------------------------------------------
           HERO BACKGROUND PARALLAX
        ------------------------------------------------ */

        gsap.to(
            ".hero-background-word",
            {
                y: 130,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );


        /* -----------------------------------------------
           MANIFESTO STAMP
        ------------------------------------------------ */

        gsap.to(
            ".manifesto-stamp",
            {
                rotation: 370,
                ease: "none",
                scrollTrigger: {
                    trigger: ".manifesto-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );


        /* -----------------------------------------------
           REFRESH
        ------------------------------------------------ */

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ====================================================== */

    function initMagneticElements() {

        if (
            !window.matchMedia("(hover: hover)").matches
        ) {
            return;
        }


        const magneticElements =
            document.querySelectorAll(".magnetic");


        magneticElements.forEach((element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    const strength =
                        element.classList.contains("contact-button")
                            ? 0.18
                            : 0.28;


                    element.style.transform =
                        `translate(${x * strength}px, ${y * strength}px)`;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "translate(0, 0)";

                }
            );

        });

    }


    /* =====================================================
       INITIALIZE
    ====================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const loader =
            document.querySelector(".loader");

        if (loader) {
            loader.style.display = "none";
        }

    } else {

        initAnimations();

    }


    initMagneticElements();

    // Your existing website JS above...


    // ==============================
    // TESTIMONIAL SLIDER
    // ==============================

    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    const testimonialNext = document.querySelector(".testimonial-next");
    const testimonialPrev = document.querySelector(".testimonial-prev");
    const testimonialProgress = document.querySelector(".testimonial-progress");

    let testimonialIndex = 0;
    let testimonialTimer;

    function showTestimonial(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        if (testimonialProgress) {
            testimonialProgress.style.width =
                `${((index + 1) / testimonialSlides.length) * 100}%`;
        }
    }

    function nextTestimonial() {
        testimonialIndex =
            (testimonialIndex + 1) % testimonialSlides.length;

        showTestimonial(testimonialIndex);
    }

    function previousTestimonial() {
        testimonialIndex =
            (testimonialIndex - 1 + testimonialSlides.length) %
            testimonialSlides.length;

        showTestimonial(testimonialIndex);
    }

    function startTestimonialAutoPlay() {
        testimonialTimer = setInterval(nextTestimonial, 5500);
    }

    function resetTestimonialAutoPlay() {
        clearInterval(testimonialTimer);
        startTestimonialAutoPlay();
    }

    if (testimonialSlides.length) {
        showTestimonial(0);
        startTestimonialAutoPlay();
    }

    testimonialNext?.addEventListener("click", () => {
        nextTestimonial();
        resetTestimonialAutoPlay();
    });

    testimonialPrev?.addEventListener("click", () => {
        previousTestimonial();
        resetTestimonialAutoPlay();
    });

    // =========================================
// BACK TO TOP
// =========================================

const backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 700) {
        backToTop?.classList.add("visible");
    } else {
        backToTop?.classList.remove("visible");
    }
});

backToTop?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


});
        
        
