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
    navigate("/patient/book-appointment", {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-start mb-8">Our Therapists</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search therapists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>
      <AnimatePresence>
        {filteredTherapists.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
          <motion.p
            className="text-center text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No therapists found. Please try a different search or filter.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TherapistList;
