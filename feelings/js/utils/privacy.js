// Privacy and incognito mode detection
const PrivacyDetector = {
    // Check for incognito/private browsing mode
    checkIncognitoMode() {
        // Test localStorage
        try {
            localStorage.setItem('incognito-test', 'test');
            localStorage.removeItem('incognito-test');
        } catch (e) {
            this.showIncognitoWarning();
            return true;
        }
        
        // Test sessionStorage (for Safari)
        try {
            const storage = window.sessionStorage;
            storage.setItem('safari-test', '1');
            storage.removeItem('safari-test');
        } catch (e) {
            this.showIncognitoWarning();
            return true;
        }
        
        return false;
    },

    // Show the incognito warning banner
    showIncognitoWarning() {
        const warningElement = document.getElementById('incognitoWarning');
        if (warningElement) {
            warningElement.classList.add('show');
        }
    },

    // Hide the incognito warning banner
    hideIncognitoWarning() {
        const warningElement = document.getElementById('incognitoWarning');
        if (warningElement) {
            warningElement.classList.remove('show');
        }
    },

    // Initialize privacy checks
    init() {
        this.checkIncognitoMode();
    }
};

// Export privacy detector
window.PrivacyDetector = PrivacyDetector;