// Slideshow

const RightArrow = document.querySelector(".buttons .arrow.right");
const LeftArrow = document.querySelector(".buttons .arrow.left");

function moveRight(){
    var currentSlide = document.getElementsByClassName("slide active");
    var currentDot = document.getElementsByClassName("dot live");
    var nextSlide = currentSlide[0].nextElementSibling;
    var nextDot = currentDot[0].nextElementSibling;
    if (nextSlide === null){
        nextSlide = currentSlide[0].parentElement.firstElementChild;
        nextDot = currentDot[0].parentElement.children[1];
    }
    //currentSlide[0].animate({
    //    opacity: [0, 1]
    //    },{
    //    duration: 500,
    //    easing: "ease",
    //    iterations: 1,
    //    fill: "both"
    //});
    currentSlide[0].classList.remove("active");
    currentDot[0].classList.remove("live");

    //nextSlide.animate({
    //    duration: 500,
    //    easing: "ease",
    //    iterations: 1,
    //    fill: "both"
    //})
    nextSlide.classList.add("active");
    nextDot.classList.add("live");
}

RightArrow.addEventListener("click", moveRight);

function moveLeft(){
    var currentSlide = document.getElementsByClassName("slide active");
    var currentDot = document.getElementsByClassName("dot live");
    var nextSlide = currentSlide[0].previousElementSibling;
    var nextDot = currentDot[0].previousElementSibling;
    if (nextSlide === null){
        nextSlide = currentSlide[0].parentElement.lastElementChild;
        nextDot = currentDot[0].parentElement.children[4];
    }
    //currentSlide[0].animate({
    //    opacity: [0, 1]
    //    },{
    //    duration: 500,
    //    easing: "ease",
    //    iterations: 1,
    //    fill: "both"
    //});
    currentSlide[0].classList.remove("active");
    currentDot[0].classList.remove("live");

    //nextSlide.animate({
    //    duration: 500,
    //    easing: "ease",
    //    iterations: 1,
    //    fill: "both"
    //})
    nextSlide.classList.add("active");
    nextDot.classList.add("live");
}

LeftArrow.addEventListener("click", moveLeft);