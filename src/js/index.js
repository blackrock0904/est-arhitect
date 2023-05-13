const isSecondLoad = sessionStorage.getItem("secondLoad");
if (isSecondLoad) {
    const preloader = document.getElementById("preloader");
    preloader && preloader.classList.add("hidden");
}
window.scrollTo(0, 0);

function init () {
    const menu = document.getElementById("menu")
    if (menu) {
        menu.addEventListener("click", (e) => {
            if (e.target.className.includes("active")) {
                e.preventDefault()
            };
        });
    }

    initAnimation();
    const preloader = document.getElementById("preloader");
    preloader && preloader.classList.add("loaded");
    document.body.classList.add("loaded");

    const header = document.getElementById("header");
    const service = document.getElementById("service");
    const throttled = throttle(() => {
        header && service && header.classList.toggle("header--blur", service.getBoundingClientRect().top < header.style.height);
    }, 100);
    window.addEventListener("scroll", throttled);

    $(".portfolio__carousel-list").slick({
        centerMode: true,
        centerPadding: "100px",
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        dots: false,
        nextArrow: $(".portfolio__btn-right"),
        prevArrow: $(".portfolio__btn-left"),
    });
}

init()

function initAnimation() {
    const container = document.getElementById("section-hero");
    container && (container.style.height = '100vh');
    window.addEventListener("resize", () => container && (container.style.height = '100vh'));
    if (container && !isSecondLoad) {
    document.querySelectorAll('.hero-animate')
        .forEach(el => setTimeout(() => {
            const spinning = [
                { transform: "translateX(-100px)" },
                { transform: "translateX(0)" },
            ];
            const timing = {
                duration: 3000,
                iterations: 1,
            };
            el.animate(spinning, timing)
        },3000));
    }

    const bgSlider = document.querySelector(".section-hero__bg-slider");
    bgSlider && (bgSlider.style.backgroundImage = `url(${bgSlider.dataset.src})`);

    sessionStorage.setItem("secondLoad", "true");
}
