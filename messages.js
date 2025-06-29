/*
    messages.js
    -----------
    JavaScript functionality for the messaging interface.
    Handles conversation switching, message sending, and user interactions.
    Provides dynamic behavior matching the Twitter/X messaging experience.
*/

// Sample conversation data matching the screenshot
const conversationData = {
    samarth: {
        name: "Samarth Halyal",
        handle: "@samarth_halyal",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2",
        bio: "Lot of things to describe, meet someday to listen. 😊",
        joined: "April 2018",
        followers: "32 Followers",
        mutualInfo: "Not followed by anyone you're following",
        messages: [
            { 
                type: "sent", 
                text: '<a href="https://x.com/Funniest_Prank..." style="color: white; text-decoration: none;">x.com/Funniest_Prank...</a>', 
                time: "Jun 5, 2018, 3:44 PM • Seen",
                isLink: true
            }
        ]
    },
    nadeem: {
        name: "Nadeem Ashraf",
        handle: "@ConveyIn",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2",
        bio: "Digital marketing consultant and content creator",
        joined: "March 2018",
        followers: "156 Followers",
        mutualInfo: "Followed by 2 people you follow",
        messages: [
            { type: "sent", text: "Ok", time: "Mar 30, 2018, 9:39 PM" },
            { type: "received", text: "You still ok with small proof reads now and again bro", time: "Apr 3, 2018, 2:03 PM" },
            { type: "sent", text: "Sure, but as I am a final year student, I may not be always available", time: "2:36 PM" },
            { type: "sent", text: "Due to exams, projects, seminars and similar stuff", time: "Apr 3, 2018, 2:53 PM" },
            { type: "sent", text: "Also, can you help me financially to help support my basic needs.", time: "2:56 PM" },
            { type: "sent", text: "We can agree to some fixed amount per 500 or 1000 words", time: "Apr 3, 2018, 2:56 PM" },
            { type: "received", text: "Ok for now I needed volunteers but thanks anyway", time: "Apr 3, 2018, 4:58 PM" }
        ]
    },
    ankur: {
        name: "Ankur Jain",
        handle: "@AnkurJTSL",
        avatar: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2",
        bio: "Software engineer and tech enthusiast",
        joined: "February 2018",
        followers: "89 Followers",
        mutualInfo: "Followed by 1 person you follow",
        messages: [
            { type: "received", text: "Hey, I have some confidential information to share", time: "Mar 30, 2018" },
            { type: "received", text: "but don't tell about this to anand, please keep it between us", time: "Mar 30, 2018" },
            { type: "sent", text: "Sure, I'll keep it confidential. What's up?", time: "Mar 30, 2018" }
        ]
    },
    roz: {
        name: "roz ki di...",
        handle: "@idekwhybu",
        avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2",
        bio: "Creative designer and sticker enthusiast",
        joined: "January 2018",
        followers: "45 Followers",
        mutualInfo: "Not followed by anyone you're following",
        messages: [
            { type: "received", text: "Check out these stickers!", time: "Mar 30, 2018" },
            { type: "received", text: "x.com/i/stickers/ima...", time: "Mar 30, 2018" },
            { type: "sent", text: "Those are cool! Where did you find them?", time: "Mar 30, 2018" }
        ]
    },
    biz: {
        name: "Biz Comm Strat...",
        handle: "@BCs",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2",
        bio: "Business communication strategist",
        joined: "September 2017",
        followers: "234 Followers",
        mutualInfo: "Not followed by anyone you're following",
        messages: [
            { type: "received", text: "Are you looking to scale your marketing efforts?", time: "Oct 6, 2017" },
            { type: "sent", text: "Thanks for reaching out, but I'm not interested at the moment.", time: "Oct 6, 2017" }
        ]
    },
    evan: {
        name: "Evan Kirstel #...",
        handle: "@Eva",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2",
        bio: "Tech analyst and industry expert",
        joined: "May 2017",
        followers: "1.2K Followers",
        mutualInfo: "Followed by 5 people you follow",
        messages: [
            { type: "received", text: "Sent a link", time: "Jun 9, 2017" },
            { type: "sent", text: "Thanks for the link!", time: "Jun 9, 2017" }
        ]
    },
    pheltz: {
        name: "Pheltz Comic...",
        handle: "@pheltz",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=2",
        bio: "Local comic book shop owner",
        joined: "December 2016",
        followers: "78 Followers",
        mutualInfo: "Not followed by anyone you're following",
        messages: [
            { type: "received", text: "Hi We are a comic shop thanks for the follow!", time: "Feb 20, 2017" },
            { type: "sent", text: "You're welcome! Love supporting local businesses.", time: "Feb 20, 2017" }
        ]
    }
};

// Current active conversation
let currentConversation = 'nadeem';

// DOM elements
let conversationItems;
let messagesArea;
let messageInput;
let chatUserName;
let chatUserHandle;
let chatUserBio;
let chatUserMeta;
let chatAvatar;

// Initialize the messaging interface
function initializeMessaging() {
    // Get DOM elements
    conversationItems = document.querySelectorAll('.conversation-item');
    messagesArea = document.getElementById('messagesArea');
    messageInput = document.querySelector('.message-input');
    chatUserName = document.querySelector('.chat-user-name');
    chatUserHandle = document.querySelector('.chat-user-handle');
    chatUserBio = document.querySelector('.chat-user-bio');
    chatUserMeta = document.querySelectorAll('.chat-user-meta');
    chatAvatar = document.querySelector('.chat-avatar');

    // Setup event listeners
    setupEventListeners();
    
    // Load initial conversation
    loadConversation(currentConversation);
}

// Setup event listeners
function setupEventListeners() {
    // Conversation item clicks
    conversationItems.forEach(item => {
        item.addEventListener('click', () => {
            const userId = item.getAttribute('data-user');
            if (userId) {
                switchConversation(userId);
            }
        });
    });

    // Message input
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Send button
    const sendBtn = document.querySelector('.input-btn[title="Send"]');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    // Header buttons
    const headerBtns = document.querySelectorAll('.header-btn');
    headerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('title');
            showNotification(`${title} functionality would open here`);
        });
    });

    // Search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });
    }
}

// Switch between conversations
function switchConversation(userId) {
    // Update active conversation item
    conversationItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`[data-user="${userId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    // Update current conversation
    currentConversation = userId;
    
    // Load conversation
    loadConversation(userId);
}

// Load conversation messages and user info
function loadConversation(userId) {
    const conversation = conversationData[userId];
    if (!conversation) return;

    // Update chat header
    if (chatUserName) chatUserName.textContent = conversation.name;
    if (chatUserHandle) chatUserHandle.textContent = conversation.handle;
    if (chatUserBio) chatUserBio.textContent = conversation.bio;
    if (chatAvatar) chatAvatar.src = conversation.avatar;
    
    // Update user meta information
    if (chatUserMeta.length >= 2) {
        chatUserMeta[0].textContent = `Joined ${conversation.joined} • ${conversation.followers}`;
        chatUserMeta[1].textContent = conversation.mutualInfo;
    }

    // Clear existing messages
    if (messagesArea) messagesArea.innerHTML = '';

    // Add messages
    conversation.messages.forEach(message => {
        addMessageToChat(message, conversation);
    });

    // Scroll to bottom
    scrollToBottom();
}

// Add message to chat area
function addMessageToChat(message, conversation) {
    if (!messagesArea) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.type}`;

    let messageHTML = '';
    
    if (message.type === 'received') {
        messageHTML = `
            <img src="${conversation.avatar}" alt="User" class="message-avatar">
            <div class="message-content">
                <div class="message-bubble">${message.text}</div>
                <div class="message-time">${message.time}</div>
            </div>
        `;
    } else {
        messageHTML = `
            <div class="message-content">
                <div class="message-bubble">${message.text}</div>
                <div class="message-time">${message.time}</div>
            </div>
        `;
    }

    messageElement.innerHTML = messageHTML;
    messagesArea.appendChild(messageElement);
}

// Send a new message
function sendMessage() {
    if (!messageInput) return;
    
    const text = messageInput.value.trim();
    if (!text) return;

    // Create message object
    const message = {
        type: 'sent',
        text: text,
        time: getCurrentTime()
    };

    // Add to conversation data
    if (conversationData[currentConversation]) {
        conversationData[currentConversation].messages.push(message);
    }

    // Add to chat
    addMessageToChat(message, conversationData[currentConversation]);

    // Clear input
    messageInput.value = '';

    // Scroll to bottom
    scrollToBottom();

    // Update conversation preview
    updateConversationPreview(currentConversation, text);

    // Simulate response
    setTimeout(() => {
        simulateResponse();
    }, 1000 + Math.random() * 2000);
}

// Update conversation preview in the list
function updateConversationPreview(userId, text) {
    const conversationItem = document.querySelector(`[data-user="${userId}"]`);
    if (conversationItem) {
        const preview = conversationItem.querySelector('.conversation-preview');
        const time = conversationItem.querySelector('.conversation-time');
        
        if (preview) preview.textContent = text;
        if (time) time.textContent = 'now';
    }
}

// Simulate a response message
function simulateResponse() {
    const responses = [
        "That's interesting!",
        "I agree!",
        "Tell me more about that.",
        "Sounds good to me!",
        "Thanks for letting me know.",
        "I'll think about it.",
        "Great idea!",
        "Let's do it!"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const conversation = conversationData[currentConversation];
    
    if (conversation) {
        const responseMessage = {
            type: 'received',
            text: randomResponse,
            time: getCurrentTime()
        };

        // Add to conversation data
        conversation.messages.push(responseMessage);

        // Add to chat
        addMessageToChat(responseMessage, conversation);

        // Scroll to bottom
        scrollToBottom();

        // Update conversation preview
        updateConversationPreview(currentConversation, randomResponse);
    }
}

// Handle search
function handleSearch(query) {
    if (!query.trim()) {
        // Show all conversations
        conversationItems.forEach(item => {
            item.style.display = 'flex';
        });
        return;
    }

    // Filter conversations
    conversationItems.forEach(item => {
        const name = item.querySelector('.conversation-name').textContent.toLowerCase();
        const preview = item.querySelector('.conversation-preview').textContent.toLowerCase();
        
        if (name.includes(query.toLowerCase()) || preview.includes(query.toLowerCase())) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Get current time formatted
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Scroll messages area to bottom
function scrollToBottom() {
    if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMessaging);

// Export functions for potential external use
window.ChuggleMessaging = {
    switchConversation,
    sendMessage,
    loadConversation,
    showNotification
};