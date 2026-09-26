from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime

app = Flask(__name__)

# In-memory database mock (You can replace this with SQLAlchemy later)
posts = [
    {
        "id": 1,
        "author": "Zoe Sterling",
        "avatar": "ZS",
        "time": "15m ago",
        "content": "just deployed my vibe check app to production and it didn't even crash once. we taking W's today ✨💻",
        "likes": 42,
        "comments": [
            "no bugs? major W fr 🔥",
            "teach me your ways master"
        ]
    },
    {
        "id": 2,
        "author": "Kainat Vlogs",
        "avatar": "KV",
        "time": "3h ago",
        "content": "midnight coding sessions hit different when the lofi playlist is elite. drop your favorite study beats down below 👇🎧",
        "likes": 19,
        "comments": [
            "synthwave radio is the only correct answer",
            "chilledCow all day everyday"
        ]
    }
]

@app.route('/')
def index():
    return render_template('index.html', posts=posts)

@app.route('/post', methods=['POST'])
def add_post():
    content = request.form.get('content')
    if content:
        new_post = {
            "id": len(posts) + 1,
            "author": "You",
            "avatar": "ME",
            "time": "Just now",
            "content": content,
            "likes": 0,
            "comments": []
        }
        posts.insert(0, new_post)
    return redirect(url_for('index'))

@app.route('/like/<int:post_id>', methods=['POST'])
def like_post(post_id):
    for post in posts:
        if post["id"] == post_id:
            post["likes"] += 1
            break
    return redirect(url_for('index'))

@app.route('/comment/<int:post_id>', methods=['POST'])
def add_comment(post_id):
    comment_text = request.form.get('comment')
    if comment_text:
        for post in posts:
            if post["id"] == post_id:
                post["comments"].append(comment_text)
                break
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
