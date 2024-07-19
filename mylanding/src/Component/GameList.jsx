import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/games')
      .then(response => setGames(response.data))
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  const deleteGame = (id) => {
    axios.delete(`http://localhost:3005/games/${id}`)
      .then(() => setGames(games.filter(game => game._id !== id)))
      .catch(error => console.error('Error deleting game:', error));
  };

  return (
    <div>
      <h1>Game List</h1>
      <Link to="/addgame">Add New Game</Link>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <p>Category: {game.category}</p>
            <p>Prize: {game.prize}</p>
            <p>Organizer: {game.organizerName}</p>
            <button onClick={() => deleteGame(game._id)}>Delete</button>
            <Link to={`/update/${game._id}`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
