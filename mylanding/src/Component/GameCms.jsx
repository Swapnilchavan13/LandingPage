import React from 'react';
import { AddGame } from './AddGame';
import GameList from './GameList';

export const GameCms = () => {
  return (
   
      <div className="App">
         <GameList />
         <AddGame />
         {/* <UpdateGame /> */}

      </div>


  )
}
