import React, { useState, useEffect } from 'react';

export const CashBackFro = () => {
  const [activityData, setActivityData] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract the userid from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userid = urlParams.get('userid');
    setUserId(userid);

    // Fetch data from the API
    fetch('http://97.74.94.109:4121/getActivityCashback')
      .then(response => response.json())
      .then(data => {
        // Assuming the API response is in the format you provided
        // Set the data in the state
        setActivityData(data.activitycashbacktable[0]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const redirectToGame = () => {
    // Redirect to the gameURL with userid
    if (activityData && activityData.gameURL) {
      const gameURLWithUserId = `${activityData.gameURL}?userid=${userId}`;
      window.location.href = gameURLWithUserId;
    } else {
      console.error('No game URL found.');
    }
  };

  return (
    <div style={styles.container}>
      {activityData ? (
        <div style={styles.content}>
          <h2>{activityData.activityDetails}</h2>
          <p>{activityData.categoryDetails}</p>
          <img src={activityData.cashBackImagesURL} alt="Cashback" style={styles.image} />
          <p>Cashback Amount: 150}</p>
          {/* <p>Date and Time: {activityData.dateAndTime}</p> */}
          <p>Activity Type: {activityData.activityType}</p>
          <p>Category Type: {activityData.categoryType}</p>
          <button style={styles.button} onClick={redirectToGame}>Earn Now</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: 'auto',
  },
  content: {
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 16,
  },
};
