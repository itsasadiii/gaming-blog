import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <Link to={`/games/${game._id}`}>
      <div className="card bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition transform">
        <div className="aspect-video bg-gray-700 overflow-hidden">
          {game.imageUrl ? (
            <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 truncate">{game.title}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{game.description}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="badge text-xs">{game.genre}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-semibold">{game.rating}/10</span>
            </div>
          </div>
          {game.price && (
            <div className="mt-3 text-green-400 font-bold">
              ${game.price}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default GameCard;
