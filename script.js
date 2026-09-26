/**
 * CodeAlpha Social Media Platform - Feed Interactivity
 */

let posts = [
    {
        id: 1,
        author: "Sarah Jenkins",
        avatar: "SJ",
        time: "2 hours ago",
        content: "Just launched my brand new web development project using HTML, CSS, and JavaScript! Excited for what's next. 🚀",
        likes: 12,
        isLiked: false,
        comments: [
            "Congratulations Sarah! Looks awesome.",
            "Keep up the great work!"
        ]
    },
    {
        id: 2,
        author: "Alex Rivera",
        avatar: "AR",
        time: "5 hours ago",
        content: "Coding clean user interfaces is an art form. What are your favorite CSS features to use? 💻✨",
        likes: 8,
        isLiked: false,
        comments: [
            "CSS Grid is definitely a game changer!",
            "Flexbox all the way."
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

        const commentsHtml = post.comments.map(c => `<div class="comment-item">${c}</div>`).join('');

        postCard.innerHTML = `
            <div class="post-header">
                <div class="avatar">${post.avatar}</div>
                <div class="post-author-info">
                    <h3>${post.author}</h3>
                    <span>${post.time}</span>
                </div>
            </div>
            <div class="post-body">
                <p>${escapeHtml(post.content)}</p>
            </div>
            <div class="post-footer-bar">
                <button class="action-btn ${post.isLiked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    ❤️ <span>${post.likes}</span> Likes
                </button>
                <button class="action-btn" onclick="toggleComments(${post.id})">
                    💬 <span>${post.comments.length}</span> Comments
                </button>
            </div>
            <div class="comments-section" id="comments-${post.id}">
                <div class="comment-list">
                    ${commentsHtml || '<p style="color:var(--text-muted); font-size:0.85rem;">No comments yet. Be the first!</p>'}
                </div>
                <div class="comment-form">
                    <input type="text" id="comment-input-${post.id}" placeholder="Write a comment...">
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

    if (!content) {
        alert("Please write something before posting!");
        return;
    }

    const newPost = {
        id: Date.now(),
        author: "Developer User",
        avatar: "DU",
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
        // Keep comments section open after re-rendering
        document.getElementById(`comments-${postId}`).classList.add('open');
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
