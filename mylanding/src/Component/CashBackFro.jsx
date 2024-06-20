import React, { useState, useEffect } from 'react';

export const CashBackFro = () => {
  const [activityData, setActivityData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract the userid from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userid = urlParams.get('userid');
    setUserId(userid);

    // Fetch data from the API
    fetch('http://97.74.94.109:4020/getActivityCashback')
      .then(response => response.json())
      .then(data => {
        // Assuming the API response is in the format you provided
        // Set the data in the state
        setActivityData(data.activityCashbackTable);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const redirectToGame = (gameURL) => {
    // Redirect to the gameURL with userid
    if (gameURL) {
      const gameURLWithUserId = `${gameURL}?userid=${userId}`;
      window.location.href = gameURLWithUserId;
    } else {
      console.error('No game URL found.');
    }
  };

  return (
    <div style={styles.container}>
      {activityData.length > 0 ? (
        activityData.map(activity => (
          <div key={activity.id} style={styles.content}>
            <h2>{activity.activityDetails}</h2>
            <p>{activity.categoryDetails}</p>
            <img src={activity.cashBackImagesURL} alt="Cashback" style={styles.image} />
            <p>Cashback Amount: {activity.cashbackAmount}</p>
            {/* <p>Date and Time: {activity.dateAndTime}</p> */}
            <p>Activity Type: {activity.activityType}</p>
            <p>Category Type: {activity.categoryType}</p>
            <button style={styles.button} onClick={() => redirectToGame(activity.gameURL)}>Earn Now</button>
          </div>
        ))
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
