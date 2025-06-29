/*
    profile.js
    ----------
    JavaScript functionality for the profile page.
    Handles profile interactions, tab switching, post actions, and dynamic content updates.
    Provides interactive behavior for the user profile interface.
*/

// Current active tab
let currentTab = 'posts';

// DOM elements
let profileTabs;
let tabContents;

// Initialize the profile page functionality
function initializeProfile() {
    // Get DOM elements
    profileTabs = document.querySelectorAll('.profile-tab');
    tabContents = {
        posts: document.getElementById('postsTab'),
        replies: document.getElementById('repliesTab'),
        media: document.getElementById('mediaTab'),
        likes: document.getElementById('likesTab')
    };

    // Setup event listeners
    setupEventListeners();
}

// Setup all event listeners
function setupEventListeners() {
    // Profile tab switching
    profileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Post interactions
    setupPostInteractions();
    
    // Follow button interactions
    setupFollowInteractions();
    
    // Edit profile button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', handleEditProfile);
    }
    
    // Media grid interactions
    setupMediaInteractions();
    
    // Search functionality
    setupSearchFunctionality();
}

// Switch between profile tabs
function switchTab(tabName) {
    // Update active tab
    profileTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });

    // Show/hide tab content
    Object.keys(tabContents).forEach(key => {
        if (tabContents[key]) {
            tabContents[key].style.display = key === tabName ? 'block' : 'none';
        }
    });

    currentTab = tabName;
    
    // Load content for the selected tab
    loadTabContent(tabName);
}

// Load content for a specific tab
function loadTabContent(tabName) {
    switch (tabName) {
        case 'posts':
            // Posts are already loaded
            break;
        case 'replies':
            loadReplies();
            break;
        case 'media':
            loadMedia();
            break;
        case 'likes':
            loadLikes();
            break;
    }
}

// Load replies content
function loadReplies() {
    // In a real app, this would fetch replies from the server
    // For now, we'll show the empty state
    console.log('Loading replies...');
}

// Load media content
function loadMedia() {
    // Media content is already in the HTML
    // In a real app, this would fetch media from the server
    console.log('Loading media...');
}

// Load likes content
function loadLikes() {
    // In a real app, this would fetch liked posts from the server
    // For now, we'll show the empty state
    console.log('Loading likes...');
}

// Setup post interactions
function setupPostInteractions() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.action-btn');
        if (!target) return;

        if (target.classList.contains('like-btn')) {
            handleLikePost(target);
        } else if (target.classList.contains('repost-btn')) {
            handleRepost(target);
        } else if (target.classList.contains('reply-btn')) {
            handleReply(target);
        } else if (target.classList.contains('share-btn')) {
            handleShare(target);
        }
    });

    // Setup post menu interactions
    document.addEventListener('click', (e) => {
        if (e.target.closest('.feed-post-menu')) {
            handlePostMenu(e.target.closest('.feed-post-menu'));
        }
    });
}

// Handle liking a post
function handleLikePost(button) {
    const icon = button.querySelector('i');
    const countSpan = button.querySelector('span');
    let count = parseInt(countSpan.textContent) || 0;

    if (icon.classList.contains('fa-regular')) {
        // Like the post
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        button.style.color = '#f91880';
        countSpan.textContent = count + 1;
        showNotification('Post liked!');
    } else {
        // Unlike the post
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        button.style.color = '#536471';
        countSpan.textContent = Math.max(0, count - 1);
        showNotification('Post unliked');
    }
}

// Handle reposting
function handleRepost(button) {
    const countSpan = button.querySelector('span');
    let count = parseInt(countSpan.textContent) || 0;
    
    // Toggle repost state
    if (button.style.color === 'rgb(23, 191, 99)') {
        button.style.color = '#536471';
        countSpan.textContent = Math.max(0, count - 1);
        showNotification('Repost removed');
    } else {
        button.style.color = '#17bf63';
        countSpan.textContent = count + 1;
        showNotification('Post reposted!');
    }
}

// Handle replying to a post
function handleReply(button) {
    showNotification('Reply functionality would open a compose dialog');
}

// Handle sharing a post
function handleShare(button) {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this post from Rahul Goyal',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copied to clipboard!');
        });
    }
}

// Handle post menu
function handlePostMenu(button) {
    showNotification('Post options menu would appear here');
}

// Setup follow button interactions
function setupFollowInteractions() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('follow-btn')) {
            handleFollowUser(e.target);
        }
    });
}

// Handle following a user
function handleFollowUser(button) {
    if (button.textContent === 'Follow') {
        button.textContent = 'Following';
        button.style.background = '#1da1f2';
        showNotification('Now following user!');
    } else {
        button.textContent = 'Follow';
        button.style.background = '#0f1419';
        showNotification('Unfollowed user');
    }
}

// Handle edit profile
function handleEditProfile() {
    showNotification('Edit profile functionality would open a modal or form');
}

// Setup media interactions
function setupMediaInteractions() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.media-grid img')) {
            const img = e.target;
            openImageModal(img.src);
        }
    });
}

// Open image in modal
function openImageModal(imageSrc) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    // Create image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    // Close modal on click
    modal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close modal on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchBar = document.querySelector('.right-search-bar input');
    
    if (searchBar) {
        searchBar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    handleSearch(query);
                }
            }
        });
    }
}

// Handle search
function handleSearch(query) {
    showNotification(`Searching for: "${query}"`);
    // In a real app, this would perform the actual search
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1da1f2;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Handle profile stats clicks
function setupProfileStatsInteractions() {
    const statsElements = document.querySelectorAll('.profile-stats span');
    
    statsElements.forEach(stat => {
        stat.style.cursor = 'pointer';
        stat.addEventListener('click', () => {
            const text = stat.textContent;
            if (text.includes('Following')) {
                showNotification('Following list would open here');
            } else if (text.includes('Followers')) {
                showNotification('Followers list would open here');
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    setupProfileStatsInteractions();
});

// Export functions for potential external use
window.ChuggleProfile = {
    switchTab,
    handleLikePost,
    handleFollowUser,
    showNotification,
    openImageModal
};