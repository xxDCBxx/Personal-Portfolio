document.addEventListener("DOMContentLoaded", function () {

    // --- 1. SELECTIONS ---
    const header = document.getElementById('mainHeader');
    const homeSection = document.getElementById('home');
    const footer = document.querySelector('footer');
    const floatingContact = document.querySelector('.floating-contact');
    const contactMenu = document.getElementById('contactMenu');

    // State tracking to prevent observers from fighting
    let isHomeVisible = true;
    let isFooterVisible = false;

    // --- 2. VISIBILITY LOGIC (Header & Floating Contact) ---
    
    // Function to handle showing/hiding the floating button
    function updateFloatingButton() {
        if (isHomeVisible || isFooterVisible) {
            floatingContact.classList.add('hidden');
            contactMenu.classList.remove('active'); // Close menu when hiding
        } else {
            floatingContact.classList.remove('hidden');
        }
    }

    // Observer for the Home Section (Controls Header & Floating Button)
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isHomeVisible = entry.isIntersecting;
            
            // Header logic
            if (!entry.isIntersecting) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
            updateFloatingButton();
        });
    }, { threshold: 0.1 });

    // Observer for the Footer (Hides button when footer appears)
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isFooterVisible = entry.isIntersecting;
            updateFloatingButton();
        });
    }, { threshold: 0.1 });

    homeObserver.observe(homeSection);
    footerObserver.observe(footer);

    // --- 3. CONTACT TOGGLE LOGIC ---

    window.toggleContact = function (event) {
        if (event) event.stopPropagation(); // Prevents immediate closing from the "click outside" logic
        contactMenu.classList.toggle('active');
    };

    // Click outside to close the menu
    document.addEventListener('click', (event) => {
        if (!floatingContact.contains(event.target)) {
            contactMenu.classList.remove('active');
        }
    });

    // --- 4. TYPEWRITER EFFECT ---
    const textArray = [
        "Hey! I’m Rain Jade De Castro, a Computer Science student who enjoys diving deep into the software side of tech.",
        "Outside of coding, I love video gaming, typing, and of course, eating good food.",
        "I’m always eager to learn more, improve my skills, and grow into a developer who builds meaningful software."
    ];

    let textIdx = 0;
    let charIdx = 0;
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

    if (typewriterElement) type();

    // --- 5. PORTFOLIO SLIDESHOW ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }
});