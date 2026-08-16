import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsById } from '../services/api';

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchNewsById(id);
        setArticle(data);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (!article) {
    return <div className="container mx-auto px-4 py-8 text-center">Article not found</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-400 hover:text-blue-300"
      >
        ← Back
      </button>

      <article className="bg-gray-800 rounded-lg overflow-hidden p-8">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="badge">{article.category}</span>
            <span className="text-gray-400">{formatDate(article.createdAt)}</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
          <div className="flex justify-between items-center text-gray-400">
            <p>By <span className="font-semibold">{article.author}</span></p>
            <p>👁 {article.views} views</p>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="prose prose-invert max-w-none">
          <div className="text-lg leading-relaxed text-gray-300">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">About the Author</h3>
          <p className="text-gray-300">{article.author}</p>
        </div>
      </article>
    </div>
  );
}

export default NewsDetail;
