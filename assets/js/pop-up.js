// Function to show popup
function showEventPopup() {
    const popup = document.getElementById('eventPopup');
    const overlay = document.getElementById('popupOverlay');
    
    if (popup && overlay) {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        setTimeout(() => {
            popup.classList.add('show');
            overlay.classList.add('show');
        }, 10);
    }
}

// Function to close popup
function closeEventPopup() {
    const popup = document.getElementById('eventPopup');
    const overlay = document.getElementById('popupOverlay');
    
    if (popup && overlay) {
        popup.classList.remove('show');
        overlay.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);
    }
}

// Show popup when page loads (with a slight delay)
window.addEventListener('load', () => {
    setTimeout(showEventPopup, 1500);
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    const popup = document.getElementById('eventPopup');
    const overlay = document.getElementById('popupOverlay');
    
    if (e.target === overlay) {
        closeEventPopup();
    }
}); 