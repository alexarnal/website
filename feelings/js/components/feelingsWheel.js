// Feelings wheel modal component
const FeelingsWheel = {
    modal: null,
    emotionInput: null,

    // Initialize the feelings wheel
    init() {
        this.modal = document.getElementById('feelingsModal');
        this.emotionInput = document.getElementById('emotion');
        
        // Set up event listeners
        this.setupEventListeners();
    },

    // Set up event listeners
    setupEventListeners() {
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.close();
            }
        });
    },

    // Open the feelings wheel modal
    open() {
        this.render();
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    },

    // Close the feelings wheel modal
    close() {
        this.modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    },

    // Render the emotions in the modal
    render() {
        const container = document.getElementById('emotionsContainer');
        const recentEmotions = StorageManager.getRecentEmotions();
        const recentSet = new Set(recentEmotions.map(e => e.toLowerCase()));
        
        let html = '';
        
        // Recent emotions section
        if (recentEmotions.length > 0) {
            html += '<div class="section-title">Recently Used</div>';
            html += '<div class="emotions-grid">';
            recentEmotions.forEach(emotion => {
                const emotionData = window.EmotionsData.find(e => 
                    e.word.toLowerCase() === emotion.toLowerCase()
                );
                const color = emotionData ? emotionData.color : '#f8f9fa';
                html += this.createEmotionCard(emotion, color, true);
            });
            html += '</div>';
        }
        
        // All emotions section
        html += '<div class="section-title">All Emotions</div>';
        html += '<div class="emotions-grid">';
        
        window.EmotionsData.forEach(emotionData => {
            const isRecent = recentSet.has(emotionData.word.toLowerCase());
            html += this.createEmotionCard(emotionData.word, emotionData.color, isRecent);
        });
        
        html += '</div>';
        container.innerHTML = html;
    },

    // Create an emotion card HTML
    createEmotionCard(emotion, color, isRecent = false) {
        const recentClass = isRecent ? ' recent' : '';
        return `<div class="emotion-card${recentClass}" 
                     style="border-left: 4px solid ${color}" 
                     onclick="feelingsWheel.selectEmotion('${emotion}')">
                    ${emotion}
                </div>`;
    },

    // Select an emotion from the wheel
    selectEmotion(emotion) {
        if (this.emotionInput) {
            this.emotionInput.value = emotion;
            this.emotionInput.focus();
        }
        this.close();
    }
};

// Export feelings wheel
window.feelingsWheel = FeelingsWheel;