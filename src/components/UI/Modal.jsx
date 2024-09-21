import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-fit overflow-x-auto overflow-y-auto">
        {/* Modal close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 me-2 mb-2"
          >
            Close
          </button>
        </div>

        {/* Modal content with scroll */}
        <div className="p-6 flex-wrap overflow-x-auto overflow-y-auto max-h-[60vh] w-fit">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;