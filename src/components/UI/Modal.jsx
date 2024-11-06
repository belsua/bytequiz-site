import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ onClose, children, headerText = '' }) => {
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden bg-black bg-opacity-50 px-4"
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-fit overflow-x-auto overflow-y-auto">
        {/* Modal header with title and close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{headerText}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faTimes} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal content with scroll */}
        <div className="p-6 flex-wrap overflow-x-auto overflow-y-auto max-h-[60vh] w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;