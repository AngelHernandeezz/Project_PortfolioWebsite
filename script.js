const statsSection = document.querySelector('#experiencia');
const numbers = statsSection.querySelectorAll('h2, h3');
let animated = false;

function animateNumber(element) {
    const text = element.innerText.trim();

    const value = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[0-9]/g, '');

    let current = 0;
    const duration = 4000;
    const increment = value / (duration / 16);

    function update() {
        current += increment;

        if (current < value) {
            element.innerText = Math.ceil(current) + suffix;
            requestAnimationFrame(update);
        } else {
            element.innerText = value + suffix;
        }
    }

    element.innerText = '0' + suffix;
    update();
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                numbers.forEach(num => animateNumber(num));
                animated = true;
            }
        });
    },
    { threshold: 0.4 }
);

observer.observe(statsSection);

const allSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.id === 'experiencia' && !countersAnimated) {
                    numbers.forEach(num => animateNumber(num));
                    countersAnimated = true;
                }

                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

allSections.forEach(section => sectionObserver.observe(section));