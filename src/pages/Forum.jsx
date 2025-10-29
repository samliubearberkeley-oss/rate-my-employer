import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { insforge } from '../lib/insforge';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await insforge.database
        .from('forum_posts')
        .select('*, users(nickname, avatar_url)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading vibe coding ideas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title sketch">Vibe Coding Ideas</h1>
        <p className="hero-subtitle">
          {posts.length} {posts.length === 1 ? 'idea' : 'ideas'} shared by vibe coders
        </p>
        <div className="hero-cta">
          <Link to="/submit-idea" className="sketch-btn primary">
            Share Your Idea
          </Link>
        </div>
      </div>

      {/* Posts List */}
      <div className="container">
        <div className="list-container sketch">
          <div className="list-header">
            <h2 className="list-title">Latest Ideas</h2>
            <p className="list-subtitle">Cool coding concepts and techniques</p>
          </div>
          
          {posts.length === 0 ? (
            <div className="empty-state">
              <h3>No ideas yet</h3>
              <p>Be the first to share your vibe coding idea!</p>
              <Link to="/submit-idea" className="sketch-btn primary" style={{ marginTop: '16px' }}>
                Share First Idea
              </Link>
            </div>
          ) : (
            <div className="forum-posts">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="forum-post sketch"
                  onClick={() => openPost(post)}
                >
                  <div className="forum-post-header">
                    <h3 className="forum-post-title">{post.title}</h3>
                    {post.tags && post.tags.length > 0 && (
                      <div className="forum-post-tags">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="forum-tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="forum-post-content">
                    {post.content.length > 200 
                      ? `${post.content.substring(0, 200)}...` 
                      : post.content}
                  </div>
                  <div className="forum-post-footer">
                    <div className="forum-post-author">
                      {post.users?.nickname || 'Anonymous'}
                    </div>
                    <div className="forum-post-date">
                      {formatDate(post.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Detail Overlay */}
      {selectedPost && (
        <div className="overlay" onClick={closePost}>
          <div className="overlay-card sketch" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-header">
              <h2 className="overlay-title">{selectedPost.title}</h2>
              <button className="close-btn" onClick={closePost}>✕</button>
            </div>
            <div className="overlay-content">
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="forum-post-tags" style={{ marginBottom: '16px' }}>
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="forum-tag">#{tag}</span>
                  ))}
                </div>
              )}
              <div className="forum-post-content-full">
                {selectedPost.content.split('\n').map((para, idx) => (
                  <p key={idx} style={{ marginBottom: '12px' }}>{para}</p>
                ))}
              </div>
              <div className="forum-post-footer" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '2px solid var(--theme-border)' }}>
                <div className="forum-post-author">
                  {selectedPost.users?.nickname || 'Anonymous'}
                </div>
                <div className="forum-post-date">
                  {formatDate(selectedPost.created_at)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

