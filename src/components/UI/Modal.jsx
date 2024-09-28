import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden bg-black bg-opacity-50 px-4">
      <div className="relative bg-white rounded-lg shadow-lg w-fit overflow-x-auto overflow-y-auto">
        {/* Modal close button */}
        <div className="sticky left-2 justify-end p-4">
          <button
            onClick={onClose}
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm pl-6 pr-6 py-3 mb-2 items-center"
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