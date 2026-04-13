const navbar = document.querySelector('.navbar');
const counters = document.querySelectorAll('.stat-item h3');
const fadeElements = document.querySelectorAll('.mission-card, .project-card');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.8rem 10%';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.padding = '1.5rem 10%';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

const observerOptions = {
    threshold: 0.2
};

const countUp = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.innerText.replace(/\D/g, ''));
            let current = 0;
            const increment = countTo / 50;
            
            const updateCount = () => {
                if (current < countTo) {
                    current += increment;
                    target.innerText = Math.ceil(current) + (target.innerText.includes('+') ? '+' : '');
                    setTimeout(updateCount, 20);
                } else {
                    target.innerText = countTo + (target.innerText.includes('+') ? '+' : '');
                }
            };
            
            updateCount();
            observer.unobserve(target);
        }
    });
};

const revealOnScroll = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const counterObserver = new IntersectionObserver(countUp, observerOptions);
counters.forEach(counter => counterObserver.observe(counter));

const revealObserver = new IntersectionObserver(revealOnScroll, observerOptions);
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    revealObserver.observe(el);
});


document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Un-comment the line below if you want the animation 
                // to repeat every time you scroll up and down:
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Apply the observer to all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});