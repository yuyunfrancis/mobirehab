import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import {
  AiOutlineEllipsis,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BiPowerOff } from "react-icons/bi";
import { useAvailability } from "../../../../hooks/useAvailability";
import toast from "react-hot-toast";

const AvailabilityCard = ({ availability, onUpdate }) => {
  const { _id, availabilityName, date, times, isActive } = availability;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const {
    activateAvailability,
    deactivateAvailability,
    deleteAvailability,
    isLoading,
    error,
  } = useAvailability(onUpdate);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{availabilityName}</h2>
        <div className="relative" ref={dropdownRef}>
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-full hover:bg-gray-100"
            onClick={toggleDropdown}
          >
            <AiOutlineEllipsis className="w-5 h-5" />
          </button>
          <ActionDropdown
            show={showDropdown}
            onClose={() => setShowDropdown(false)}
            availabilityId={_id}
            isActive={isActive}
            onActivate={activateAvailability}
            onDeactivate={deactivateAvailability}
            onDelete={deleteAvailability}
          />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-gray-600">
          <span className="font-semibold">Date:</span>{" "}
          {moment(date).format("MMMM Do, YYYY")}
        </p>
        <div>
          <span className="font-semibold text-gray-700">Times:</span>
          <ul className="mt-2 space-y-1">
            {times.map((time, index) => (
              <li
                key={index}
                className="text-gray-600 bg-gray-100 rounded px-3 py-1 inline-block mr-2 mb-2"
              >
                {time.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
};

const ActionDropdown = ({
  show,
  onClose,
  availabilityId,
  isActive,
  onActivate,
  onDeactivate,
  onDelete,
}) => {
  if (!show) return null;

  const handleAction = async (action) => {
    try {
      await action(availabilityId);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      onClose();
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10">
      <button
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
        onClick={() => handleAction(isActive ? onDeactivate : onActivate)}
      >
        <BiPowerOff className="mr-2" />
        {isActive ? "Deactivate" : "Activate"}
      </button>
      <button
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
        onClick={onClose}
      >
        <AiOutlineEdit className="mr-2" />
        Edit
      </button>
      <button
        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full"
        onClick={() => handleAction(onDelete)}
      >
        <AiOutlineDelete className="mr-2" />
        Delete
      </button>
    </div>
  );
};

export default AvailabilityCard;
