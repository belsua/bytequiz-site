import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import * as Excel from 'exceljs';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Modal from '../../components/UI/Modal';
import ActivityModal from '../../components/UI/ActivityModal';
import Loading from '../../components/UI/Loading';
import ExportToExcelButton from '../../components/UI/ExportToExcelButton';

function ClassroomPage() {
  const { classroomID } = useParams();
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      const classroomRef = ref(database, `classrooms/${classroomID}/players`);

      try {
        const snapshot = await get(classroomRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const playerList = data ? Object.entries(data) : [];
          setPlayers(playerList);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [classroomID]);

  if (!players) {
    return (
      <Loading />
    );
  }

  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  const openActivityModal = (player) => {
    setSelectedPlayer(player);
    setIsActivityModalOpen(true);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === 'asc';
    setSortColumn(column);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // eslint-disable-next-line no-unused-vars
  const filteredPlayers = players.filter(([_, playerData]) =>
    playerData.profile?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPlayers = filteredPlayers.sort((a, b) => {
    const aValue = a[1].profile?.[sortColumn] || a[1].stats?.[sortColumn] || '';
    const bValue = b[1].profile?.[sortColumn] || b[1].stats?.[sortColumn] || '';

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Pagination logic
  const totalItems = sortedPlayers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedPlayers.slice(startIndex, startIndex + itemsPerPage);
  

  // Dashboard Data to Excel Logic
  const generateExcelFile = (filteredPlayers) => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Players Data');
  
    // Set header row
    const headerRow = worksheet.addRow([
      'Name',
      'History of Computer',
      'Elements of Computer System',
      'Number System',
      'Introduction to Programming',
    ]);
  
    // Set header row font, background color, height, alignment, and font color
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } }; // Set font color to white
    headerRow.height = 30; // Set the height of the header row
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0000FF' }, // Keep the background color blue
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' }; // Keep the middle alignment
    });
  
    // Add data rows
    filteredPlayers.forEach(player => {
      worksheet.addRow([
        player.profile?.name || 'N/A',
        player.stats?.computerHistory || 'N/A',
        player.stats?.computerElements || 'N/A',
        player.stats?.numberSystem || 'N/A',
        player.stats?.introProgramming || 'N/A',
      ]);
    });
  
    //Set column widths
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 }, // Increased width to 30
      { header: 'History of Computer', key: 'computerHistory', width: 40 }, // Increased width to 40
      { header: 'Elements of Computer System', key: 'computerElements', width: 50 }, // Increased width to 50
      { header: 'Number System', key: 'numberSystem', width: 30 }, // Increased width to 30
      { header: 'Introduction to Programming', key: 'introProgramming', width: 50 }, // Increased width to 50
    ];
  
    // Save the workbook to a file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'players_data.xlsx';
      a.click();
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Input Field */}
      <h1 className="text-2xl font-bold mb-4">Classroom: {classroomID}</h1>
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

      {/* Pagination */}
      <div className="mt-4 flex-row lg:flex lg:justify-between pb-4">
        {/* Items per Page Dropdown */}
        <div className="flex lg:block items-center">
          <label htmlFor="itemsPerPage" className="mr-2">Items per Page:</label>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton 
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40" id='itemsPerPage'
              disabled={currentItems.length === 0}
              >
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

          {/* Export to Excel Button for Phone*/}
          <button 
            onClick={() => generateExcelFile(filteredPlayers)}
            className="lg:hidden ml-2  text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 inline-flex flex-1 justify-center items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-blue-800">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            <span>Export Dashboard Data</span>
          </button>
        </div>
        
      <div className="lg:flex lg:gap-4 lg:divide-x">
          {/* Export to Excel Button for Bigger Screen*/}
          <button 
            onClick={() => generateExcelFile(filteredPlayers)}
            className="hidden lg:flex text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-blue-800">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            <span>Export Dashboard Data</span>
          </button>

          {/* Export All Activity by Date */}
          {players && <ExportToExcelButton players={players} />}
        </div>
      </div>
     
      {/* Table */}
      {currentItems.length > 0 ? (
      <div className="relative overflow-x-auto shadow-md lg:rounded-lg">
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
            {currentItems.map(([playerId, player]) => (
              <tr
                key={playerId}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {player.profile?.name || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {player.stats?.computerHistory || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {player.stats?.computerElements || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {player.stats?.numberSystem || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  {player.stats?.introProgramming || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                      onClick={() => openModal(player)}
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-600"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => openActivityModal(player)}
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
      ) : (
        <p className="text-center text-gray-500">No player&apos;s data available</p>
      )}

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>
            {totalPages === 0 ? 'Page 0 of 0' : `Page ${currentPage} of ${totalPages}`}
          </span>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || filteredPlayers.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || filteredPlayers.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedPlayer && (
        <Modal onClose={closeModal}>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedPlayer.profile?.username || 'Player'} Details</h2>

            <h3 className="text-xl font-semibold mb-2">In-Game Profile</h3>
            <table className="min-w-full mb-4 border border-gray-300">
              <tbody>
                <tr><td className="px-4 py-2 border">Name:</td><td className="px-4 py-2 border">{selectedPlayer.profile?.name || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Username:</td><td className="px-4 py-2 border">{selectedPlayer.profile?.username || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Age:</td><td className="px-4 py-2 border">{selectedPlayer.profile?.age || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Gender:</td><td className="px-4 py-2 border">{selectedPlayer.profile?.gender || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Player ID:</td><td className="px-4 py-2 border">{selectedPlayer.profile?.playerId || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Avatar:</td><td className="px-4 py-2 border">{selectedPlayer.profile?.avatar || 'N/A'}</td></tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold mb-2">In-Game Statistics</h3>
            <table className="min-w-full mb-4 border border-gray-300">
              <tbody>
                <tr><td className="px-4 py-2 border">Computer History:</td><td className="px-4 py-2 border">{selectedPlayer.stats?.computerHistory || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Computer Elements:</td><td className="px-4 py-2 border">{selectedPlayer.stats?.computerElements || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Number System:</td><td className="px-4 py-2 border">{selectedPlayer.stats?.numberSystem || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Introduction to Programming:</td><td className="px-4 py-2 border">{selectedPlayer.stats?.introProgramming || 'N/A'}</td></tr>
                <tr><td className="px-4 py-2 border">Unlocked Introduction to Programming:</td><td className="px-4 py-2 border">{selectedPlayer.stats?.isIntroProgrammingUnlocked ? 'Yes' : 'No'}</td></tr>
                <tr><td className="px-4 py-2 border">Unlocked Number System:</td><td className="px-4 py-2 border">{selectedPlayer.stats?.isNumberSystemUnlocked ? 'Yes' : 'No'}</td></tr>
              </tbody>
            </table>
          </div>
        </Modal>  
      )}

      {/* Activity Modal */}
      {isActivityModalOpen && selectedPlayer && (
        <ActivityModal
          onClose={closeActivityModal}
          selectedUser={selectedPlayer}
        />
      )}
    </div>
  );
}

export default ClassroomPage;
