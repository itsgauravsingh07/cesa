// Gallery configuration
const config = {
    // Google Apps Script Web App URL
    apiUrl: 'https://script.google.com/macros/s/AKfycbxAM9_-rYs63d-SxdY4DgpLHOW4M3-2qlt2CsfI-mAwskrhhbZh7n8cqMOf8xtd753a/exec',
    // Cache duration in minutes
    cacheDuration: 60
};

class Gallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.initializeElements();
        this.addEventListeners();
        this.loadImages();
    }

    initializeElements() {
        this.galleryGrid = document.getElementById('galleryGrid');
        this.modal = document.getElementById('galleryModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalClose = document.getElementById('modalClose');
        this.modalPrev = document.getElementById('modalPrev');
        this.modalNext = document.getElementById('modalNext');
        
        // Show loading state
        this.showLoading();
    }

    showLoading() {
        this.galleryGrid.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading gallery...</span>
                </div>
                <p class="text-white mt-3">Loading gallery images...</p>
            </div>
        `;
    }

    addEventListeners() {
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modalPrev.addEventListener('click', () => this.navigateImage(-1));
        this.modalNext.addEventListener('click', () => this.navigateImage(1));
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    async loadImages() {
        try {
            // Try to get from cache first
            const cachedData = this.getFromCache();
            if (cachedData) {
                this.images = cachedData;
                this.renderGallery();
                return;
            }

            const response = await fetch(config.apiUrl);
            const result = await response.json();

            if (result.status === 'success') {
                this.images = result.data.map((img, index) => ({
                    id: index,
                    thumbnail: img.url,
                    full: img.url.replace('sz=w1000', 'sz=w2000'), // Larger size for full view
                    caption: img.name
                }));

                // Save to cache
                this.saveToCache(this.images);
                this.renderGallery();
            } else {
                throw new Error(result.message || 'Failed to load images');
            }
        } catch (error) {
            console.error('Error loading images:', error);
            this.showError("Failed to load gallery images. Please try again later.");
        }
    }

    renderGallery() {
        if (this.images.length === 0) {
            this.showError("No images found in the gallery.");
            return;
        }

        this.galleryGrid.innerHTML = this.images.map((img, index) => `
            <div class="gallery-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                <img src="${img.thumbnail}" 
                     alt="${img.caption}" 
                     loading="lazy" 
                     class="gallery-image"
                     onerror="this.onerror=null; this.src='../assets/images/placeholder.jpg';"
                     onclick="gallery.openModal(${index})">
                <div class="gallery-overlay">
                    <div class="gallery-caption">${img.caption}</div>
                </div>
            </div>
        `).join('');

        // Initialize AOS after rendering
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    openModal(index) {
        this.currentIndex = index;
        this.updateModalImage();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    updateModalImage() {
        const img = this.images[this.currentIndex];
        this.modalImage.src = img.full;
        this.modalImage.alt = img.caption;
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    navigateImage(direction) {
        this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
        this.updateModalImage();
    }

    handleKeyPress(e) {
        if (!this.modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                this.closeModal();
                break;
            case 'ArrowLeft':
                this.navigateImage(-1);
                break;
            case 'ArrowRight':
                this.navigateImage(1);
                break;
        }
    }

    getFromCache() {
        const cached = localStorage.getItem('galleryCache');
        if (!cached) return null;

        const { timestamp, data } = JSON.parse(cached);
        const now = new Date().getTime();
        
        // Check if cache is still valid
        if (now - timestamp < config.cacheDuration * 60 * 1000) {
            return data;
        }
        
        localStorage.removeItem('galleryCache');
        return null;
    }

    saveToCache(data) {
        const cache = {
            timestamp: new Date().getTime(),
            data
        };
        localStorage.setItem('galleryCache', JSON.stringify(cache));
    }

    showError(message) {
        this.galleryGrid.innerHTML = `
            <div class="text-center py-5">
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    ${message}
                </div>
            </div>
        `;
    }
}

// Initialize gallery
const gallery = new Gallery(); 