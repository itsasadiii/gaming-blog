import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { fetchGames } from '../services/api';

function Games({ apiUrl }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames({ genre: genre || undefined });
        setGames(data);
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [genre]);

  const genres = ['Action', 'RPG', 'Strategy', 'Sports', 'Adventure', 'Puzzle'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Games</h1>

      {/* Filters */}
      <div className="mb-8 flex gap-4 flex-wrap">
        <button
          onClick={() => setGenre('')}
          className={`px-4 py-2 rounded-lg transition ${
            genre === '' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          All Genres
        </button>
        {genres.map(g => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-4 py-2 rounded-lg transition ${
              genre === g ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      {!loading ? (
        <>
          {games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <GameCard key={game._id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No games found in this category</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Loading games...</p>
        </div>
      )}
    </div>
  );
}

export default Games;
