// Data manager for import/export functionality
const DataManager = {
    // Export data as JSON file
    exportData() {
        const entries = StorageManager.getMoodEntries();
        const dataStr = JSON.stringify(entries, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `mood-entries-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    },

    // Share data using Web Share API or clipboard
    async shareData() {
        const entries = StorageManager.getMoodEntries();
        const dataStr = JSON.stringify(entries, null, 2);
        
        // Try Web Share API first (mobile browsers)
        if (navigator.share) {
            try {
                const dataBlob = new Blob([dataStr], {type: 'application/json'});
                const file = new File([dataBlob], `mood-entries-${new Date().toISOString().split('T')[0]}.json`, {
                    type: 'application/json'
                });
                
                await navigator.share({
                    title: 'Mood Tracker Data',
                    text: 'My mood tracking data',
                    files: [file]
                });
                return;
            } catch (error) {
                if (error.name === 'AbortError') {
                    return; // User cancelled
                }
                // Fall back to text sharing
                try {
                    await navigator.share({
                        title: 'Mood Tracker Data',
                        text: dataStr
                    });
                    return;
                } catch (textError) {
                    // Fall through to clipboard
                }
            }
        }
        
        // Fall back to clipboard
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(dataStr);
                this.showMessage('Data copied to clipboard!');
                return;
            } catch (clipboardError) {
                // Fall through to download
            }
        }
        
        // Final fallback: download file
        this.exportData();
    },

    // Import data from JSON file
    async importData(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            // Validate data structure
            if (!Array.isArray(data)) {
                throw new Error('Invalid data format: expected array');
            }
            
            // Validate each entry
            for (const entry of data) {
                if (!this.validateEntry(entry)) {
                    throw new Error('Invalid entry format');
                }
            }
            
            // Merge with existing data
            const existingEntries = StorageManager.getMoodEntries();
            const mergedEntries = this.mergeEntries(existingEntries, data);
            
            // Save merged data
            if (StorageManager.saveMoodEntries(mergedEntries)) {
                this.showMessage(`Successfully imported ${data.length} entries!`);
                // Refresh the view if we're on entries page
                if (document.getElementById('entriesView').style.display !== 'none') {
                    entriesView.render();
                }
            } else {
                throw new Error('Failed to save imported data');
            }
            
        } catch (error) {
            this.showMessage(`Import failed: ${error.message}`, 'error');
        }
    },

    // Validate entry structure
    validateEntry(entry) {
        return entry && 
               typeof entry.id === 'number' &&
               typeof entry.emotion === 'string' &&
               typeof entry.intensity === 'number' &&
               entry.intensity >= 0 && entry.intensity <= 4 &&
               typeof entry.timestamp === 'string';
    },

    // Merge entries avoiding duplicates
    mergeEntries(existing, imported) {
        const existingIds = new Set(existing.map(e => e.id));
        const newEntries = imported.filter(e => !existingIds.has(e.id));
        
        // Combine and sort by timestamp (newest first)
        const merged = [...existing, ...newEntries];
        return merged.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    // Show a message to the user
    showMessage(message, type = 'success') {
        const confirmation = document.getElementById('confirmation');
        const confirmationText = document.getElementById('confirmationText');
        
        if (confirmation && confirmationText) {
            confirmationText.textContent = message;
            confirmation.className = type === 'error' ? 'warning-banner' : 'confirmation';
            confirmation.classList.add('show');
            
            setTimeout(() => {
                confirmation.classList.remove('show');
            }, 5000);
        }
    },

    // Create file input for import
    createImportInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.importData(file);
            }
        });
        return input;
    },

    // Trigger import dialog
    triggerImport() {
        const input = this.createImportInput();
        input.click();
    }
};

// Export data manager
window.dataManager = DataManager;