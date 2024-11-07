import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

// Add a prop for the alert message
export function AlertCustomAnimation({ message }) {
  const [open, setOpen] = React.useState(true);
  const [shouldRender, setShouldRender] = React.useState(true);

  const closeAlert = () => {
    setOpen(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 300); // Match this duration with your CSS transition duration
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, 3000); // Automatically close after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Run once when the component mounts

  if (!shouldRender) return null; // Only render if shouldRender is true

  return (
    <div
      className={`fixed bg-black rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-xs p-2 transition-transform duration-300 ${open ? 'translate-y-100' : '-translate-y-1.5'}`} // Adjust translate-y for the animation
    >
      <div className="flex justify-between items-center gap-4 px-4">
        <span className="text-sm">{message}</span> {/* Use the message prop here */}
        <button onClick={closeAlert} className="flex items-center justify-center text-white hover:text-gray-800 text-3xl rounded-full">
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}