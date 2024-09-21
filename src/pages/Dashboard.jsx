// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, get } from 'firebase/database' // Import Firebase database functions
import { database } from '../firebase/firebase' // Import the database instance
import Modal from '../components/UI/Modal'; // Import the Modal component ADDEDD
import ActivityModal from '../components/UI/ActivityModal'; // Import the ActivityModal component
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Dashboard = () => {
  const navigate = useNavigate()
  const [usersData, setUsersData] = useState(null)
  //ADDED
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [sortColumn, setSortColumn] = useState('name'); // State for current sort column
  const [sortOrder, setSortOrder] = useState('asc'); // State for sort order


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


 
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const [sortActivityOrder, setActivitySortOrder] = useState('asc'); // State for sort order
  const [sortActivityColumn, setActivitySortColumn] = useState('name'); // State for current sort column

  

  
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

  
  if (!usersData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-300 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  
  

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };


  const openActivityModal = (user) => {
    setSelectedUser(user);
    setIsActivityModalOpen(true);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedUser(null);
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === 'asc';
    setSortColumn(column);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };


  const handleActivitySort = (column) => {
    const isAsc = sortActivityColumn === column && sortActivityOrder === 'asc';
    setActivitySortColumn(column);
    setActivitySortOrder(isAsc ? 'desc' : 'asc');
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
      user.profile?.name?.toLowerCase().includes(searchQuery)
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
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                      onClick={() => openModal(user)}
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-600"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openActivityModal(user)}
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-600"
                    >
                      View Activity
                    </button>
                  </div>
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


      {/* Details Modal */}
      {isModalOpen && selectedUser && (
        <Modal onClose={closeModal}>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedUser.profile?.username || 'Player'} Details</h2>


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
          </div>
        </Modal>
      )}


      {/* Activity Modal */}
      {isActivityModalOpen && selectedUser && (
        <ActivityModal
          onClose={closeActivityModal}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );


}


export default Dashboard
