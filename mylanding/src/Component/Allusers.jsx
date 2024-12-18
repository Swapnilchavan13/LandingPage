import React, { useState, useEffect } from "react";

export const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [realUserCount, setRealUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null); // For the selected user details
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  
  

  const fetchAllUsers = async () => {
    let allUsers = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      while (currentPage <= totalPages) {
        const response = await fetch(
          
          `https://hc29cfp8vj.execute-api.ap-south-1.amazonaws.com/prod/api/user/all/data?page=${currentPage}`
        );
        const data = await response.json();

        if (data.type === "Success") {
          allUsers = [...allUsers, ...data.userProfile];
          totalPages = data.totalPages;
          currentPage += 1;
        } else {
          console.error("Error fetching users:", data);
          break;
        }
      }

      allUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUsers(allUsers);
      setFilteredUsers(allUsers); // Set filtered users initially to the full list
    } catch (error) {
      console.error("Error fetching all users:", error);
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

  const showRealUsers = () => {
    const realUsers = users.filter(
      (user) =>
        !user.phoneNumber.startsWith("911") &&
        !user.phoneNumber.startsWith("912") &&
        !user.userName.startsWith("Localite") // Exclude names starting with 'Localite'
    );
    setFilteredUsers(realUsers);
    setRealUserCount(realUsers.length); // Update the count of real users
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>
      <input
        type="text"
        placeholder="Search by mobile number"
        value={searchQuery}
        onChange={handleSearch}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={showRealUsers}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Show Real Users
      </button>
      {realUserCount > 0 && (
        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>
          Real Users Count: {realUserCount}
        </p>
      )}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Photo
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                User Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>DOB</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Bio</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Mobile Number
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Registration Time
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={user.photo}
                      alt={user.userName}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      cursor: "pointer",
                      color: "#007bff",
                    }}
                    onClick={() => openModal(user)}
                  >
                    {user.userName}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "250px",
                    }}
                  >
                    {user.bio || "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {user.phoneNumber}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedUser && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedUser.userName}</h3>
            <img
              src={selectedUser.photo}
              alt={selectedUser.userName}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />
            <p><strong>Bio:</strong> {selectedUser.bio}</p>
            <p><strong>Mobile Number:</strong> {selectedUser.phoneNumber}</p>
            <p><strong>Email:</strong> {selectedUser.emailID}</p>
            <p><strong>City:</strong> {selectedUser.city}</p>
            <p><strong>Pin Code:</strong> {selectedUser.pinCode}</p>
            

             {/* Display total followers */}
        <p><strong>Total Likes:</strong> {selectedUser.totalLikes}</p>

        <p><strong>Total Followers:</strong> {selectedUser.following.length}</p>
        
        <p><strong>Total Following:</strong> {(selectedUser.followers).length}</p>


{/* Display address details */}
<p>
  <strong>Address:</strong><br />
  Flat No: {selectedUser.flatNo}, {selectedUser.landmark}, {selectedUser.area}-{selectedUser.pinCode}<br />
</p>



            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
