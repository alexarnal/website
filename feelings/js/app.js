// Main application controller
const MoodTrackerApp = {
    // Initialize the application
    init() {
        // Initialize all components
        PrivacyDetector.init();
        FeelingsWheel.init();
        CopingWheel.init();
        
        // Set up form handling
        this.setupFormHandling();
        
        // Focus on emotion input
        const emotionInput = document.getElementById('emotion');
        if (emotionInput) {
            emotionInput.focus();
        }
    },

    // Set up form event handling
    setupFormHandling() {
        const moodForm = document.getElementById('moodForm');
        if (moodForm) {
            moodForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    },

    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = this.getFormData();
        if (!formData) {
            return; // Validation failed
        }

        // Create entry object
        const entry = {
            id: Date.now(),
            emotion: formData.emotion,
            intensity: parseInt(formData.intensity),
            context: formData.context,
            nextStep: formData.nextStep,
            timestamp: new Date().toISOString()
        };

        // Save entry
        if (StorageManager.addMoodEntry(entry)) {
            // Update recent emotions
            StorageManager.updateRecentEmotions(formData.emotion);
            
            // Show confirmation
            this.showConfirmation();
            
            // Reset form
            this.resetForm();
        } else {
            this.showError('Failed to save entry. Please try again.');
        }
    },

    // Get and validate form data
    getFormData() {
        const emotion = document.getElementById('emotion').value.trim();
        const intensityElement = document.querySelector('input[name="intensity"]:checked');
        const context = document.getElementById('context').value.trim();
        const nextStep = document.getElementById('nextStep').value.trim();

        // Validation
        if (!emotion) {
            this.showError('Please enter an emotion.');
            return null;
        }

        if (!intensityElement) {
            this.showError('Please select an intensity level.');
            return null;
        }

        return {
            emotion,
            intensity: intensityElement.value,
            context,
            nextStep
        };
    },

    // Show confirmation message
    showConfirmation() {
        const confirmation = document.getElementById('confirmation');
        const confirmationText = document.getElementById('confirmationText');
        
        if (confirmation && confirmationText) {
            confirmationText.textContent = 'Entry saved successfully!';
            confirmation.classList.add('show');
            
            setTimeout(() => {
                confirmation.classList.remove('show');
            }, 5000);
        }
    },

    // Show error message
    showError(message) {
        const confirmation = document.getElementById('confirmation');
        const confirmationText = document.getElementById('confirmationText');
        
        if (confirmation && confirmationText) {
            confirmationText.textContent = message;
            confirmation.className = 'warning-banner show';
            
            setTimeout(() => {
                confirmation.classList.remove('show');
                confirmation.className = 'confirmation';
            }, 5000);
        }
    },

    // Reset the form
    resetForm() {
        const moodForm = document.getElementById('moodForm');
        if (moodForm) {
            moodForm.reset();
            
            // Focus back on emotion input
            const emotionInput = document.getElementById('emotion');
            if (emotionInput) {
                emotionInput.focus();
            }
        }
    },

    // Show entries view
    showEntries() {
        entriesView.show();
    },

    // Show form view
    showForm() {
        entriesView.hide();
        
        // Focus on emotion input
        const emotionInput = document.getElementById('emotion');
        if (emotionInput) {
            emotionInput.focus();
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    MoodTrackerApp.init();
});

// Export app for global access
window.app = MoodTrackerApp;