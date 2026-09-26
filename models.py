"""
CodeAlpha Social Media Platform - Database Models
"""

from datetime import datetime

class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.created_at = datetime.utcnow()

class Post:
    def __init__(self, author_id, content):
        self.author_id = author_id
        self.content = content
        self.likes_count = 0
        self.created_at = datetime.utcnow()

class Comment:
    def __init__(self, post_id, author_id, text):
        self.post_id = post_id
        self.author_id = author_id
        self.text = text
        self.created_at = datetime.utcnow()
