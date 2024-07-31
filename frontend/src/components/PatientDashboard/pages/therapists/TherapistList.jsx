import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TherapistCard from "./TherapistCard";
import useDataFetching from "../../../../hooks/useFech";
import Loading from "../../../utilities/Loading";

const TherapistList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [loading, error, data, fetchData] = useDataFetching(
    "/patient/therapists"
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.status === "success" && data.data) {
      const therapists = data.data.map((therapist) => ({
        id: therapist._id,
        fullName: `${therapist.firstName} ${therapist.lastName}`,
        city: therapist.address.city,
        country: therapist.address.country,
        profilePicture: therapist.profilePicture,
        bio: therapist.bio,
        specialties: [therapist.specialization],
      }));
      setFilteredTherapists(therapists);
    }
  }, [data]);

  const specialties = [
    "All",
    ...new Set(
      filteredTherapists.flatMap((therapist) => therapist.specialties)
    ),
  ];

  useEffect(() => {
    if (filteredTherapists.length > 0) {
      const filtered = filteredTherapists.filter(
        (therapist) =>
          therapist.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedSpecialty === "" ||
            selectedSpecialty === "All" ||
            therapist.specialties.includes(selectedSpecialty))
      );
      setFilteredTherapists(filtered);
    }
  }, [searchTerm, selectedSpecialty]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const handleBookAppointment = (therapist) => {
    navigate("/patient/appointments/book", {
      state: {
        therapist: {
          id: therapist.id,
          fullName: therapist.fullName,
          specialties: therapist.specialties,
          profilePicture: therapist.profilePicture,
          city: therapist.city,
          country: therapist.country,
          bio: therapist.bio,
        },
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Our Therapists
        </h1>
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search therapists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 pr-4 rounded-full border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="p-4 rounded-full border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none appearance-none bg-white"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
        <AnimatePresence>
          {filteredTherapists.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredTherapists.map((therapist) => (
                <motion.div
                  key={therapist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TherapistCard
                    therapist={therapist}
                    onViewProfile={() =>
                      console.log(`View profile of ${therapist.fullName}`)
                    }
                    onBookAppointment={() => handleBookAppointment(therapist)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-xl font-medium text-gray-900">
                No therapists found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TherapistList;
