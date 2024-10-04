import React, { useState } from 'react';
import Modal from './Modal';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import * as Excel from 'exceljs';

const ActivityModal = ({ onClose, selectedUser, ...props }) => {
  const [searchDate, setSearchDate] = React.useState('');
  const [selectedMode, setSelectedMode] = React.useState('');
  const [selectedTopic, setSelectedTopic] = React.useState('');
  const [selectedMinigame, setSelectedMinigame] = React.useState('');
  const [sortActivityOrder, setActivitySortOrder] = React.useState('desc');
  const [sortActivityColumn, setActivitySortColumn] = React.useState('date-time');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [selectedActivityId, setSelectedActivityId] = React.useState(null);
  const [isActivityDetailsModalOpen, setIsActivityDetailsModalOpen] = React.useState(false);
  
  const filteredActivities = Object.entries(selectedUser.activities)
  .filter(([activityId, activity]) => {
    const activityDate = new Date(activity['date-time']).toISOString().split('T')[0];
    return (
      (searchDate ? activityDate === searchDate : true) &&
      (selectedMode ? activity.mode === selectedMode : true) &&
      (selectedTopic ? activity.topic === selectedTopic : true) &&
      (selectedMinigame ? activity.minigame === selectedMinigame : true)
    );
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedActivities = filteredActivities
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortActivityColumn) {
        case 'date-time':
          aValue = new Date(a[1][sortActivityColumn]).getTime();
          bValue = new Date(b[1][sortActivityColumn]).getTime();
          break;
        case 'minigame':
        case 'mode':
        case 'topic':
          aValue = a[1][sortActivityColumn] || '';
          bValue = b[1][sortActivityColumn] || '';
          break;
        case 'score':
          aValue = parseInt(a[1][sortActivityColumn], 10) || 0;
          bValue = parseInt(b[1][sortActivityColumn], 10) || 0;
          break;
        case 'players':
          aValue = a[1][sortActivityColumn] ? a[1][sortActivityColumn].length : 0;
          bValue = b[1][sortActivityColumn] ? b[1][sortActivityColumn].length : 0;
          break;
        default:
          aValue = a[1][sortActivityColumn] || '';
          bValue = b[1][sortActivityColumn] || '';
      }

      if (aValue < bValue) return sortActivityOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortActivityOrder === 'asc' ? 1 : -1;
      return 0;
    })
    .slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generateActivityExcelFile = (filteredActivities) => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Activity Data');
  
    // Set header row
    const headerRow = worksheet.addRow([
      'Date-Time',
      'Minigame',
      'Mode',
      'Topic',
      'Score',
      'Players',
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
    filteredActivities.forEach(([activityId, activity]) => {
      worksheet.addRow([
        activity['date-time'],
        activity.minigame || 'N/A',
        activity.mode || 'N/A',
        activity.topic || 'N/A',
        activity.score || 'N/A',
        activity.players ? activity.players.join(', ') : 'No players available',
      ]);
    });
  
    // Set column widths
    worksheet.columns = [
      { header: 'Date-Time', key: 'date-time', width: 20 },
      { header: 'Minigame', key: 'minigame', width: 15 },
      { header: 'Mode', key: 'mode', width: 10 },
      { header: 'Topic', key: 'topic', width: 20 },
      { header: 'Score', key: 'score', width: 10 },
      { header: 'Players', key: 'players', width: 30 },
    ];
  
    // Save the workbook to a file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'activity_data.xlsx';
      a.click();
    });
  };

  // const handleItemsPerPageChange = (event) => {
  //   setItemsPerPage(parseInt(event.target.value, 10));
  //   setCurrentPage(1);
  // };

  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handleActivitySort = (column) => {
    const isAsc = sortActivityColumn === column && sortActivityOrder === 'asc';
    setActivitySortColumn(column);
    setActivitySortOrder(isAsc ? 'desc' : 'asc');
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };


  const handleMinigameChange = (minigame) => {
    setSelectedMinigame(minigame);
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handleViewActivityQuestion = (activityId) => {
    setSelectedActivityId(activityId);
    setIsActivityDetailsModalOpen(true);
  };

  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-lg shadow-lg container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">{selectedUser.profile?.username || 'Player'} Activity Details </h2>

        <form className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date-search">
            Search by Date:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="date"
              id="date-search"
              value={searchDate}
              onChange={handleSearchChange}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Select date"
            />
          </div>    
        </form>

        <div className="mb-4 flex-row lg:flex items-center lg:space-x-4">
          <div className="grid grid-flow-col justify-stretch space-x-4 lg:flex lg:space-x-4">
            <div className="grid justify-items-stretch lg:flex items-center">
              <label htmlFor="itemsPerPage" className="mr-2">Items per Page:</label>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton 
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
                    disabled={paginatedActivities.length === 0}
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
                            setCurrentPage(1);
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

            <div className="grid justify-items-stretch lg:flex items-center">
              <label htmlFor="mode" className="mr-2">Filter by Mode:</label>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {selectedMode || 'All Modes'}
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
                        onClick={() => handleModeChange('')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        All Modes
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleModeChange('Multiplayer')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Multiplayer
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleModeChange('Singleplayer')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Singleplayer
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
          
          <div className="grid grid-flow-col justify-stretch space-x-4 lg:flex lg:space-x-4">
            <div className="grid justify-items-stretch mt-2 lg:mt-0 lg:flex items-center">
              <label htmlFor="topic" className="mr-2">Filter by Topic:</label>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {selectedTopic || 'All Topics'}
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
                        onClick={() => handleTopicChange('')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        All Topics
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleTopicChange('History of Computer')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        History of Computer
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleTopicChange('Elements of Computer System')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Elements of Computer System
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleTopicChange('Number System')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Number System
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleTopicChange('Intro to Programming')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Introduction to Programming
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>

            <div className="grid justify-items-stretch mt-2 lg:mt-0 lg:flex items-center">
              <label htmlFor="minigame" className="mr-2">Filter by Minigame:</label>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {selectedMinigame || 'All Minigames'}
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
                        onClick={() => handleMinigameChange('')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        All Minigames
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleMinigameChange('Runner')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Runner
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleMinigameChange('Trivia Showdown')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Trivia Showdown
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleMinigameChange('Territory Conquest')}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Territory Conquest
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <div className="grid grid-flow-col justify-stretch space-x-4 lg:border-l-2 mt-4 lg:mt-0 lg:flex">
            <button
              onClick={() => generateActivityExcelFile(filteredActivities)}
              className="lg:ml-4  text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 inline-flex flex-1 justify-center items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-blue-800">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
              Export Activity Data
            </button>
          </div>
        </div>

        {paginatedActivities.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md lg:rounded-lg">
          <table className="w-full mb-4 border border-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  onClick={() => handleActivitySort('date-time')}
                  className="px-4 py-2 cursor-pointer"
                >
                  Date-Time {sortActivityColumn === 'date-time' ? (sortActivityOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleActivitySort('minigame')}
                  className="px-4 py-2 cursor-pointer"
                >
                  Minigame {sortActivityColumn === 'minigame' ? (sortActivityOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleActivitySort('mode')}
                  className="px-4 py-2 cursor-pointer"
                >
                  Mode {sortActivityColumn === 'mode' ? (sortActivityOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleActivitySort('topic')}
                  className="px-4 py-2 cursor-pointer"
                >
                  Topic {sortActivityColumn === 'topic' ? (sortActivityOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleActivitySort('score')}
                  className="px-4 py-2 cursor-pointer"
                >
                  Score {sortActivityColumn === 'score' ? (sortActivityOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th
                  onClick={() => handleActivitySort('players')}
                  className="px-4 py-2 cursor-pointer"
                >
                  Players {sortActivityColumn === 'players' ? (sortActivityOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedActivities.map(([activityId, activity]) => (
                <tr key={activityId} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border">{activity['date-time']}</td>
                  <td className="px-4 py-2 border">{activity.minigame || 'N/A'}</td>
                  <td className="px-4 py-2 border">{activity.mode || 'N/A'}</td>
                  <td className="px-4 py-2 border">{activity.topic || 'N/A'}</td>
                  <td className="px-4 py-2 border">{activity.score || 'N/A'}</td>
                  <td className="px-4 py-2 border">{activity.players ? activity.players.join(', ') : 'No players available'}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleViewActivityQuestion(activityId)}
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-600"
                    >
                      View Activity Question
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No activities data available</p>
      )}
      </div>

      {isActivityDetailsModalOpen && (
        <ActivityDetailsModal
          onClose={() => setIsActivityDetailsModalOpen(false)}
          activityId={selectedActivityId}
          selectedUser={selectedUser}
        />
      )}

      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>
            {totalPages === 0 ? 'Page 0 of 0' : `Page ${currentPage} of ${totalPages}`}
          </span>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || paginatedActivities.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || paginatedActivities.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ActivityDetailsModal = ({ onClose, activityId, selectedUser }) => {
  const activity = selectedUser.activities[activityId];

  if (!activity || !activity.questions) {
    return (
      <Modal onClose={onClose}>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Activity Details</h2>
          <p>No available question data</p>
        </div>
      </Modal>
    );
  }

  const isRunnerMinigame = activity.minigame === 'Runner';

  return (
    <Modal onClose={onClose}>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4 mt-4 px-4">Activity Details</h2>

        <table className="w-full mb-4 border border-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-2">Question</th>
              <th className="px-4 py-2">{isRunnerMinigame ? 'Wrong Attempts' : 'Point'}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(activity.questions).map(([questionId, question]) => (
              <tr key={questionId} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2 border">{question.question}</td>
                <td className={`px-4 py-2 border ${
                      isRunnerMinigame ? (question.attempts === 0 ? 'text-green-600' : 'text-red-600') : 
                      (question.correct ? 'text-green-600' : 'text-red-600')
                    }`}>
                  {isRunnerMinigame ? question.attempts : (question.correct ? 'Correct' : 'Wrong')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default ActivityModal;