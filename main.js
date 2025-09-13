 document.addEventListener('DOMContentLoaded', function() {
            const slideshowImages = [
                'mainlandscape.jpg',
                '2ndlandscape.jpg',
                '3rdlandscape.jpg',
                '4thlandscape.jpg',
            ];
            let currentSlide = 0;
            const slideshowContainer = document.getElementById('slideshow-container');

            function showSlide(nextSlide) {
                // If there's an existing image, animate it out
                const oldImg = slideshowContainer.querySelector('img');
                if (oldImg) {
                    oldImg.style.transition = 'transform 0.7s ease, opacity 0.7s ease';
                    oldImg.style.transform = 'translateX(-100%)';
                    oldImg.style.opacity = '0';
                    setTimeout(() => {
                        if (oldImg.parentNode) oldImg.parentNode.removeChild(oldImg);
                    }, 700);
                }

                // Only show image if index is valid
                if (slideshowImages[nextSlide]) {
                    const img = document.createElement('img');
                    img.src = slideshowImages[nextSlide];
                    img.className = 'absolute inset-0 w-full h-full object-cover';
                    img.style.transform = 'translateX(100%)';
                    img.style.opacity = '0';
                    img.style.transition = 'transform 0.7s ease, opacity 0.7s ease';

                    slideshowContainer.appendChild(img);

                    // Animate new image in
                    setTimeout(() => {
                        img.style.transform = 'translateX(0)';
                        img.style.opacity = '1';
                    }, 20);

                    currentSlide = nextSlide;
                }
            }

            function nextSlide() {
                const next = (currentSlide + 1) % slideshowImages.length;
                showSlide(next);
            }

            // Start the slideshow
            showSlide(0);
            setInterval(nextSlide, 3000); // Change image every 3 seconds

            // --- Navbar Logic ---
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });

            // Close the mobile menu when a link is clicked for smooth scrolling
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        });

// Navbar fade-in animation
const navbar = document.getElementById('navbar');
if (navbar) {
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-20px)';
    navbar.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
}
