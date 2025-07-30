import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function ArticleList() {
  const { 
    data: responseData, 
    loading, 
    error 
  } = useFetch('/articles');

  if (loading) return <div>Загрузка статей...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  const articles = responseData?.articles || [];

  return (
    <div>
      <h1>Список статей</h1>
      <Link to="/articles/new" className="btn">Создать статью</Link>
      
      <div className="articles">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <h2>{article.title}</h2>
            <p className="date">
              {new Date(article.created_at).toLocaleDateString()}
            </p>
            <p className="excerpt">
              {article.content.substring(0, 150)}...
            </p>
            <Link to={`/articles/${article.id}`} className="btn">
              Читать далее
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
