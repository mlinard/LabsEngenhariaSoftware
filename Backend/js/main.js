import AppController from './controllers/AppController.js';

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create the main app controller
    const app = new AppController();
    
    // Load saved page state from localStorage
    app.loadSavedPageState();
    
    // Setup event listeners for global navigation events
    document.addEventListener('userLoggedIn', () => {
        app.showFeed();
    });
    
    document.addEventListener('userRegistered', () => {
        app.showFeed();
    });
    
    document.addEventListener('userLoggedOut', () => {
        app.showHome();
    });
    
    document.addEventListener('editReview', (e) => {
        const { gameId, reviewId } = e.detail;
        app.reviewController.showReviewModal(gameId, reviewId);
    });
    
    // Make app globally accessible for debugging
    window.gameRateApp = app;
}); 