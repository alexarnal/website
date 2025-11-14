import { foodDatabase, foodCategories } from './foodDatabase.js';

// Meal requirements
const mealRequirements = {
    breakfast: {
        title: 'Breakfast Requirements',
        timing: 'First meal, any time after waking up',
        requirements: [
            '2 servings of low glycemic fruit',
            '1 serving of high glycemic fruit',
            '25g non-meat protein'
        ],
        goals: {
            protein: 25,
            lowGlycemicFruit: 2,
            highGlycemicFruit: 1,
            carbs: 0,
            vegetables: 0
        }
    },
    lunch: {
        title: 'Lunch Requirements',
        timing: 'Heaviest meal, 8 hours before bedtime',
        requirements: [
            '1 serving processed carbohydrate',
            '30g animal protein',
            '2 servings of vegetables'
        ],
        goals: {
            protein: 30,
            lowGlycemicFruit: 0,
            highGlycemicFruit: 0,
            carbs: 1,
            vegetables: 2
        }
    },
    dinner: {
        title: 'Dinner Requirements',
        timing: 'Healthiest meal, 3-4 hours before bedtime',
        requirements: [
            '3 servings of vegetables',
            '15g of any protein (NO RED MEAT!)'
        ],
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

function selectMeal(meal) {
    currentMeal = meal;
    selectedItems = [];
    
    // Update button states
    document.querySelectorAll('.meal-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    updateUI();
}

function updateUI() {
    updateRequirements();
    updateFoodSelection();
    updateProgress();
    updateSelectedList();
}

function updateRequirements() {
    const req = mealRequirements[currentMeal];
    const html = `
        <h3>${req.title}</h3>
        <p style="margin-bottom: 10px;"><strong>Timing:</strong> ${req.timing}</p>
        <ul>
            ${req.requirements.map(r => `<li>${r}</li>`).join('')}
        </ul>
    `;
    document.getElementById('requirements').innerHTML = html;
}

function updateFoodSelection() {
    const categories = foodCategories[currentMeal];

    let html = '';
    for (let [category, items] of Object.entries(categories)) {
        html += `
            <div class="food-category">
                <h3>${category}</h3>
                ${items.map(item => {
                    const food = foodDatabase[item];
                    const isChecked = selectedItems.includes(item) ? 'checked' : '';
                    return `
                        <div class="food-item">
                            <input type="checkbox" id="${item}" ${isChecked} onchange="toggleFood('${item}')">
                            <label for="${item}">${food.name}</label>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    document.getElementById('foodSelection').innerHTML = html;
}

function toggleFood(itemId) {
    const index = selectedItems.indexOf(itemId);
    if (index > -1) {
        selectedItems.splice(index, 1);
    } else {
        selectedItems.push(itemId);
    }
    updateProgress();
    updateSelectedList();
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

function updateProgress() {
    const totals = calculateTotals();
    const goals = mealRequirements[currentMeal].goals;

    let html = '';
    const metrics = [
        { key: 'protein', label: 'Protein', unit: 'g' },
        { key: 'lowGlycemicFruit', label: 'Low Glycemic Fruit', unit: ' servings' },
        { key: 'highGlycemicFruit', label: 'High Glycemic Fruit', unit: ' servings' },
        { key: 'carbs', label: 'Processed Carbs', unit: ' servings' },
        { key: 'vegetables', label: 'Vegetables', unit: ' servings' }
    ];

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
                    <div class="progress-label">
                        <span>${metric.label}</span>
                        <span>${current}${metric.unit} / ${goal}${metric.unit}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${fillClass}" style="width: ${percentage}%">
                            ${current >= goal ? '✓' : ''}
                        </div>
                    </div>
                </div>
            `;
        }
    });

    document.getElementById('progressBars').innerHTML = html;
}

function updateSelectedList() {
    if (selectedItems.length === 0) {
        document.getElementById('selectedList').innerHTML = '<p style="color: #666;">No items selected yet</p>';
        return;
    }

    const html = selectedItems.map(itemId => {
        const food = foodDatabase[itemId];
        return `
            <div class="selected-tag">
                ${food.name}
                <button class="remove-btn" onclick="toggleFood('${itemId}')">×</button>
            </div>
        `;
    }).join('');

    document.getElementById('selectedList').innerHTML = html;
}

function resetMeal() {
    selectedItems = [];
    updateUI();
}

// Make functions available globally for onclick handlers
window.selectMeal = selectMeal;
window.toggleFood = toggleFood;
window.resetMeal = resetMeal;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});
