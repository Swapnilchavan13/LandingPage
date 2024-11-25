import React, { useState, useEffect } from 'react';

export const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAllUsers = async () => {
    let allUsers = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      while (currentPage <= totalPages) {
        const response = await fetch(
          `https://qljsn1wzw2.execute-api.ap-south-1.amazonaws.com/prod/api/user/all/data?page=${currentPage}`
        );
        const data = await response.json();

        if (data.type === 'Success') {
          allUsers = [...allUsers, ...data.userProfile];
          totalPages = data.totalPages;
          currentPage += 1;
        } else {
          console.error('Error fetching users:', data);
          break;
        }
      }

      allUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUsers(allUsers);
      setFilteredUsers(allUsers); // Set filtered users initially to the full list
    } catch (error) {
      console.error('Error fetching all users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = users.filter((user) =>
        user.phoneNumber.includes(query)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Reset to full list if query is empty
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Users</h2>
      <input
        type="text"
        placeholder="Search by mobile number"
        value={searchQuery}
        onChange={handleSearch}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Photo</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>User Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>DOB</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bio</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mobile Number</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Registration Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    <img
                      src={user.photo}
                      alt={user.userName}
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.userName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
  {new Date(user.dateOfBirth).toLocaleDateString()}
</td>

                  <td style={{ border: '1px solid #ddd', padding: '8px',width: '250px' }}>{user.bio || 'N/A'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.phoneNumber}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
