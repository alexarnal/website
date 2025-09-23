// Coping mechanisms wheel modal component
const CopingWheel = {
    modal: null,
    nextStepInput: null,

    // Initialize the coping wheel
    init() {
        this.modal = document.getElementById('copingModal');
        this.nextStepInput = document.getElementById('nextStep');
        
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

    // Open the coping wheel modal
    open() {
        this.render();
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    },

    // Close the coping wheel modal
    close() {
        this.modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    },

    // Render the coping mechanisms in the modal
    render() {
        const container = document.getElementById('copingContainer');
        
        let html = '';
        
        // Create sections for each category
        window.CopingMechanismsData.forEach(category => {
            html += `
                <div class="coping-category">
                    <div class="category-header" style="border-left: 4px solid ${category.color}">
                        <span class="category-icon">${category.icon}</span>
                        <span class="category-title">${category.category}</span>
                    </div>
                    <div class="strategies-grid">
            `;
            
            category.strategies.forEach(strategy => {
                html += this.createStrategyCard(strategy, category.color);
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    },

    // Create a strategy card HTML
    createStrategyCard(strategy, color) {
        // Check if this is the breathing exercise link
        const isBreathingExercise = strategy.includes('latente.io/breathe');
        const displayText = isBreathingExercise ? 'Breathing exercises (guided)' : strategy;
        
        return `<div class="strategy-card" 
                     style="border-left: 3px solid ${color}" 
                     onclick="copingWheel.selectStrategy('${strategy.replace(/'/g, "\\'")}')">
                    ${displayText}
                    ${isBreathingExercise ? '<span class="external-link">🔗</span>' : ''}
                </div>`;
    },

    // Select a coping strategy
    selectStrategy(strategy) {
        if (this.nextStepInput) {
            // Check if this is the breathing exercise
            if (strategy.includes('latente.io/breathe')) {
                // Open breathing exercise in new tab/window
                window.open('https://latente.io/breathe', '_blank');
                strategy = 'Breathing exercises (guided)';
            }
            
            // Append to existing text or set as new text
            const currentText = this.nextStepInput.value.trim();
            if (currentText) {
                this.nextStepInput.value = currentText + '\n• ' + strategy;
            } else {
                this.nextStepInput.value = '• ' + strategy;
            }
            
            this.nextStepInput.focus();
        }
        this.close();
    }
};

// Export coping wheel
window.copingWheel = CopingWheel;