// Storage utilities for mood tracker
const StorageManager = {
    // Keys for localStorage
    KEYS: {
        MOOD_ENTRIES: 'moodEntries',
        RECENT_EMOTIONS: 'recentEmotions'
    },

    // Get mood entries from storage
    getMoodEntries() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.MOOD_ENTRIES)) || [];
        } catch (error) {
            console.error('Error loading mood entries:', error);
            return [];
        }
    },

    // Save mood entries to storage
    saveMoodEntries(entries) {
        try {
            localStorage.setItem(this.KEYS.MOOD_ENTRIES, JSON.stringify(entries));
            return true;
        } catch (error) {
            console.error('Error saving mood entries:', error);
            return false;
        }
    },

    // Get recent emotions from storage
    getRecentEmotions() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.RECENT_EMOTIONS)) || [];
        } catch (error) {
            console.error('Error loading recent emotions:', error);
            return [];
        }
    },

    // Save recent emotions to storage
    saveRecentEmotions(emotions) {
        try {
            localStorage.setItem(this.KEYS.RECENT_EMOTIONS, JSON.stringify(emotions));
            return true;
        } catch (error) {
            console.error('Error saving recent emotions:', error);
            return false;
        }
    },

    // Add a new mood entry
    addMoodEntry(entry) {
        const entries = this.getMoodEntries();
        entries.unshift(entry); // Add to beginning
        return this.saveMoodEntries(entries);
    },

    // Update recent emotions list
    updateRecentEmotions(emotion) {
        let recentEmotions = this.getRecentEmotions();
        
        // Remove if already exists to avoid duplicates
        recentEmotions = recentEmotions.filter(e => e.toLowerCase() !== emotion.toLowerCase());
        
        // Add to beginning
        recentEmotions.unshift(emotion);
        
        // Keep only last 10
        recentEmotions = recentEmotions.slice(0, 10);
        
        return this.saveRecentEmotions(recentEmotions);
    },

    // Clear all data
    clearAllData() {
        try {
            localStorage.removeItem(this.KEYS.MOOD_ENTRIES);
            localStorage.removeItem(this.KEYS.RECENT_EMOTIONS);
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    },

    // Check if storage is available
    isStorageAvailable() {
        try {
            const test = 'storage-test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }
};

// Export storage manager
window.StorageManager = StorageManager;