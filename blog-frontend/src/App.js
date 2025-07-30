import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import ArticleForm from './components/ArticleForm';

function App() {
  return (
    <Router>
    	<div className="container">
        	<Routes>
          		<Route path="/" element={<ArticleList />} />
          		<Route path="/articles/new" element={<ArticleForm />} />
          		<Route path="/articles/:id" element={<ArticleDetail />} />
        	</Routes>
      	</div>
	</Router>
  );
}

export default App;
