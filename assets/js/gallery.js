import config from '../../config.js';

class Gallery {
    constructor() {
        // Sample gallery data with direct image URLs
        this.galleryData = {
            hacksprit: {
                images: [
                    {
                        url: '../assets/images/gallery/hacksprit/event1.jpg',
                        name: 'HackSprit 2024 - Opening Ceremony',
                        category: 'hacksprit'
                    },
                    {
                        url: '../assets/images/gallery/hacksprit/event2.jpg',
                        name: 'HackSprit 2024 - Team Collaboration',
                        category: 'hacksprit'
                    },
                    {
                        url: '../assets/images/gallery/hacksprit/event3.jpg',
                        name: 'HackSprit 2024 - Project Presentation',
                        category: 'hacksprit'
                    }
                ]
            },
            project: {
                images: [
                    {
                        url: '../assets/images/gallery/projects/project1.jpg',
                        name: 'Project Exhibition 2024',
                        category: 'project'
                    },
                    {
                        url: '../assets/images/gallery/projects/project2.jpg',
                        name: 'Student Projects Display',
                        category: 'project'
                    },
                    {
                        url: '../assets/images/gallery/projects/project3.jpg',
                        name: 'Project Awards Ceremony',
                        category: 'project'
                    }
                ]
            },
            painting: {
                images: [
                    {
                        url: '../assets/images/gallery/paintings/art1.jpg',
                        name: 'Art Competition 2024',
                        category: 'painting'
                    },
                    {
                        url: '../assets/images/gallery/paintings/art2.jpg',
                        name: 'Student Artworks',
                        category: 'painting'
                    },
                    {
                        url: '../assets/images/gallery/paintings/art3.jpg',
                        name: 'Painting Exhibition',
                        category: 'painting'
                    }
                ]
            }
        };
        
        this.galleryContainer = document.getElementById('gallery-container');
        this.loadingElement = document.getElementById('loading');
        this.errorElement = document.getElementById('error');
        
        // Initialize filter buttons
        this.initializeFilters();
        this.init();
    }
    
    async init() {
        try {
            this.showLoading();
            this.loadImages();
            this.hideLoading();
        } catch (error) {
            console.error('Gallery initialization failed:', error);
            this.showError('Failed to load gallery images. Please try again later.');
        }
    }
    
    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-buttons button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter gallery
                this.filterGallery(button.dataset.filter);
            });
        });
    }
    
    filterGallery(category) {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    loadImages() {
        const allImages = [];
        
        // Process each category
        Object.entries(this.galleryData).forEach(([category, data]) => {
            data.images.forEach(image => {
                allImages.push({
                    ...image,
                    thumbnailUrl: image.url,
                    fullUrl: image.url
                });
            });
        });
        
        if (allImages.length === 0) {
            throw new Error('No images found');
        }
        
        this.renderGallery(allImages);
    }
    
    renderGallery(images) {
        this.galleryContainer.innerHTML = images.map(image => `
            <div class="gallery-item" data-aos="fade-up" data-category="${image.category}">
                <div class="gallery-image-container">
                    <img src="${image.thumbnailUrl}" 
                         alt="${image.name}"
                         loading="lazy"
                         onerror="this.src='../assets/images/cesa-logo.png'"
                         onclick="openLightbox('${image.fullUrl}', '${image.name}')" />
                    <div class="gallery-caption">
                        <h5>${image.name}</h5>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Refresh AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    showLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'block';
        }
        if (this.errorElement) {
            this.errorElement.style.display = 'none';
        }
        if (this.galleryContainer) {
            this.galleryContainer.style.opacity = '0.5';
        }
    }
    
    hideLoading() {
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
        if (this.galleryContainer) {
            this.galleryContainer.style.opacity = '1';
        }
    }
    
    showError(message) {
        this.hideLoading();
        if (this.errorElement) {
            this.errorElement.style.display = 'block';
            this.errorElement.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    ${message}
                </div>
            `;
        }
    }
}

// Lightbox function (kept global for onclick handler)
function openLightbox(imageUrl, title) {
    const modal = document.createElement('div');
    modal.className = 'lightbox';
    modal.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${imageUrl}" alt="${title}" />
            <div class="lightbox-caption">${title}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.onclick = (e) => {
        if (e.target.className === 'lightbox' || e.target.className === 'close-lightbox') {
            document.body.removeChild(modal);
        }
    };
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
}); 