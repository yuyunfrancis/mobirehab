import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import AvailabilityDayPicker from "../../../common/widgets/Calender";
import useDataFetching from "../../../../hooks/useFech";
import Loading from "../../../utilities/Loading";
import AvailableTimeSlots from "../../../common/widgets/TimeSlots";
import { UserContext } from "../../../../context/UserContext";
import Input from "../../../common/forms/Input";
import TherapistCard from "../../../features/cards/SmallCard";
import toast from "react-hot-toast";
import api from "../../../../utils/api";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { therapist } = location.state;
  const { currentUser } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [load, setLoad] = useState(false);
  const [formattedData, setFormattedData] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    purpose: "",
  });
  const [loading, error, data, fetchData] = useDataFetching(
    `/therapist/availability/${therapist.id}`
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data && data.status === "success" && data.activeAvailability) {
      const formattedAvailabilities =
        data.activeAvailability.availabilities.map((availability) => ({
          date: moment(availability.date).format("YYYY-MM-DD"),
          times: availability.times,
        }));
      setFormattedData({ availabilities: formattedAvailabilities });
    }
  }, [data]);

  useEffect(() => {
    const pendingBooking = localStorage.getItem("pendingBooking");
    if (pendingBooking && formattedData) {
      const { therapistId, date, time } = JSON.parse(pendingBooking);
      updateAvailability(therapistId, date, time).then(() => {
        updateLocalAvailability(date, time);
        localStorage.removeItem("pendingBooking");
        toast.success("Payment successful. Appointment booked.");
        navigate("/patient/payment-success-page");
      });
    }
  }, [formattedData]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTime(time);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateAvailability = async (therapistId, date, time) => {
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const formattedTime = time.length === 4 ? `0${time}` : time; // Ensure time is in HH:MM format
      await api.put(
        `/therapist/availability/${therapistId}`,
        {
          date: formattedDate,
          time: formattedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(
        "Error updating availability:",
        error.response?.data?.message || error.message
      );
    }
  };

  const updateLocalAvailability = (date, time) => {
    if (!formattedData) return;

    const updatedAvailabilities = formattedData.availabilities.map(
      (availability) => {
        if (availability.date === date) {
          return {
            ...availability,
            times: availability.times.map((t) => {
              if (t.time === time) {
                return { ...t, isActive: false };
              }
              return t;
            }),
          };
        }
        return availability;
      }
    );

    setFormattedData({ availabilities: updatedAvailabilities });
  };

  const bookAppointment = async () => {
    try {
      setLoad(true);
      const response = await api.post(
        "/patient/appointments",
        {
          therapist: therapist.id,
          date: moment(selectedDate).format("YYYY-MM-DD"),
          time: selectedTime?.time,
          service: formData.service,
          purpose: formData.purpose,
          paymentDetails: {
            amount: 5000,
            currency: "RWF",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data.paymentResponse &&
        response.data.paymentResponse.meta.authorization.redirect
      ) {
        localStorage.setItem(
          "pendingBooking",
          JSON.stringify({
            therapistId: therapist.id,
            date: moment(selectedDate).format("YYYY-MM-DD"),
            time: selectedTime?.time,
          })
        );

        window.location.href =
          response.data.paymentResponse.meta.authorization.redirect;
      } else {
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        const formattedTime =
          selectedTime?.time.length === 4
            ? `0${selectedTime?.time}`
            : selectedTime?.time;
        await updateAvailability(therapist.id, formattedDate, formattedTime);
        updateLocalAvailability(formattedDate, formattedTime);
        toast.success("Appointment booked successfully");
        navigate("/patient/payment-success-page");
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      toast.error(err.response?.data?.message || "Error booking appointment");
    } finally {
      setLoad(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedDate ||
      !selectedTime ||
      !formData.service ||
      !formData.purpose
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    await bookAppointment();
  };

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Book an Appointment
        </h1>
        <TherapistCard therapist={therapist} />
      </div>
      {formattedData && formattedData.availabilities && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Select Date and Time
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <AvailabilityDayPicker
                  availabilities={formattedData.availabilities}
                  onDateClick={handleDateClick}
                />
              </div>
              <div className="md:w-1/2">
                {selectedDate ? (
                  <AvailableTimeSlots
                    selectedDate={selectedDate}
                    availabilities={formattedData.availabilities}
                    onTimeSlotSelect={handleTimeSlotSelect}
                  />
                ) : (
                  <p className="text-gray-500 italic">
                    Please select a date first
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Appointment Details
            </h2>
            <div className="space-y-4">
              <Input
                handleChange={handleChange}
                value={formData.service}
                labelText="Service"
                labelFor="service"
                id="service"
                name="service"
                type="text"
                isRequired={true}
                placeholder="Type of service"
              />
              <Input
                handleChange={handleChange}
                value={formData.purpose}
                labelText="Purpose"
                labelFor="purpose"
                id="purpose"
                name="purpose"
                isRequired={true}
                placeholder="Reason for appointment"
                component="textarea"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold">5,000 RWF</p>
                <p className="text-sm opacity-75 mt-1">Appointment cost</p>
              </div>
              <div className="bg-white text-blue-600 py-2 px-4 rounded-full font-semibold">
                Secure Payment
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={load}
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg font-semibold transition duration-150 ease-in-out"
            >
              {load ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
