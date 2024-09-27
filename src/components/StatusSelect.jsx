import React, { useState } from "react";

const StatusSelect = () => {
  const [status, setStatus] = useState("Active");
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: "Active", color: "#10B981" },
    { value: "Away", color: "#F59E0B" },
    { value: "Do not disturb", color: "#EF4444" },
  ];

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsOpen(false);
  };

  const CircleIcon = ({ color }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8" fill={color} />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            <CircleIcon
              color={statusOptions.find((opt) => opt.value === status).color}
            />
            <span className="ml-2 truncate">{status}</span>
          </span>
          <ChevronDownIcon />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                onClick={() => handleStatusChange(option.value)}
              >
                <CircleIcon color={option.color} />
                <span className="ml-3 truncate">{option.value}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSelect;
