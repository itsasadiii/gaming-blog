import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import NewsCard from '../components/NewsCard';
import { fetchGames, fetchNews } from '../services/api';

function Home({ apiUrl }) {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const games = await fetchGames();
        const news = await fetchNews();
        setFeaturedGames(games.slice(0, 6));
        setLatestNews(news.slice(0, 6));
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Gaming Blog</h1>
          <p className="text-xl text-gray-100 mb-6">
            Discover the latest games and gaming news from around the world
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/games" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Browse Games
            </Link>
            <Link to="/news" className="btn-secondary">
              Read News
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      {!loading && (
        <>
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Games</h2>
              <Link to="/games" className="text-blue-400 hover:text-blue-300">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.map(game => (
                <GameCard key={game._id} game={game} />
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Latest News</h2>
              <Link to="/news" className="text-blue-400 hover:text-blue-300">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map(article => (
                <NewsCard key={article._id} article={article} />
              ))}
            </div>
          </section>
        </>
      )}

      {loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Loading content...</p>
        </div>
      )}
    </div>
  );
}

export default Home;
