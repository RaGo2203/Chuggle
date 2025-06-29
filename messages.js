/*
    messages.js
    -----------
    JavaScript functionality for the messaging page.
    Handles conversation switching, message sending, real-time updates, and user interactions.
    Provides dynamic behavior for the messaging interface including conversation management and message display.
*/

// Sample conversation data
const conversationData = {
    alice: {
        name: "Alice Johnson",
        handle: "@alice",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
        messages: [
            { type: "received", text: "Hey! How's the project coming along?", time: "2:30 PM", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Going great! Just finished the main features. Want to see a demo?", time: "2:32 PM" },
            { type: "received", text: "That sounds amazing! When do we start?", time: "2:35 PM", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "How about tomorrow at 3 PM?", time: "2:36 PM" }
        ]
    },
    bob: {
        name: "Bob Smith",
        handle: "@bob",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
        messages: [
            { type: "received", text: "Did you see the latest update on the project?", time: "Yesterday", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Yes! The new features look incredible.", time: "Yesterday" },
            { type: "received", text: "Thanks for sharing that article!", time: "Yesterday", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "No problem! Thought you'd find it interesting.", time: "Yesterday" }
        ]
    },
    charlie: {
        name: "Charlie Brown",
        handle: "@charlie",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
        messages: [
            { type: "received", text: "Hey there! How have you been?", time: "3 days ago", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "I've been great! Working on some exciting projects.", time: "3 days ago" },
            { type: "received", text: "Let's catch up soon!", time: "3 days ago", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Absolutely! Let me know when you're free.", time: "3 days ago" }
        ]
    },
    diana: {
        name: "Diana Prince",
        handle: "@diana",
        avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2",
        messages: [
            { type: "received", text: "It was wonderful meeting you at the conference!", time: "1 week ago", avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Likewise! Your presentation was fantastic.", time: "1 week ago" },
            { type: "received", text: "Great meeting you at the conference!", time: "1 week ago", avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2" },
            { type: "sent", text: "Thank you! Looking forward to collaborating.", time: "1 week ago" }
        ]
    }
};

// Current active conversation
let currentConversation = 'alice';

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
            switchConversation(userId);
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

    // Message buttons in recommendations
    const messageBtns = document.querySelectorAll('.message-btn');
    messageBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.recommendation-card');
            const userName = card.querySelector('.recommendation-name').textContent;
            showNotification(`Starting conversation with ${userName}...`);
        });
    });

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
            avatar: conversation.avatar.replace('w=40&h=40', 'w=32&h=32')
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

// Handle typing indicators (placeholder for future implementation)
function showTypingIndicator(userId) {
    // Implementation for showing "User is typing..." indicator
}

function hideTypingIndicator(userId) {
    // Implementation for hiding typing indicator
}

// Handle online status (placeholder for future implementation)
function updateOnlineStatus(userId, isOnline) {
    // Implementation for showing online/offline status
}

// Search functionality (placeholder for future implementation)
function searchMessages(query) {
    // Implementation for searching through messages
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMessaging);

// Export functions for potential external use
window.ChuggleMessaging = {
    switchConversation,
    sendMessage,
    loadConversation,
    updateOnlineStatus,
    searchMessages,
    showNotification
};