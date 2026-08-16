import React from 'react';
import { Link } from 'react-router-dom';

function NewsCard({ article }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Link to={`/news/${article._id}`}>
      <div className="card bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition">
        <div className="aspect-video bg-gray-700 overflow-hidden">
          {article.imageUrl ? (
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="badge text-xs">{article.category}</span>
            <span className="text-xs text-gray-400">{formatDate(article.createdAt)}</span>
          </div>
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{article.excerpt || article.content.substring(0, 100)}</p>
          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>By {article.author}</span>
            <span>👁 {article.views} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
