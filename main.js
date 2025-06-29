/*
    main.js
    -------
    JavaScript functionality for the main feed page.
    Handles post creation, feed interactions, character counting, and dynamic content updates.
    Provides interactive behavior for the main social media interface with theme support.
*/

// Import theme system
if (typeof window !== 'undefined') {
    // Load theme script if not already loaded
    if (!window.ChuggleTheme) {
        const script = document.createElement('script');
        script.src = 'theme.js';
        document.head.appendChild(script);
    }
}

// DOM elements
let createPostText;
let createPostBtn;
let characterCount;
let postImageInput;

// Initialize the main page functionality
function initializeMain() {
    // Get DOM elements
    createPostText = document.querySelector('.create-post-text');
    createPostBtn = document.querySelector('.create-post-btn');
    characterCount = document.querySelector('.character-count');
    postImageInput = document.getElementById('post-image');

    // Setup event listeners
    setupEventListeners();
    
    // Initialize character count
    updateCharacterCount();
    
    // Setup theme-aware components
    setupThemeAwareComponents();
}

// Setup all event listeners
function setupEventListeners() {
    // Post creation functionality
    if (createPostText) {
        createPostText.addEventListener('input', handlePostTextChange);
        createPostText.addEventListener('keydown', handlePostKeydown);
    }
    
    if (createPostBtn) {
        createPostBtn.addEventListener('click', handleCreatePost);
    }
    
    if (postImageInput) {
        postImageInput.addEventListener('change', handleImageUpload);
    }

    // Feed post interactions
    setupFeedInteractions();
    
    // Navigation interactions
    setupNavigationInteractions();
    
    // Search functionality
    setupSearchFunctionality();
}

// Setup theme-aware components
function setupThemeAwareComponents() {
    // Listen for theme changes
    if (window.ChuggleTheme) {
        window.ChuggleTheme.onThemeChange((theme) => {
            // Update any theme-specific functionality
            updateNotificationStyles(theme);
        });
    }
}

// Handle post text changes
function handlePostTextChange() {
    updateCharacterCount();
    updatePostButtonState();
}

// Handle keyboard shortcuts in post text
function handlePostKeydown(e) {
    // Ctrl/Cmd + Enter to post
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!createPostBtn.disabled) {
            handleCreatePost();
        }
    }
}

// Update character count display
function updateCharacterCount() {
    const text = createPostText.value;
    const remaining = 280 - text.length;
    
    if (characterCount) {
        characterCount.textContent = remaining;
        
        // Change color based on remaining characters
        if (remaining < 20) {
            characterCount.style.color = 'var(--color-error)';
        } else if (remaining < 50) {
            characterCount.style.color = 'var(--color-warning)';
        } else {
            characterCount.style.color = 'var(--text-secondary)';
        }
    }
}

// Update post button state
function updatePostButtonState() {
    const text = createPostText.value.trim();
    const isValid = text.length > 0 && text.length <= 280;
    
    createPostBtn.disabled = !isValid;
}

// Handle creating a new post
function handleCreatePost() {
    const text = createPostText.value.trim();
    if (!text || text.length > 280) return;

    // Create new post element
    const newPost = createPostElement({
        username: 'Rahul Goyal',
        handle: '@Ra_Go__',
        time: 'now',
        content: text,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'
    });

    // Add to feed
    const feed = document.querySelector('.feed');
    if (feed) {
        feed.insertBefore(newPost, feed.firstChild);
    }

    // Clear the form
    createPostText.value = '';
    updateCharacterCount();
    updatePostButtonState();

    // Show success feedback
    showNotification('Post created successfully!');
}

// Create a post element
function createPostElement(postData) {
    const postElement = document.createElement('div');
    postElement.className = 'feed-post';
    
    postElement.innerHTML = `
        <div class="feed-post-header">
            <img src="${postData.avatar}" alt="${postData.username}" class="feed-post-avatar">
            <div>
                <span class="feed-post-username">${postData.username}</span>
                <span class="feed-post-handle">${postData.handle} · ${postData.time}</span>
            </div>
            <button class="feed-post-menu">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
        <div class="feed-post-content">${postData.content}</div>
        <div class="feed-post-actions">
            <button class="action-btn reply-btn">
                <i class="fa-regular fa-comment"></i>
                <span>0</span>
            </button>
            <button class="action-btn repost-btn">
                <i class="fa-solid fa-retweet"></i>
                <span>0</span>
            </button>
            <button class="action-btn like-btn">
                <i class="fa-regular fa-heart"></i>
                <span>0</span>
            </button>
            <button class="action-btn share-btn">
                <i class="fa-regular fa-share-from-square"></i>
            </button>
        </div>
    `;
    
    // Add event listeners to the new post
    setupPostInteractions(postElement);
    
    return postElement;
}

// Handle image upload
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        // In a real app, you would upload the file to a server
        // For now, just show a notification
        showNotification('Image selected: ' + file.name);
    }
}

// Setup feed post interactions
function setupFeedInteractions() {
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

// Setup interactions for a specific post
function setupPostInteractions(postElement) {
    const likeBtn = postElement.querySelector('.like-btn');
    const repostBtn = postElement.querySelector('.repost-btn');
    const replyBtn = postElement.querySelector('.reply-btn');
    const shareBtn = postElement.querySelector('.share-btn');
    const menuBtn = postElement.querySelector('.feed-post-menu');

    if (likeBtn) likeBtn.addEventListener('click', () => handleLikePost(likeBtn));
    if (repostBtn) repostBtn.addEventListener('click', () => handleRepost(repostBtn));
    if (replyBtn) replyBtn.addEventListener('click', () => handleReply(replyBtn));
    if (shareBtn) shareBtn.addEventListener('click', () => handleShare(shareBtn));
    if (menuBtn) menuBtn.addEventListener('click', () => handlePostMenu(menuBtn));
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
        button.style.color = 'var(--color-like)';
        countSpan.textContent = count + 1;
    } else {
        // Unlike the post
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        button.style.color = 'var(--text-secondary)';
        countSpan.textContent = Math.max(0, count - 1);
    }
}

// Handle reposting
function handleRepost(button) {
    const countSpan = button.querySelector('span');
    let count = parseInt(countSpan.textContent) || 0;
    
    // Toggle repost state
    if (button.style.color === 'var(--color-repost)' || button.style.color === 'rgb(23, 191, 99)') {
        button.style.color = 'var(--text-secondary)';
        countSpan.textContent = Math.max(0, count - 1);
    } else {
        button.style.color = 'var(--color-repost)';
        countSpan.textContent = count + 1;
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
            title: 'Check out this post on Chuggle',
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

// Setup navigation interactions
function setupNavigationInteractions() {
    // Handle post button click
    const postBtn = document.querySelector('.post-btn');
    if (postBtn) {
        postBtn.addEventListener('click', () => {
            createPostText.focus();
        });
    }

    // Handle follow buttons
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
        button.style.background = 'var(--accent-primary)';
        showNotification('Now following user!');
    } else {
        button.textContent = 'Follow';
        button.style.background = 'var(--accent-secondary)';
        showNotification('Unfollowed user');
    }
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchBars = document.querySelectorAll('.search-bar, .right-search-bar input');
    
    searchBars.forEach(searchBar => {
        searchBar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    handleSearch(query);
                }
            }
        });
    });
}

// Handle search
function handleSearch(query) {
    showNotification(`Searching for: "${query}"`);
    // In a real app, this would perform the actual search
}

// Update notification styles based on theme
function updateNotificationStyles(theme) {
    // This function can be used to update notification colors based on theme
    // Currently, notifications use CSS variables which automatically adapt
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: var(--text-inverse);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 4px 12px var(--shadow-medium);
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

// Auto-resize textarea
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMain);

// Export functions for potential external use
window.ChuggleMain = {
    handleCreatePost,
    handleLikePost,
    handleRepost,
    handleFollowUser,
    showNotification
};