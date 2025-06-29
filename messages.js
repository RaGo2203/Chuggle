/*
    messages.js
    -----------
    JavaScript functionality for the messaging page with Twitter/X-like interface.
    Handles conversation switching, message sending, real-time updates, and user interactions.
    Provides dynamic behavior for the messaging interface including conversation management and message display.
*/

// Sample conversation data
const conversationData = {
    nadeem: {
        name: "Nadeem Ashraf",
        handle: "@ConveyIn",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
        messages: [
            { type: "sent", text: "Ok", time: "Mar 30, 2018, 9:39 PM" },
            { type: "received", text: "You still ok with small proof reads now and again bro", time: "Apr 3, 2018, 2:03 PM", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Sure, but as I am a final year student, I may not be always available", time: "2:36 PM" },
            { type: "sent", text: "Due to exams, projects, seminars and similar stuff", time: "Apr 3, 2018, 2:53 PM" },
            { type: "sent", text: "Also, can you help me financially to help support my basic needs.", time: "2:56 PM" },
            { type: "sent", text: "We can agree to some fixed amount per 500 or 1000 words", time: "Apr 3, 2018, 2:56 PM" },
            { type: "received", text: "Ok for now I needed volunteers but thanks anyway", time: "Apr 3, 2018, 4:58 PM", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" }
        ]
    },
    samarth: {
        name: "Samarth H.",
        handle: "@samarth",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
        messages: [
            { type: "received", text: "Check out this funny prank video!", time: "Jun 5, 2018", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "received", text: "x.com/Funniest_Prank...", time: "Jun 5, 2018", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Haha, that's hilarious! Thanks for sharing.", time: "Jun 5, 2018" }
        ]
    },
    ankur: {
        name: "Ankur Jain",
        handle: "@AnkurJTSL",
        avatar: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
        messages: [
            { type: "received", text: "Hey, I have some confidential information to share", time: "Mar 30, 2018", avatar: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "received", text: "but don't tell about this to anand, please keep it between us", time: "Mar 30, 2018", avatar: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Sure, I'll keep it confidential. What's up?", time: "Mar 30, 2018" }
        ]
    },
    roz: {
        name: "roz ki di...",
        handle: "@idekwhybu",
        avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
        messages: [
            { type: "received", text: "Check out these stickers!", time: "Mar 30, 2018", avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "received", text: "x.com/i/stickers/ima...", time: "Mar 30, 2018", avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Those are cool! Where did you find them?", time: "Mar 30, 2018" }
        ]
    },
    biz: {
        name: "Biz Comm Strat...",
        handle: "@BCs",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
        messages: [
            { type: "received", text: "Are you looking to scale your marketing efforts?", time: "Oct 6, 2017", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Thanks for reaching out, but I'm not interested at the moment.", time: "Oct 6, 2017" }
        ]
    },
    evan: {
        name: "Evan Kirstel #...",
        handle: "@Eva",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
        messages: [
            { type: "received", text: "Sent a link", time: "Jun 9, 2017", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Thanks for the link!", time: "Jun 9, 2017" }
        ]
    },
    pheltz: {
        name: "Pheltz Comic...",
        handle: "@pheltz",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2",
        messages: [
            { type: "received", text: "Hi We are a comic shop thanks for the follow!", time: "Feb 20, 2017", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "You're welcome! Love supporting local businesses.", time: "Feb 20, 2017" }
        ]
    }
};

// Current active conversation
let currentConversation = 'nadeem';

// DOM elements
let conversationList;
let chatArea;
let emptyState;
let messagesArea;
let messageInput;
let sendBtn;
let chatAvatar;
let chatUserName;
let chatUserHandle;

// Initialize the messaging interface
function initializeMessaging() {
    // Get DOM elements
    conversationList = document.getElementById('conversationList');
    chatArea = document.getElementById('chatArea');
    emptyState = document.getElementById('emptyState');
    messagesArea = document.getElementById('messagesArea');
    messageInput = document.getElementById('messageInput');
    sendBtn = document.getElementById('sendBtn');
    chatAvatar = document.getElementById('chatAvatar');
    chatUserName = document.getElementById('chatUserName');
    chatUserHandle = document.getElementById('chatUserHandle');

    // Add event listeners
    setupEventListeners();
    
    // Load initial conversation
    loadConversation(currentConversation);
}

// Setup event listeners
function setupEventListeners() {
    // Conversation item clicks
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
        item.addEventListener('click', () => {
            const userId = item.getAttribute('data-user');
            if (userId) {
                switchConversation(userId);
            }
        });
    });

    // Send message functionality
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // New message button
    const newMessageBtn = document.getElementById('newMessageBtn');
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', () => {
            showNotification('New message functionality would open a user search dialog');
        });
    }

    // Settings button
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showNotification('Settings panel would open here');
        });
    }

    // Message requests
    const messageRequests = document.querySelector('.message-requests');
    if (messageRequests) {
        messageRequests.addEventListener('click', () => {
            showNotification('Message requests would be shown here');
        });
    }

    // Auto-resize message input
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            // Auto-expand textarea functionality could be added here
        });
    }
}

// Switch between conversations
function switchConversation(userId) {
    // Update active conversation item
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`[data-user="${userId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        
        // Remove unread indicator
        const unreadIndicator = activeItem.querySelector('.unread-indicator');
        if (unreadIndicator) {
            unreadIndicator.remove();
        }
    }

    // Update current conversation
    currentConversation = userId;
    
    // Load conversation
    loadConversation(userId);
    
    // Show chat area, hide empty state
    if (chatArea) chatArea.style.display = 'flex';
    if (emptyState) emptyState.style.display = 'none';
}

// Load conversation messages
function loadConversation(userId) {
    const conversation = conversationData[userId];
    if (!conversation) return;

    // Update chat header
    if (chatAvatar) chatAvatar.src = conversation.avatar;
    if (chatUserName) chatUserName.textContent = conversation.name;
    if (chatUserHandle) chatUserHandle.textContent = conversation.handle;

    // Clear existing messages
    if (messagesArea) messagesArea.innerHTML = '';

    // Add messages
    conversation.messages.forEach(message => {
        addMessageToChat(message);
    });

    // Scroll to bottom
    scrollToBottom();
}

// Add message to chat area
function addMessageToChat(message) {
    if (!messagesArea) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.type}`;

    let messageHTML = '';
    
    if (message.type === 'received') {
        messageHTML = `
            <img src="${message.avatar}" alt="User" class="message-avatar">
            <div class="message-content">
                <div class="message-text">${message.text}</div>
                <div class="message-time">${message.time}</div>
            </div>
        `;
    } else {
        messageHTML = `
            <div class="message-content">
                <div class="message-text">${message.text}</div>
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
    addMessageToChat(message);

    // Clear input
    messageInput.value = '';

    // Scroll to bottom
    scrollToBottom();

    // Update conversation preview
    updateConversationPreview(currentConversation, text);

    // Simulate response (in a real app, this would come from the server)
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
            time: getCurrentTime(),
            avatar: conversation.avatar
        };

        // Add to conversation data
        conversation.messages.push(responseMessage);

        // Add to chat
        addMessageToChat(responseMessage);

        // Scroll to bottom
        scrollToBottom();

        // Update conversation preview
        updateConversationPreview(currentConversation, randomResponse);
    }
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
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1d9bf0;
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