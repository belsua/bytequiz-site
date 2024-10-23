// src/components/ExportToExcelButton.js
import React, { useState } from 'react';
import * as Excel from 'exceljs';

const ExportToExcelButton = ({ usersData }) => {
  const [date, setDate] = useState('');

  const handleExport = () => {
    if (!usersData || typeof usersData !== 'object') {
      console.error('usersData is not valid');
      return; // Exit the function if usersData is invalid
    }

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Activities Data');

    // Set header row
    const headerRow = worksheet.addRow([
      'Name',
      'Date-Time',
      'Minigame',
      'Mode',
      'Topic',
      'Score',
      'Players',
    ]);

    // Set header row font, background color, height, alignment, and font color
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.height = 30;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0000FF' },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Add data rows
    Object.keys(usersData).forEach((userId) => {
      const userActivities = usersData[userId]?.activities;
      if (!userActivities) {
        console.warn(`No activities found for user ID: ${userId}`);
        return;
      }
      Object.keys(userActivities).forEach((activityId) => {
        const activity = userActivities[activityId];
        const activityDate = new Date(activity['date-time']).getTime();
        const inputDate = new Date(date).getTime();
        if (activityDate >= inputDate && activityDate < inputDate + 86400000) {
          worksheet.addRow([
            usersData[userId].profile.name,
            activity['date-time'],
            activity.minigame || 'N/A',
            activity.mode || 'N/A',
            activity.topic || 'N/A',
            activity.score || 'N/A',
            activity.players ? activity.players.join(', ') : 'No players available',
          ]);
        }
      });
    });

    // Set column widths
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Date-Time', key: 'date-time', width: 20 },
      { header: 'Minigame', key: 'minigame', width: 20 },
      { header: 'Mode', key: 'mode', width: 20 },
      { header: 'Topic', key: 'topic', width: 30 },
      { header: 'Score', key: 'score', width: 15 },
      { header: 'Players', key: 'players', width: 30 },
    ];

    // Save the workbook to a file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'activities_data.xlsx';
      a.click();
    });
  };

  return (
    <div className="mt-4 lg:mt-0 grid justify-items-stretch lg:flex items-center gap-2 lg:pl-4">
        <label htmlFor="itemsPerPage" className="mr-2">Export Activity by Date:</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
                className="block w-full px-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Select date"
            />
        </div>
        
        <button 
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-600"
        >Export Activity</button>
    </div>
  );
};

export default ExportToExcelButton;