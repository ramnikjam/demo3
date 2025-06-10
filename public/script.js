// Global variables
let currentMood = '';
let currentRecipe = null;

// API base URL - adjust if needed
const API_BASE = '';

// DOM Elements
const moodSelection = document.getElementById('mood-selection');
const loading = document.getElementById('loading');
const recipeSection = document.getElementById('recipe-section');
const errorMessage = document.getElementById('error-message');

// Mood selection function
async function selectMood(mood) {
    currentMood = mood;
    showLoading();
    
    try {
        const recipe = await fetchRecipeByMood(mood);
        displayRecipe(recipe);
    } catch (error) {
        showError('Sorry, we couldn\'t find a recipe for your mood. Please try again!');
        console.error('Error fetching recipe:', error);
    }
}

// Fetch recipe from API
async function fetchRecipeByMood(mood, excludeId = null) {
    let url = `/api/recipes/${mood}`;
    if (excludeId) {
        url += `?exclude=${excludeId}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const recipe = await response.json();
    return recipe;
}

// Display recipe
function displayRecipe(recipe) {
    currentRecipe = recipe;
    hideLoading();
    hideMoodSelection();
    hideError();
    
    // Update recipe information
    document.getElementById('recipe-name').textContent = recipe.name;
    document.getElementById('recipe-description').textContent = recipe.description;
    document.getElementById('current-mood').textContent = recipe.mood;
    document.getElementById('prep-time').textContent = recipe.prep_time;
    document.getElementById('cook-time').textContent = recipe.cook_time;
    document.getElementById('servings').textContent = recipe.servings;
    
    // Update ingredients
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    const ingredients = recipe.ingredients.split(', ');
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.className = 'flex items-start';
        li.innerHTML = `
            <i class="fas fa-check-circle text-mood-green mr-2 mt-1 flex-shrink-0"></i>
            <span>${ingredient.trim()}</span>
        `;
        ingredientsList.appendChild(li);
    });
    
    // Update instructions
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    const instructions = recipe.instructions.split(/\d+\.\s+/).filter(step => step.trim());
    instructions.forEach((instruction, index) => {
        const li = document.createElement('li');
        li.className = 'flex items-start';
        li.innerHTML = `
            <span class="bg-mood-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                ${index + 1}
            </span>
            <span>${instruction.trim()}</span>
        `;
        instructionsList.appendChild(li);
    });
    
    // Update header gradient based on mood
    updateHeaderGradient(recipe.mood);
    
    // Show recipe section
    showRecipeSection();
}

// Update header gradient based on mood
function updateHeaderGradient(mood) {
    const header = document.getElementById('recipe-header');
    const gradients = {
        happy: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        comfort: 'bg-gradient-to-r from-amber-600 to-orange-600',
        energized: 'bg-gradient-to-r from-green-500 to-emerald-600',
        stressed: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        adventurous: 'bg-gradient-to-r from-purple-500 to-pink-600'
    };
    
    // Remove all existing gradient classes
    Object.values(gradients).forEach(gradient => {
        header.classList.remove(...gradient.split(' '));
    });
    
    // Add the new gradient
    const newGradient = gradients[mood] || 'bg-gradient-to-r from-mood-purple to-mood-pink';
    header.classList.add(...newGradient.split(' '));
}

// Get new recipe for the same mood
async function getNewRecipe() {
    if (!currentMood || !currentRecipe) return;
    
    showLoading();
    hideRecipeSection();
    
    try {
        const recipe = await fetchRecipeByMood(currentMood, currentRecipe.id);
        displayRecipe(recipe);
    } catch (error) {
        showError('Sorry, we couldn\'t find another recipe. Please try a different mood!');
        console.error('Error fetching new recipe:', error);
        // Show the current recipe again if we can't find a new one
        showRecipeSection();
        hideLoading();
    }
}

// Choose different mood
function chooseDifferentMood() {
    currentMood = '';
    currentRecipe = null;
    hideRecipeSection();
    hideError();
    showMoodSelection();
}

// UI state management functions
function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showMoodSelection() {
    moodSelection.classList.remove('hidden');
}

function hideMoodSelection() {
    moodSelection.classList.add('hidden');
}

function showRecipeSection() {
    recipeSection.classList.remove('hidden');
}

function hideRecipeSection() {
    recipeSection.classList.add('hidden');
}

function showError(message) {
    document.getElementById('error-text').textContent = message;
    errorMessage.classList.remove('hidden');
    hideLoading();
    showMoodSelection();
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to mood buttons
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animations
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 100);
        });
    });
});

// Handle keyboard navigation
document.addEventListener('keydown', function(event) {
    // Allow Enter or Space to trigger mood selection when focused
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('mood-btn')) {
            event.preventDefault();
            focusedElement.click();
        }
    }
    
    // Allow Escape to go back to mood selection
    if (event.key === 'Escape') {
        if (!recipeSection.classList.contains('hidden')) {
            chooseDifferentMood();
        }
    }
});

// Add loading animation improvements
function showLoading() {
    loading.classList.remove('hidden');
    // Add a slight delay to make the loading feel more natural
    setTimeout(() => {
        const spinner = loading.querySelector('.animate-spin');
        if (spinner) {
            spinner.style.animationDuration = '1s';
        }
    }, 100);
}

// Error handling for network issues
window.addEventListener('online', function() {
    hideError();
});

window.addEventListener('offline', function() {
    showError('You appear to be offline. Please check your internet connection.');
}); 