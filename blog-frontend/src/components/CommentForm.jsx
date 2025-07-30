import { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function CommentForm({ articleId, onCommentAdded }) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/${articleId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author_name: authorName,
            content
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при отправке');
      }

      setSuccess(true);
      setAuthorName('');
      setContent('');
      
      if (onCommentAdded) await onCommentAdded();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Добавить комментарий</h3>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Комментарий добавлен!</div>}

      <div className="form-group">
        <label>Ваше имя:</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Комментарий:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
}
