import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const RegisterActivate = () => {
  const [userData, setUserData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://97.74.94.109:4020/getlogindata`);
        setUserData(response.data["All user details"]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchData();
}, []);
console.log(userData)

  // Handle the edit button click
  const handleEditClick = async (id, currentActivate) => {
    const updatedActivate = currentActivate === 0 ? 1 : 0;
    try {
      await axios.put(`http://97.74.94.109:4020/activateUserToggle/${id}`, {
        activate: updatedActivate,
      });
      setUserData(prevData => 
        prevData.map(user => 
          user.id === id ? { ...user, activate: updatedActivate } : user
        )
      );
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <h1>User Details</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            {/* <th>Email ID</th> */}
            <th>Phone Number</th>
            <th>Activate</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              {/* <td>{user.emailID}</td> */}
              <td>{user.phoneNumber}</td>
              <td>{user.activate === 0 ? 'Deactivated' : 'Activated'}</td>
              <td>
                <button onClick={() => handleEditClick(user.id, user.activate)}>
                  Change Activation
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
