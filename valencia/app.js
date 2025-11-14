import { foodDatabase, foodCategories } from './foodDatabase.js';

// Meal requirements
const mealRequirements = {
    breakfast: {
        goals: {
            protein: 25,
            lowGlycemicFruit: 2,
            highGlycemicFruit: 1,
            carbs: 0,
            vegetables: 0
        }
    },
    lunch: {
        goals: {
            protein: 30,
            lowGlycemicFruit: 0,
            highGlycemicFruit: 0,
            carbs: 1,
            vegetables: 2
        }
    },
    dinner: {
        goals: {
            protein: 15,
            lowGlycemicFruit: 0,
            highGlycemicFruit: 0,
            carbs: 0,
            vegetables: 3
        }
    }
};

let currentMeal = 'breakfast';
let selectedItems = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupMealTabs();
    updateUI();
});

function setupMealTabs() {
    document.querySelectorAll('.meal-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            currentMeal = e.target.dataset.meal;
            selectedItems = [];
            
            // Update active state
            document.querySelectorAll('.meal-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            updateUI();
        });
    });
}

function updateUI() {
    updateProgress();
    updateFoodGrid();
}

function updateProgress() {
    const totals = calculateTotals();
    const goals = mealRequirements[currentMeal].goals;
    
    const metrics = [
        { key: 'protein', label: 'Protein', unit: 'g' },
        { key: 'lowGlycemicFruit', label: 'Low Glycemic Fruit', unit: ' srv' },
        { key: 'highGlycemicFruit', label: 'High Glycemic Fruit', unit: ' srv' },
        { key: 'carbs', label: 'Carbs', unit: ' srv' },
        { key: 'vegetables', label: 'Vegetables', unit: ' srv' }
    ];
    
    let html = '';
    metrics.forEach(metric => {
        const goal = goals[metric.key];
        if (goal > 0) {
            const current = totals[metric.key];
            const percentage = Math.min((current / goal) * 100, 100);
            
            let fillClass = '';
            if (current >= goal) fillClass = 'complete';
            if (current > goal) fillClass = 'over';
            
            html += `
                <div class="progress-item">
                    <div class="progress-label">${metric.label}</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill ${fillClass}" style="width: ${percentage}%">
                            ${current >= goal ? '✓' : ''}
                        </div>
                    </div>
                    <div class="progress-value">${current}${metric.unit} / ${goal}${metric.unit}</div>
                </div>
            `;
        }
    });
    
    document.getElementById('progressGrid').innerHTML = html;
}

function updateFoodGrid() {
    const categories = foodCategories[currentMeal];
    let html = '';
    
    for (let [category, items] of Object.entries(categories)) {
        html += `<div class="category-header">${category}</div>`;
        
        items.forEach(itemId => {
            const food = foodDatabase[itemId];
            const isSelected = selectedItems.includes(itemId) ? 'selected' : '';
            
            html += `
                <div class="food-tile ${isSelected}" data-food-id="${itemId}">
                    <div class="food-emoji">${food.emoji}</div>
                    <div class="food-name">${food.name}</div>
                </div>
            `;
        });
    }
    
    document.getElementById('foodGrid').innerHTML = html;
    
    // Add click handlers
    document.querySelectorAll('.food-tile').forEach(tile => {
        tile.addEventListener('click', () => {
            toggleFood(tile.dataset.foodId);
        });
    });
}

function toggleFood(itemId) {
    const index = selectedItems.indexOf(itemId);
    if (index > -1) {
        selectedItems.splice(index, 1);
    } else {
        selectedItems.push(itemId);
    }
    updateUI();
}

function calculateTotals() {
    const totals = {
        protein: 0,
        lowGlycemicFruit: 0,
        highGlycemicFruit: 0,
        carbs: 0,
        vegetables: 0
    };
    
    selectedItems.forEach(itemId => {
        const food = foodDatabase[itemId];
        totals.protein += food.protein;
        totals.lowGlycemicFruit += food.lowGlycemicFruit;
        totals.highGlycemicFruit += food.highGlycemicFruit;
        totals.carbs += food.carbs;
        totals.vegetables += food.vegetables;
    });
    
    return totals;
}

// Modal functions
window.openModal = function() {
    document.getElementById('infoModal').style.display = 'block';
}

window.closeModal = function() {
    document.getElementById('infoModal').style.display = 'none';
}

// Reset function
window.resetMeal = function() {
    selectedItems = [];
    updateUI();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('infoModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
