function toggleLike(btn) {
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span');
    let count = parseInt(span.innerText);

    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
        icon.classList.replace('far', 'fas');
        span.innerText = count + 1;
    } else {
        icon.classList.replace('fas', 'far');
        span.innerText = count - 1;
    }
}

function addPost() {
    const content = document.getElementById('postContent').value;
    if (!content.trim()) return;

    const feed = document.getElementById('feed');
    const newPost = document.createElement('article');
    newPost.className = 'post card';
    newPost.innerHTML = `
        <div class="post-header">
            <img src="https://via.placeholder.com/40" class="avatar">
            <strong>@current_user</strong>
        </div>
        <div class="post-body"><p>${content}</p></div>
        <div class="post-footer">
            <button class="action-btn like-btn" onclick="toggleLike(this)"><i class="far fa-heart"></i> <span>0</span></button>
            <button class="action-btn"><i class="far fa-comment"></i> <span>0</span></button>
        </div>
    `;
    feed.prepend(newPost);
    document.getElementById('postContent').value = '';
}
