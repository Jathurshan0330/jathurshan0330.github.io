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
    const items = document.querySelectorAll('.pub-item');
    const categories = document.querySelectorAll('.pub-category');
    const filterTags = document.querySelectorAll('.filter-tag');

    // Update active filter tag
    filterTags.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    // Filter items
    items.forEach(item => {
        const tags = item.getAttribute('data-tags').split(',');
        if (tag === 'all' || tags.includes(tag)) {
            item.setAttribute('data-hidden', 'false');
            item.style.display = '';
        } else {
            item.setAttribute('data-hidden', 'true');
            item.style.display = 'none';
        }
    });

    // Hide year sections with no visible publications
    categories.forEach(category => {
        const visibleItems = category.querySelectorAll('.pub-item[data-hidden="false"]');
        if (visibleItems.length === 0) {
            category.style.display = 'none';
        } else {
            category.style.display = '';
        }
    });
}
