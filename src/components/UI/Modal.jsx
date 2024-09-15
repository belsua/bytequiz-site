// src/components/Modal.jsx
import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh]">
        {/* Modal close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            Close
          </button>
        </div>

        {/* Modal content with scroll */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
