import React, { useState } from "react";
import moment from "moment";
import api from "../../../../utils/api";
import toast from "react-hot-toast";
import AvailabilityDayPicker from "../../../common/widgets/AvailabilityDayPicker";

const CreateAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [availabilityName, setAvailabilityName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, ""]);
  };

  const handleTimeChange = (index, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index] = value;
    setTimeSlots(updatedTimeSlots);
  };

  const removeTimeSlot = (index) => {
    const updatedTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedTimeSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !timeSlots.length || !availabilityName) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const formattedDate = moment(selectedDate).startOf("day").toDate();
      await api.post("/therapist/availability", {
        date: formattedDate,
        times: timeSlots,
        availabilityName,
      });

      toast.success("Availability created successfully");
      setSelectedDate(null);
      setTimeSlots([]);
      setAvailabilityName("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create Availability
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Select Date
          </h2>
          <AvailabilityDayPicker onDateClick={handleDateClick} />
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Availability Name
          </h2>
          <input
            type="text"
            value={availabilityName}
            onChange={(e) => setAvailabilityName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter availability name"
          />
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Time Slots
          </h2>
          {timeSlots.map((timeSlot, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="time"
                value={timeSlot}
                onChange={(e) => handleTimeChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              <button
                type="button"
                onClick={() => removeTimeSlot(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeSlot}
            className="mt-4 bg-blue-500 text-white rounded-lg p-2"
          >
            Add Time Slot
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 text-right">
          <button
            type="submit"
            className={`${
              loading ? "bg-gray-400" : "bg-blue-500"
            } text-white rounded-lg p-2`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAvailability;
