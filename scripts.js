function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

function togglePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function isElementScrolledBeyondTop(element) {
    const rect = element.getBoundingClientRect();
    return (rect.top+rect.height/2) < 0; 
}

window.onload = function() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 500); 
    });
};


window.addEventListener('scroll', function() {
    const targetElement = document.querySelector('.nav-sections');
    const floatingButton = document.querySelector('.floating-button');
    if (isElementScrolledBeyondTop(targetElement)) {
        floatingButton.style.display = 'flex'; 
    } else {
        floatingButton.style.display = 'none'; 
        document.getElementById('popup').style.display = 'none';
    }
});

const texts = ["A Java Developer", "A Web Developer", "A Mobile Developer"];
let currentTextIndex = 0;
let currentText = texts[currentTextIndex];
let displayText = "";
let deleting = true;
let index = 0;
let pause = false;

function updateText() {
    const textContainer = document.getElementById("animated_Text");
    if (!pause) {
        if (deleting) {
            // Delete characters
            displayText = currentText.slice(0, currentText.length - index);
            index++;
            if (displayText === "A ") {
                deleting = false;
                index = 1;
                pause = true;
                setTimeout(() => {
                    pause = false; 
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    currentText = texts[currentTextIndex]; 
                }, 100); 
            }
        } else {
            // Add characters
            displayText = currentText.slice(0, index);
            index++;
            if (index > currentText.length) {
                deleting = true; 
                index = 1;
                pause = true; 
                setTimeout(() => {
                    pause = false; 
                }, 2500); 
            }
        }

        textContainer.textContent = displayText === "" ? " " : displayText;
    }
}
setInterval(updateText, 100);


const sections = document.querySelectorAll('section');

const checkVisibility = () => {
    const triggerBottom = window.innerHeight / 2;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('visible'); 
            section.classList.remove('hidden'); 
        } else {
            section.classList.remove('visible'); 
            section.classList.add('hidden'); 
        }
    });
};

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

checkVisibility();
