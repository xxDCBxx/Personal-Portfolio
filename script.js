// Header Visibility
const header = document.getElementById('mainHeader');
const homeSection = document.getElementById('home');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) header.classList.add('visible');
        else header.classList.remove('visible');
    });
}, { threshold: 0.1 });
observer.observe(homeSection);

function toggleContact() {
    document.getElementById('contactMenu').classList.toggle('active');
}

// Typewriter Effect
const textArray = [
    "Hey! I’m Rain Jade De Castro, a Computer Science student who enjoys diving deep into the software side of tech.",
    "Outside of coding, I love video gaming, typing, and of course, eating good food.",
    "I’m always eager to learn more, improve my skills, and grow into a developer who builds meaningful software."
];
let textIdx = 0, charIdx = 0;
const typewriterElement = document.getElementById('typewriter');

function type() {
    if (charIdx < textArray[textIdx].length) {
        typewriterElement.textContent += textArray[textIdx].charAt(charIdx);
        charIdx++;
        setTimeout(type, 60);
    } else {
        setTimeout(erase, 2500);
    }
}

function erase() {
    if (charIdx > 0) {
        typewriterElement.textContent = textArray[textIdx].substring(0, charIdx - 1);
        charIdx--;
        setTimeout(erase, 30);
    } else {
        textIdx = (textIdx + 1) % textArray.length;
        setTimeout(type, 500);
    }
}

window.onload = type;

// Portfolio Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 4000);