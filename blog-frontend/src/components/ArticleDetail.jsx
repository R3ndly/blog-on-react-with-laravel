import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import { API_BASE_URL } from '../config';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState({
    article: true,
    comments: true
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`);
        if (!response.ok) throw new Error('Статья не найдена');
        const data = await response.json();
        setArticle(data.article || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(prev => ({ ...prev, article: false }));
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}/comments`);
        if (!response.ok) throw new Error('Ошибка загрузки комментариев');
        const data = await response.json();
        setComments(data.comments || data || []);
      } catch (err) {
        console.error('Ошибка комментариев:', err);
      } finally {
        setLoading(prev => ({ ...prev, comments: false }));
      }
    };

    fetchComments();
  }, [id]);

  const handleCommentAdded = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || data || []);
      }
    } catch (err) {
      console.error('Ошибка обновления:', err);
    }
  };

  if (loading.article) return <div>Загрузка статьи...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div>Статья не найдена</div>;

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <p className="date">
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      <div className="content">{article.content}</div>
      
      <h2>Комментарии ({comments.length})</h2>
      
      {loading.comments ? (
        <div>Загрузка комментариев...</div>
      ) : (
        <div className="comments">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <h3>{comment.author_name}</h3>
              <p>{comment.content}</p>
              <p className="comment-date">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <CommentForm 
        articleId={id} 
        onCommentAdded={handleCommentAdded} 
      />
    </div>
  );
}
