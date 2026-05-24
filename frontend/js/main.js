// ====================================
// Main JavaScript File
// Wedding Planning Services
// ====================================

// API Configuration
// Default to the backend port we started during local debugging (5001).
// You can override this by setting `window.WEDDING_API_URL` in a page script.
const API_URL = window.WEDDING_API_URL || 'http://localhost:5000/api';

// ====================================
// Initialize on Page Load
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Wedding Planning App Initialized');
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    checkUserSession();
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize tooltips
    initializeTooltips();
}

// ====================================
// Session Management
// ====================================
function checkUserSession() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        console.log('User is logged in:', JSON.parse(user).email);
        updateNavbarForLoggedIn(JSON.parse(user));
    }
}

function updateNavbarForLoggedIn(user) {
    const loginBtn = document.querySelector('a[href="pages/login.html"]');
    if (loginBtn) {
        loginBtn.innerHTML = `
            <i class="fas fa-user-circle me-1"></i>${user.first_name}
        `;
        loginBtn.href = user.role === 'admin' ? 'pages/admin-dashboard.html' : 'pages/dashboard.html';
    }
}

// ====================================
// Event Listeners Setup
// ====================================
function setupEventListeners() {
    // Example: Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

// ====================================
// Authentication Functions
// ====================================
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
}

function getCurrentUser() {
    return getData('user');
}

function isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
}

function redirectAfterLogin(user) {
    window.location.href = user && user.role === 'admin' ? 'admin-dashboard.html' : 'dashboard.html';
}

function login(email, password) {
    // This will be called from login.html
    console.log('Login attempt with:', email);
}

function register(formData) {
    // This will be called from registration.html
    console.log('Registration attempt:', formData);
}

// ====================================
// API Helper Functions
// ====================================
async function makeApiRequest(endpoint, method = 'GET', data = null) {
    try {
        const storedToken = getData('token');
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken || localStorage.getItem('token') || ''}`
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ====================================
// Toast Notification
// ====================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3`;
    toast.textContent = message;
    toast.style.zIndex = '9999';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ====================================
// Form Validation
// ====================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(\+880|0)[1-9]\d{9}$/;
    return re.test(phone);
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    return form.reportValidity();
}

// ====================================
// Tooltip Initialization
// ====================================
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ====================================
// Utility Functions
// ====================================
function formatCurrency(amount) {
    return new Intl.NumberFormat('bn-BD', {
        style: 'currency',
        currency: 'BDT'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('bn-BD').format(new Date(date));
}

function calculateDaysRemaining(eventDate) {
    const today = new Date();
    const event = new Date(eventDate);
    const timeDiff = event - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

// ====================================
// Local Storage Helpers
// ====================================
function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
        return JSON.parse(data);
    } catch (error) {
        // Support legacy plain-string values such as raw tokens.
        return data;
    }
}

function removeData(key) {
    localStorage.removeItem(key);
}

function getDemoUsers() {
    return getData('demoUsers') || [];
}

function saveDemoUsers(users) {
    setData('demoUsers', users);
}

function registerDemoUser(user) {
    const users = getDemoUsers();
    const existingUser = users.find(existing => existing.email.toLowerCase() === user.email.toLowerCase());

    if (existingUser) {
        throw new Error('Email already registered');
    }

    const demoUser = {
        user_id: Date.now(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role || 'user',
        is_verified: user.is_verified !== false,
        city: user.city || ''
    };

    users.push(demoUser);
    saveDemoUsers(users);
    return demoUser;
}

function loginDemoUser(email, password) {
    const users = getDemoUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password) || null;
}

// ====================================
// Budget Calculator
// ====================================
function calculateBudget(guestCount, packageType) {
    const packages = {
        'Silver': 50000,
        'Gold': 75000,
        'Premium': 125000
    };

    const perHeadCost = packages[packageType] / 100; // Assuming 100 guests base
    return perHeadCost * guestCount;
}

// ====================================
// Export Functions
// ====================================
window.APP = {
    logout,
    login,
    register,
    getCurrentUser,
    isAuthenticated,
    redirectAfterLogin,
    makeApiRequest,
    showToast,
    validateEmail,
    validatePhone,
    validateForm,
    formatCurrency,
    formatDate,
    calculateDaysRemaining,
    calculateBudget,
    setData,
    getData,
    removeData,
    getDemoUsers,
    saveDemoUsers,
    registerDemoUser,
    loginDemoUser
};

console.log('✅ All functions loaded successfully');
