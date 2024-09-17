// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, get } from 'firebase/database' // Import Firebase database functions
import { database } from '../firebase/firebase' // Import the database instance
import Modal from '../components/UI/Modal'; // Import the Modal component ADDEDD
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


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
      <h1 className="text-4xl font-bold text-left mt-10 mb-10">Users Dashboard</h1>

      {/* Search Input Field */}
      <form className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="search">
          Search Student
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by name"
            required
          />
        </div>
      </form>

      <div className="mb-4 flex items-center space-x-4">
        {/* Section Dropdown Menu */}
        <div className="flex items-center">
          <label htmlFor="section" className="mr-2">Filter by Section:</label>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {selectedSection || 'All Sections'}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-auto min-w-[150px] max-w-[300px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <button
                      onClick={() => setSelectedSection('')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All Sections
                    </button>
                  </MenuItem>
                  {uniqueSections.map(section => (
                    <MenuItem key={section}>
                      <button
                        onClick={() => setSelectedSection(section)}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Section {section}
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
        </div>

        {/* Items per Page Dropdown */}
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2">Items per Page:</label>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {itemsPerPage}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-auto min-w-[150px] max-w-[300px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {[10, 20, 30, 50].map(count => (
                  <MenuItem key={count}>
                    <button
                      onClick={() => {
                        setItemsPerPage(count);
                        setCurrentPage(1); // Reset to first page on change
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {count}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="px-6 py-3 cursor-pointer"
              >
                Name {sortColumn === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('section')}
                className="px-6 py-3 cursor-pointer"
              >
                Section {sortColumn === 'section' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('computerHistory')}
                className="px-6 py-3 cursor-pointer"
              >
                History of Computer {sortColumn === 'computerHistory' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('computerElements')}
                className="px-6 py-3 cursor-pointer"
              >
                Elements of Computer System {sortColumn === 'computerElements' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('numberSystem')}
                className="px-6 py-3 cursor-pointer"
              >
                Number System {sortColumn === 'numberSystem' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('introProgramming')}
                className="px-6 py-3 cursor-pointer"
              >
                Introduction to Programming {sortColumn === 'introProgramming' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(([userId, user]) => (
              <tr
                key={userId}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.profile?.name || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {user.profile?.section || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {user.stats?.computerHistory || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {user.stats?.computerElements || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {user.stats?.numberSystem || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {user.stats?.introProgramming || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(user)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    View Details
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
          <div className="p-6 bg-white rounded-lg shadow-lg">
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
                <tr><td className="px-4 py-2 border">Newly Created User:</td><td className="px-4 py-2 border">{selectedUser.stats?.needWelcome ? 'Yes' : 'No'}</td></tr>
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
                    <tr key={activityId} className="odd:bg-white even:bg-gray-50">
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
          </div>
        </Modal>
      )}
    </div>
  );

}

export default Dashboard
