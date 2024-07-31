import React from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../../../context/UserContext";

const PatientProfile = ({ patient, darkMode }) => {
  const { currentUser } = React.useContext(UserContext);

  //   console.log(currentUser);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md p-6`}
    >
      <div className="flex items-center mb-4">
        {currentUser?.data?.user?.profilePicture ? (
          <img
            src={currentUser?.data?.user?.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
        ) : (
          <div className="w-20 h-20 rounded-full mr-4 bg-gray-300 flex items-center justify-center text-2xl font-semibold">
            {currentUser?.data?.user?.firstName.charAt(0)}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">{`${currentUser?.data?.user?.firstName} ${currentUser?.data?.user?.lastName}`}</h2>
          <p className="text-lg text-gray-500">{`${currentUser?.data?.user?.address?.city}, ${currentUser?.data?.user?.address?.country}`}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-100 rounded-lg">
          <p className="font-semibold">Age</p>
          <p className="text-xl">
            {(() => {
              const today = new Date();
              const birthDate = new Date(currentUser?.data?.user?.dateOfBirth);
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();

              if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
              ) {
                age--;
              }

              return age;
            })()}
          </p>
        </div>
        <div className="text-center p-3 bg-green-100 rounded-lg">
          <p className="font-semibold">Blood Type</p>
          <p className="text-xl">{patient.bloodType}</p>
        </div>
        <div className="text-center p-3 bg-yellow-100 rounded-lg">
          <p className="font-semibold">Height</p>
          <p className="text-xl">{patient.height} cm</p>
        </div>
        <div className="text-center p-3 bg-red-100 rounded-lg">
          <p className="font-semibold">Weight</p>
          <p className="text-xl">{patient.weight} kg</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientProfile;
