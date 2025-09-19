// Entries view component
const EntriesView = {
    intensityLabels: ['Not at all', 'A little', 'Moderately', 'Quite a bit', 'Extremely'],

    // Render all entries
    render() {
        const entriesList = document.getElementById('entriesList');
        const entries = StorageManager.getMoodEntries();
        
        if (entries.length === 0) {
            entriesList.innerHTML = this.renderEmptyState();
            return;
        }

        let html = '';
        entries.forEach(entry => {
            html += this.renderEntryCard(entry);
        });
        
        entriesList.innerHTML = html;
    },

    // Render empty state
    renderEmptyState() {
        return `
            <div class="empty-state">
                <h3>No entries yet</h3>
                <p>Start tracking your mood to see patterns over time!</p>
            </div>
        `;
    },

    // Render a single entry card
    renderEntryCard(entry) {
        const date = new Date(entry.timestamp);
        const timeString = date.toLocaleDateString() + ' at ' + 
                          date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        return `
            <div class="entry-card" onclick="entriesView.toggleEntry(${entry.id})">
                <div class="entry-header">
                    <div>
                        <span class="entry-emotion">${entry.emotion}</span>
                        <span class="entry-intensity">${this.intensityLabels[entry.intensity]}</span>
                    </div>
                    <div class="entry-time">${timeString}</div>
                </div>
                <div id="details-${entry.id}" class="entry-details">
                    ${this.renderEntryDetails(entry)}
                </div>
            </div>
        `;
    },

    // Render entry details
    renderEntryDetails(entry) {
        let html = '';
        
        if (entry.context) {
            html += `
                <div class="detail-section">
                    <div class="detail-label">Context:</div>
                    <div class="detail-text">${entry.context}</div>
                </div>
            `;
        }
        
        if (entry.nextStep) {
            html += `
                <div class="detail-section">
                    <div class="detail-label">Next steps:</div>
                    <div class="detail-text">${entry.nextStep}</div>
                </div>
            `;
        }
        
        return html;
    },

    // Toggle entry details visibility
    toggleEntry(entryId) {
        const details = document.getElementById(`details-${entryId}`);
        if (details) {
            details.classList.toggle('expanded');
        }
    },

    // Show entries view
    show() {
        document.getElementById('trackingForm').style.display = 'none';
        document.getElementById('entriesView').style.display = 'block';
        this.render();
    },

    // Hide entries view
    hide() {
        document.getElementById('trackingForm').style.display = 'block';
        document.getElementById('entriesView').style.display = 'none';
    }
};

// Export entries view
window.entriesView = EntriesView;