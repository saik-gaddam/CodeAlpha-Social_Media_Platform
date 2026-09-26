/**
 * Gen-Z Crafty Social Feed Interactivity
 */

let posts = [
    {
        id: 1,
        author: "Zoe Sterling",
        avatar: "ZS",
        time: "15m ago",
        content: "just deployed my vibe check app to production and it didn't even crash once. we taking W's today ✨💻",
        likes: 42,
        isLiked: false,
        comments: [
            "no bugs? major W fr 🔥",
            "teach me your ways master"
        ]
    },
    {
        id: 2,
        author: "Kainat Vlogs",
        avatar: "KV",
        time: "3h ago",
        content: "midnight coding sessions hit different when the lofi playlist is elite. drop your favorite study beats down below 👇🎧",
        likes: 19,
        isLiked: false,
        comments: [
            "synthwave radio is the only correct answer",
            "chilledCow all day everyday"
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderFeed();
});

function renderFeed() {
    const feedContainer = document.getElementById('feed-container');
    if (!feedContainer) return;

    feedContainer.innerHTML = '';

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';

        const commentsHtml = post.comments.map(c => `<div class="comment-item">${escapeHtml(c)}</div>`).join('');

        postCard.innerHTML = `
            <div class="post-header">
                <div class="avatar">${post.avatar}</div>
                <div class="post-author-info">
                    <h3>${escapeHtml(post.author)}</h3>
                    <span>${post.time}</span>
                </div>
            </div>
            <div class="post-body">
                <p>${escapeHtml(post.content)}</p>
            </div>
            <div class="post-footer-bar">
                <button class="action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    ❤️ <span>${post.likes}</span>
                </button>
                <button class="action-btn" onclick="toggleComments(${post.id})">
                    💬 <span>${post.comments.length}</span>
                </button>
            </div>
            <div class="comments-section" id="comments-${post.id}">
                <div class="comment-list">
                    ${commentsHtml || '<p style="color:var(--text-muted); font-size:0.85rem;">No comments yet. Start the convo!</p>'}
                </div>
                <div class="comment-form">
                    <input type="text" id="comment-input-${post.id}" placeholder="Drop a comment..." onkeypress="handleCommentKey(event, ${post.id})">
                    <button onclick="addComment(${post.id})">Send</button>
                </div>
            </div>
        `;

        feedContainer.appendChild(postCard);
    });
}

function createPost() {
    const input = document.getElementById('post-input');
    const content = input.value.trim();

    if (!content) return;

    const newPost = {
        id: Date.now(),
        author: "You",
        avatar: "ME",
        time: "Just now",
        content: content,
        likes: 0,
        isLiked: false,
        comments: []
    };

    posts.unshift(newPost);
    input.value = '';
    renderFeed();
}

function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (post.isLiked) {
            post.likes -= 1;
            post.isLiked = false;
        } else {
            post.likes += 1;
            post.isLiked = true;
        }
        renderFeed();
    }
}

function toggleComments(postId) {
    const commentSection = document.getElementById(`comments-${postId}`);
    if (commentSection) {
        commentSection.classList.toggle('open');
    }
}

function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const commentText = input.value.trim();

    if (!commentText) return;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push(commentText);
        input.value = '';
        renderFeed();
        document.getElementById(`comments-${postId}`).classList.add('open');
    }
}

function handleCommentKey(event, postId) {
    if (event.key === 'Enter') {
        addComment(postId);
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
