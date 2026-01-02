// ===================================
// FIREBASE CONFIGURATION
// ===================================

// Your web app's Firebase configuration
// Get this from Firebase Console > Project Settings > Your apps > Firebase SDK snippet
const firebaseConfig = {
    apiKey: "AIzaSyDnkbLXWvsEs50aeHAo1tRTAZdGj4dhvFQ",
    authDomain: "heatbox-2085c.firebaseapp.com",
    projectId: "heatbox-2085c",
    storageBucket: "heatbox-2085c.firebasestorage.app",
    messagingSenderId: "214536787988",
    appId: "1:214536787988:web:a4699408190039a9896f01",
    measurementId: "G-7TLZ0SXZBH"
};

// Initialize Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log('✅ Firebase initialized successfully');
    console.log('📊 Database ready to collect waitlist signups!');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// ===================================
// NAVIGATION & HEADER
// ===================================

const header = document.querySelector('.main-header');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a, .nav-cta');

// Sticky header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Only if it's an anchor link
        if (link.getAttribute('href').startsWith('#')) {
            mainNav.classList.remove('active');
            mobileNavToggle.classList.remove('active');
            document.body.style.overflow = '';

            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerHeight = header.offsetHeight;

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

function scrollToForm() {
    const formSection = document.getElementById('early-access');
    const headerHeight = header.offsetHeight;
    const targetPosition = formSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// ===================================
// FAQ ACCORDION
// ===================================

function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================

const waitlistForm = document.getElementById('waitlistForm');
const submitButton = document.getElementById('submitButton');
const buttonText = document.getElementById('buttonText');
const buttonLoader = document.getElementById('buttonLoader');
const formMessage = document.getElementById('formMessage');

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (optional field)
function isValidPhone(phone) {
    if (!phone) return true; // Optional field
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Show message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Reset form
function resetForm() {
    waitlistForm.reset();
    buttonText.style.display = 'inline';
    buttonLoader.style.display = 'none';
    submitButton.disabled = false;
}

// Form submission handler
waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        city: document.getElementById('city').value.trim(),
        intendedUse: document.getElementById('intendedUse').value,
        priceComfort: document.getElementById('priceComfort').value,
        phone: document.getElementById('phone').value.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        submittedAt: new Date().toISOString()
    };

    // Validation
    if (!formData.name || formData.name.length < 2) {
        showMessage('Please enter a valid name', 'error');
        return;
    }

    if (!isValidEmail(formData.email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    if (!formData.city || formData.city.length < 2) {
        showMessage('Please enter a valid city', 'error');
        return;
    }

    if (!formData.intendedUse) {
        showMessage('Please select your intended use', 'error');
        return;
    }

    if (!formData.priceComfort) {
        showMessage('Please select your price comfort range', 'error');
        return;
    }

    if (!isValidPhone(formData.phone)) {
        showMessage('Please enter a valid phone number or leave it blank', 'error');
        return;
    }

    // Show loading state
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-flex';
    submitButton.disabled = true;
    formMessage.style.display = 'none';

    try {
        // Check if Firebase is initialized
        if (!db) {
            throw new Error('Firebase not initialized. Please configure Firebase first.');
        }

        // Add to Firestore
        await db.collection('waitlist').add(formData);

        // Success
        showMessage('🎉 Success! You\'re on the waitlist. We\'ll be in touch soon!', 'success');
        resetForm();

        // Track conversion (optional - add your analytics here)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': formData.intendedUse
            });
        }

    } catch (error) {
        console.error('Error submitting form:', error);

        let errorMessage = 'Something went wrong. Please try again.';

        if (error.code === 'permission-denied') {
            errorMessage = 'Database access denied. Please contact support.';
        } else if (error.message.includes('Firebase not initialized')) {
            errorMessage = 'System not configured. Please contact support at hello@heatbox.in';
        }

        showMessage(errorMessage, 'error');

        buttonText.style.display = 'inline';
        buttonLoader.style.display = 'none';
        submitButton.disabled = false;
    }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(`
        .problem-card,
        .step-card,
        .safety-card,
        .audience-card,
        .pricing-card,
        .faq-item
    `);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===================================
// LOGO INTEGRATION
// ===================================

// Load the uploaded logo
document.addEventListener('DOMContentLoaded', () => {
    const logoElements = document.querySelectorAll('.logo, .footer-logo');
    logoElements.forEach(logo => {
        logo.onerror = function () {
            console.warn('Logo not found, using placeholder');
            // Fallback to a gradient circle if logo fails to load
            this.style.display = 'none';
        };
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images when they come into viewport
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// ANALYTICS (Optional)
// ===================================

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercent > maxScroll) {
        maxScroll = Math.floor(scrollPercent / 25) * 25; // Track in 25% increments

        if (typeof gtag !== 'undefined' && maxScroll > 0) {
            gtag('event', 'scroll_depth', {
                'event_category': 'engagement',
                'event_label': `${maxScroll}%`
            });
        }
    }
});

// Track CTA clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'event_category': 'engagement',
                'event_label': button.textContent.trim()
            });
        }
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🔥 HeatBox - Hot food anywhere. In 60 seconds.', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%cInterested in joining our team? Email us at hello@heatbox.in', 'font-size: 12px; color: #B3B3B3;');
