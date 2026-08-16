import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGameById } from '../services/api';

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const data = await fetchGameById(id);
        setGame(data);
      } catch (error) {
        console.error('Error loading game:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (!game) {
    return <div className="container mx-auto px-4 py-8 text-center">Game not found</div>;
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

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {game.imageUrl && (
          <div className="mb-6">
            <img src={game.imageUrl} alt={game.title} className="w-full h-96 object-cover rounded-lg" />
          </div>
        )}

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{game.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Rating</p>
              <p className="text-3xl font-bold text-yellow-400">{game.rating}/10</p>
              <p className="text-gray-400 text-sm">({game.reviews} reviews)</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Genre</p>
              <p className="text-2xl font-bold">{game.genre}</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Price</p>
              <p className="text-3xl font-bold text-green-400">${game.price || 'TBA'}</p>
            </div>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-300 leading-relaxed">{game.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Developer</h3>
              <p className="text-gray-300">{game.developer || 'Unknown'}</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Publisher</h3>
              <p className="text-gray-300">{game.publisher || 'Unknown'}</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Release Date</h3>
              <p className="text-gray-300">{formatDate(game.releaseDate)}</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {game.platform?.map(p => (
                  <span key={p} className="badge bg-blue-600">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
