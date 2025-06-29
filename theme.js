/*
    theme.js
    --------
    JavaScript functionality for theme management.
    Handles automatic theme detection, manual theme switching, and theme persistence.
    Provides utilities for theme-aware components and smooth transitions.
*/

// Theme management system
class ThemeManager {
    constructor() {
        this.currentTheme = this.detectTheme();
        this.init();
    }

    // Initialize theme system
    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeListeners();
        this.setupManualToggle();
    }

    // Detect user's preferred theme
    detectTheme() {
        // Check for saved preference first
        const savedTheme = localStorage.getItem('chuggle-theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            return savedTheme;
        }

        // Fall back to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    // Apply theme to document
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Save preference
        localStorage.setItem('chuggle-theme', theme);
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: theme } 
        }));
    }

    // Toggle between light and dark themes
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        return newTheme;
    }

    // Set specific theme
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
        }
    }

    // Get current theme
    getTheme() {
        return this.currentTheme;
    }

    // Setup listeners for system theme changes
    setupThemeListeners() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                const savedTheme = localStorage.getItem('chuggle-theme');
                if (!savedTheme) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(newTheme);
                }
            });
        }
    }

    // Setup manual theme toggle (for future implementation)
    setupManualToggle() {
        // Create theme toggle button (hidden by default)
        const toggleButton = document.createElement('button');
        toggleButton.id = 'theme-toggle';
        toggleButton.className = 'theme-toggle-btn';
        toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        toggleButton.title = 'Toggle theme';
        toggleButton.style.display = 'none'; // Hidden for now
        
        // Add to page
        document.body.appendChild(toggleButton);
        
        // Add click handler
        toggleButton.addEventListener('click', () => {
            const newTheme = this.toggleTheme();
            this.updateToggleIcon(toggleButton, newTheme);
        });
        
        // Set initial icon
        this.updateToggleIcon(toggleButton, this.currentTheme);
    }

    // Update toggle button icon
    updateToggleIcon(button, theme) {
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        }
        button.title = `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`;
    }

    // Get theme-aware color
    getThemeColor(colorName) {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        return computedStyle.getPropertyValue(`--${colorName}`).trim();
    }

    // Check if current theme is dark
    isDarkTheme() {
        return this.currentTheme === 'dark';
    }

    // Check if current theme is light
    isLightTheme() {
        return this.currentTheme === 'light';
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Utility functions for theme-aware components
window.ChuggleTheme = {
    // Get current theme
    getTheme: () => themeManager.getTheme(),
    
    // Set theme
    setTheme: (theme) => themeManager.setTheme(theme),
    
    // Toggle theme
    toggleTheme: () => themeManager.toggleTheme(),
    
    // Check if dark theme
    isDark: () => themeManager.isDarkTheme(),
    
    // Check if light theme
    isLight: () => themeManager.isLightTheme(),
    
    // Get theme color
    getColor: (colorName) => themeManager.getThemeColor(colorName),
    
    // Listen for theme changes
    onThemeChange: (callback) => {
        window.addEventListener('themechange', (e) => {
            callback(e.detail.theme);
        });
    }
};

// Add CSS for theme toggle button (hidden by default)
const themeToggleCSS = `
.theme-toggle-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--border-primary);
    background: var(--bg-primary);
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 2px 8px var(--shadow-medium);
}

.theme-toggle-btn:hover {
    background: var(--bg-hover);
    transform: scale(1.05);
}

.theme-toggle-btn:active {
    transform: scale(0.95);
}

@media (max-width: 768px) {
    .theme-toggle-btn {
        width: 44px;
        height: 44px;
        font-size: 1.1rem;
    }
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = themeToggleCSS;
document.head.appendChild(styleSheet);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, themeManager };
}