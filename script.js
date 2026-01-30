// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);

// Mobile Menu Toggle
function toggleMobileMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Smooth reveal on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.pub-item, .timeline-item, .award-item, .edu-card, .news-item, .service-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Publication Filtering (for publications page)
function filterPublications(tag) {
    const allTags = document.querySelectorAll('.filter-tag');
    const allPubs = document.querySelectorAll('.pub-item[data-tags]');
    
    // Update active state
    allTags.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter publications
    if (tag === 'all') {
        allPubs.forEach(pub => pub.setAttribute('data-hidden', 'false'));
    } else {
        allPubs.forEach(pub => {
            const tags = pub.getAttribute('data-tags').split(',');
            if (tags.includes(tag)) {
                pub.setAttribute('data-hidden', 'false');
            } else {
                pub.setAttribute('data-hidden', 'true');
            }
        });
    }
}
