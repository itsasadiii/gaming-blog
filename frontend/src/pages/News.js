import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../services/api';

function News({ apiUrl }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews({ category: category || undefined });
        setArticles(data);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category]);

  const categories = ['Breaking', 'Review', 'Interview', 'Event', 'Community'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Gaming News</h1>

      {/* Category Filters */}
      <div className="mb-8 flex gap-4 flex-wrap">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded-lg transition ${
            category === '' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          All Categories
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg transition ${
              category === cat ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      {!loading ? (
        <>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <NewsCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No articles found in this category</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Loading news...</p>
        </div>
      )}
    </div>
  );
}

export default News;
