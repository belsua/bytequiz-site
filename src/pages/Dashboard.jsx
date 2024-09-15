// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, get } from 'firebase/database' // Import Firebase database functions
import { database } from '../firebase/firebase' // Import the database instance
import Modal from '../components/UI/Modal'; // Import the Modal component ADDEDD

const Dashboard = () => {
  const navigate = useNavigate()
  const [usersData, setUsersData] = useState(null)
  //ADDED
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedSection, setSelectedSection] = useState('') // State for section filter
  const [uniqueSections, setUniqueSections] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sortColumn, setSortColumn] = useState('name'); // State for current sort column
  const [sortOrder, setSortOrder] = useState('asc'); // State for sort order

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  // Fetch all users' data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const usersRef = ref(database, 'users');
      
      try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUsersData(data);

          const sections = new Set(Object.values(data).map(user => user.profile?.section).filter(section => section));
          setUniqueSections([...sections]);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === 'asc';
    setSortColumn(column);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page on change
  };

  const filteredUsers = usersData
    ? Object.entries(usersData).filter(([userId, user]) => 
        user.profile?.name?.toLowerCase().includes(searchQuery) &&
        (selectedSection === '' || user.profile?.section === selectedSection)
      )
    : [];

  const sortedUsers = filteredUsers.sort((a, b) => {
    const aValue = a[1].profile[sortColumn] || a[1].stats[sortColumn] || '';
    const bValue = b[1].profile[sortColumn] || b[1].stats[sortColumn] || '';

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalItems = sortedUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  if (!usersData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Users Dashboard</h1>

      {/* Search Input Field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Section Dropdown Menu */}
      <div className="mb-4">
        <label htmlFor="section" className="mr-2">Filter by Section:</label>
        <select
          id="section"
          value={selectedSection}
          onChange={handleSectionChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All Sections</option>
          {uniqueSections.map(section => (
            <option key={section} value={section}>Section {section}</option>
          ))}
        </select>
      </div>

      {/* Items per Page Dropdown */}
      <div className="mb-4">
        <label htmlFor="itemsPerPage" className="mr-2">Items per Page:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Name {sortColumn === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('section')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Section {sortColumn === 'section' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('computerHistory')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                History of Computer {sortColumn === 'computerHistory' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('computerElements')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Elements of Computer System {sortColumn === 'computerElements' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('numberSystem')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Number System {sortColumn === 'numberSystem' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('introProgramming')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                Introduction to Programming {sortColumn === 'introProgramming' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map(([userId, user]) => (
              <tr key={userId}>
                <td className="px-6 py-4 whitespace-nowrap">{user.profile?.name || 'No name available'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.profile?.section || 'No section available'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.stats?.computerHistory || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.stats?.computerElements || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.stats?.numberSystem || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.stats?.introProgramming || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openModal(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <Modal onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">User Details</h2>

          <h3 className="text-xl font-semibold mb-2">Profile</h3>
          <table className="min-w-full mb-4 border border-gray-300">
            <tbody>
              <tr><td className="px-4 py-2 border">Name:</td><td className="px-4 py-2 border">{selectedUser.profile?.name || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Age:</td><td className="px-4 py-2 border">{selectedUser.profile?.age || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Avatar:</td><td className="px-4 py-2 border">{selectedUser.profile?.avatar || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Player ID:</td><td className="px-4 py-2 border">{selectedUser.profile?.playerId || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Section:</td><td className="px-4 py-2 border">{selectedUser.profile?.section || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Username:</td><td className="px-4 py-2 border">{selectedUser.profile?.username || 'N/A'}</td></tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-2">Stats</h3>
          <table className="min-w-full mb-4 border border-gray-300">
            <tbody>
              <tr><td className="px-4 py-2 border">Computer History:</td><td className="px-4 py-2 border">{selectedUser.stats?.computerHistory || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Computer Elements:</td><td className="px-4 py-2 border">{selectedUser.stats?.computerElements || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Number System:</td><td className="px-4 py-2 border">{selectedUser.stats?.numberSystem || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Intro Programming:</td><td className="px-4 py-2 border">{selectedUser.stats?.introProgramming || 'N/A'}</td></tr>
              <tr><td className="px-4 py-2 border">Intro Programming Unlocked:</td><td className="px-4 py-2 border">{selectedUser.stats?.isIntroProgrammingUnlocked ? 'Yes' : 'No'}</td></tr>
              <tr><td className="px-4 py-2 border">Number System Unlocked:</td><td className="px-4 py-2 border">{selectedUser.stats?.isNumberSystemUnlocked ? 'Yes' : 'No'}</td></tr>
              <tr><td className="px-4 py-2 border">Need Welcome:</td><td className="px-4 py-2 border">{selectedUser.stats?.needWelcome ? 'Yes' : 'No'}</td></tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold mb-2">Activities</h3>
          {selectedUser.activities ? (
            <table className="min-w-full mb-4 border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Date-Time</th>
                  <th className="px-4 py-2 border">Minigame</th>
                  <th className="px-4 py-2 border">Mode</th>
                  <th className="px-4 py-2 border">Topic</th>
                  <th className="px-4 py-2 border">Score</th>
                  <th className="px-4 py-2 border">Players</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedUser.activities).map(([activityId, activity]) => (
                  <tr key={activityId}>
                    <td className="px-4 py-2 border">{activity['date-time']}</td>
                    <td className="px-4 py-2 border">{activity.minigame || 'N/A'}</td>
                    <td className="px-4 py-2 border">{activity.mode || 'N/A'}</td>
                    <td className="px-4 py-2 border">{activity.topic || 'N/A'}</td>
                    <td className="px-4 py-2 border">{activity.score || 'N/A'}</td>
                    <td className="px-4 py-2 border">{activity.players ? activity.players.join(', ') : 'No players available'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No activities data available</p>
          )}
        </Modal>
      )}
    </div>
  );

}

export default Dashboard
