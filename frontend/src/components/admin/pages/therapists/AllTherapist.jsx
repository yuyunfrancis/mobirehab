import React, { useState } from "react";

const therapists = [
  {
    _id: "667549c161ea82da42c3f61c",
    firstName: "Berinyuy",
    lastName: "Yuyun",
    email: "francisyuyun04@gmail.com",
    phoneNumber: "673993113",
    profession: "Doctor",
    specialization: "Occupational Therapist",
    isVerified: true,
    profilePicture:
      "https://res.cloudinary.com/da0fkowyd/image/upload/v1718962624/therapistProfilePictures/ylntgzysbwvjtn4b2pom.jpg",
    createdAt: "2024-06-21T09:37:05.816Z",
  },
  // Add more mock data as needed
];

const AllTherapist = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTherapists = therapists.filter((therapist) =>
    `${therapist.firstName} ${therapist.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Therapists List</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search therapists..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">
                <input type="checkbox" className="form-checkbox" />
              </th>
              <th className="py-3 px-6 text-left">Profile</th>
              <th className="py-3 px-6 text-left">Full Name</th>
              <th className="py-3 px-6 text-left">Signup Date</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredTherapists.map((therapist) => (
              <tr
                key={therapist._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <img
                        src={therapist.profilePicture}
                        alt={`${therapist.firstName} ${therapist.lastName}`}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  {therapist.firstName} {therapist.lastName}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(therapist.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      therapist.isVerified
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {therapist.isVerified ? "Verified" : "Not Verified"}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <a
                    href={`/therapist/${therapist._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTherapist;
