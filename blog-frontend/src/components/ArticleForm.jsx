import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ArticleForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании статьи');
      }

      const data = await response.json();
      navigate(`/articles/${data.id || data.article?.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="article-form">
      <h1>Новая статья</h1>
      
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Заголовок:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength="255"
        />
      </div>

      <div className="form-group">
        <label>Содержание:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="10"
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Создание...' : 'Создать статью'}
      </button>
    </form>
  );
}
