import React from "react";

const TherapistCard = ({ therapist }) => {
  return (
    <div className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <img
          src={therapist.profilePicture || "https://via.placeholder.com/80"}
          alt={therapist.fullName}
          className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-indigo-200"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {therapist.fullName}
          </h3>
          <p className="text-sm text-indigo-600 font-medium mb-2">
            {therapist.specialties}
          </p>
          {/* <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(therapist.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600 font-medium">
              {therapist.rating.toFixed(1)} ({therapist.reviewCount} reviews)
            </span>
          </div> */}
        </div>
      </div>
      {/* <p className="text-gray-600 text-sm">{therapist.bio}</p> */}
    </div>
  );
};

export default TherapistCard;
