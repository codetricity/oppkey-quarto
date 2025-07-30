// Custom JavaScript for Oppgreet website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your CTA logic here
            console.log('CTA button clicked:', this.textContent);
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Modal functionality for "Become a Client" form
    const modal = document.getElementById('clientModal');
    const openBtn = document.getElementById('becomeClientBtn');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('clientForm');

    if (modal && openBtn && closeBtn && form) {
        // Open modal
        openBtn.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }

        closeBtn.addEventListener('click', closeModal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Form submitted with data:', data);
            
            // Show success message (you can customize this)
            alert('Thank you for your interest! A representative will contact you soon.');
            
            // Close modal
            closeModal();
            
            // Reset form
            form.reset();
        });

        // Add focus management for accessibility
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        // Trap focus within modal when open
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        });

        // Focus first element when modal opens
        openBtn.addEventListener('click', function() {
            setTimeout(() => {
                firstFocusableElement.focus();
            }, 100);
        });
    }
});

// Add CSS for scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }
    
    body.loaded .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
