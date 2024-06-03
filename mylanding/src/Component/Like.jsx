import React, { useState } from 'react';

const userId = 6; // Replace with actual user ID

export const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const updatePoints = async (pointsChange) => {
    try {
      const newTotalPoints = totalPoints + pointsChange;

      const response = await fetch(`http://97.74.94.109:4121/updateWallet/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points: newTotalPoints })
      });

      if (!response.ok) {
        throw new Error('Failed to update points');
      }

      console.log('Points updated successfully');

      const transactionResponse = await fetch(`http://97.74.94.109:4121/newTransaction/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points: pointsChange, activityID: 1 }) // Assuming activityID for answering questions is 1
      });

      if (!transactionResponse.ok) {
        throw new Error('Failed to add transaction details');
      }

      console.log('Transaction added successfully');

      setTotalPoints(newTotalPoints);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleLike = async () => {
    const newLiked = !liked;
    const pointsChange = newLiked ? 100 : -100;

    await updatePoints(pointsChange);

    setLiked(newLiked);
  };

  return (
    <button onClick={toggleLike}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  );
};
