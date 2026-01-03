document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    const navLinks = document.querySelectorAll('.nav__link');
    const menuToggle = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header__menu');

    // Burger Menu Toggle
    const toggleMenu = () => {
        menuToggle.classList.toggle('is-active');
        headerMenu.classList.toggle('is-active');
        document.body.style.overflow = headerMenu.classList.contains('is-active') ? 'hidden' : '';
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (headerMenu && headerMenu.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    // Language Toggle logic
    const updateLanguage = (lang) => {
        const translatableElements = document.querySelectorAll('[data-ukr], [data-en]');
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });
        document.documentElement.lang = lang;
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage(lang);
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Automatically slide through images
    const slides = document.querySelectorAll('.slider__item');
    const prevBtn = document.querySelector('.slider-nav--prev');
    const nextBtn = document.querySelector('.slider-nav--next');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };

    const startInterval = () => {
        stopInterval();
        slideInterval = setInterval(nextSlide, 3000);
    };

    const stopInterval = () => {
        if (slideInterval) clearInterval(slideInterval);
    };

    const locationData = {
        sacramento: {
            city: 'Sacramento, CA',
            address: '4319 Elkhorn Blvd B, Sacramento, CA 95842',
            phone: '+1 (916) 332-3537',
            hours: ['Mon - Sat: 9:00 AM - 10:00 PM', 'Sun: 10:00 AM - 10:00 PM'],
            google: 'https://www.google.com/maps/search/?api=1&query=European+Delicatessen+4319+Elkhorn+Blvd+B+Sacramento+CA+95842',
            apple: 'https://maps.apple.com/?address=4319+Elkhorn+Blvd+B,+Sacramento,+CA+95842',
            photos: Array.from({ length: 8 }, (_, i) => `SacramentoCa${i + 1}.jpg`)
        },
        meridian: {
            city: 'Meridian, ID',
            address: '950 E Fairview Ave #140, Meridian, ID 83642',
            phone: '+1 (208) 807-2962',
            hours: ['Mon - Fri: 10:00 AM - 8:00 PM', 'Sat: 10:00 AM - 7:00 PM', 'Sun: 11:00 AM - 6:00 PM'],
            google: 'https://www.google.com/maps/search/?api=1&query=European+Delicatessen+950+E+Fairview+Ave+140+Meridian+ID+83642',
            apple: 'https://maps.apple.com/?address=950+E+Fairview+Ave+%23140,+Meridian,+ID+83642',
            photos: Array.from({ length: 8 }, (_, i) => `MeridianID${i + 1}.jpg`)
        },
        tacoma: {
            city: 'Tacoma, WA',
            address: '3612A Center St, Tacoma, WA 98409',
            phone: null,
            hours: ['Mon - Sat: 10:00 AM - 8:00 PM', 'Sun: 10:00 AM - 6:00 PM'],
            google: 'https://www.google.com/maps/search/?api=1&query=European+Delicatessen+3612A+Center+St+Tacoma+WA+98409',
            apple: 'https://maps.apple.com/?address=3612A+Center+St,+Tacoma,+WA+98409',
            photos: Array.from({ length: 8 }, (_, i) => `TacomaWa${i + 1}.jpg`)
        },
        spokane: {
            city: 'Spokane, WA',
            address: '3329 E Sprague Ave #2, Spokane, WA 99202',
            phone: '+1 (509) 535-4426',
            hours: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sun: 10:00 AM - 7:00 PM'],
            google: 'https://www.google.com/maps/search/?api=1&query=European+Delicatessen+3329+E+Sprague+Ave+2+Spokane+WA+99202',
            apple: 'https://maps.apple.com/?address=3329+E+Sprague+Ave+%232,+Spokane,+WA+99202',
            photos: ['SpokaneWa1.jpg', 'SpokaneWa2.jpg', 'SpkaneWa3.jpg', 'SpokaneWa4.jpg', 'SpokaneWa5.jpg', 'SpokaneWa6.jpg', 'SpokaneWa7.jpg', 'SpokaneWa8.jpg']
        },
        vancouver: {
            city: 'Vancouver, WA',
            address: '2507 NE Andresen Rd Suite C, Vancouver, WA 98661',
            phone: '+1 (360) 693-6258',
            hours: ['Mon - Sun: 9:00 AM - 9:00 PM'],
            google: 'https://www.google.com/maps/search/?api=1&query=European+Delicatessen+2507+NE+Andresen+Rd+Suite+C+Vancouver+WA+98661',
            apple: 'https://maps.apple.com/?address=2507+NE+Andresen+Rd+Suite+C,+Vancouver,+WA+98661',
            photos: Array.from({ length: 8 }, (_, i) => `VancouverWa${i + 1}.jpg`)
        }
    };

    const detailsContainer = document.getElementById('location-details');
    const closeDetailsBtn = document.querySelector('.details-close');
    const moreInfoBtns = document.querySelectorAll('.btn--more-info');

    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentGallery = [];
    let currentImageIndex = 0;

    const openLightbox = (index) => {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    const updateLightboxImage = () => {
        if (currentGallery.length === 0) return;
        const src = `Slider/more/${currentGallery[currentImageIndex]}`;
        lightboxImg.src = src;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    };

    const nextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
        updateLightboxImage();
    };

    const prevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
    };

    // Lightbox Event Listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
        });
    }

    // Close lightbox on clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard support for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    const updateDetails = (locKey) => {
        const data = locationData[locKey];
        if (!data) return;

        document.getElementById('details-city').innerText = data.city;
        document.getElementById('details-address').innerText = data.address;

        const phoneBlock = document.getElementById('phone-block');
        const phoneText = document.getElementById('details-phone');

        if (data.phone) {
            phoneBlock.style.display = 'block';
            phoneText.innerText = data.phone;
        } else {
            phoneBlock.style.display = 'none';
        }

        const hoursList = document.getElementById('details-hours');
        hoursList.innerHTML = data.hours.map(h => `<li>${h}</li>`).join('');

        document.getElementById('google-maps').href = data.google;
        document.getElementById('apple-maps').href = data.apple;

        const encodedAddr = encodeURIComponent(data.address);
        document.getElementById('details-iframe').src = `https://maps.google.com/maps?q=${encodedAddr}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

        // Update Gallery
        const galleryGrid = document.getElementById('location-gallery');
        if (galleryGrid) {
            galleryGrid.innerHTML = '';
            currentGallery = data.photos || [];

            currentGallery.forEach((photo, index) => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                const img = document.createElement('img');
                img.src = `Slider/more/${photo}`;
                img.alt = `${data.city} photo ${index + 1}`;
                img.loading = 'lazy';

                item.appendChild(img);
                item.addEventListener('click', () => openLightbox(index));
                galleryGrid.appendChild(item);
            });
        }

        detailsContainer.style.display = 'block';

        const slider = document.querySelector('.location-slider');
        const header = document.querySelector('.header');
        if (slider) {
            const headerHeight = header ? header.offsetHeight : 0;
            const y = slider.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }

        stopInterval();
    };

    moreInfoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const locKey = btn.getAttribute('data-location');
            updateDetails(locKey);
        });
    });

    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            detailsContainer.style.display = 'none';
            startInterval();
        });
    }

    if (slides.length > 0) {
        startInterval();

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                if (detailsContainer.style.display !== 'block') startInterval();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                if (detailsContainer.style.display !== 'block') startInterval();
            });
        }
    }
});
