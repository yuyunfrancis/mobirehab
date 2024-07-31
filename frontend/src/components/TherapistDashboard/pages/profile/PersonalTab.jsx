import React from "react";
import Input from "../../../common/forms/Input";

const PersonalTab = ({ therapist, handleInputChange, handleAddressChange }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="First Name"
        value={therapist.firstName}
        onChange={(e) => handleInputChange("firstName", e.target.value)}
      />
      <Input
        labelText="Last Name"
        value={therapist.lastName}
        onChange={(e) => handleInputChange("lastName", e.target.value)}
      />
      <Input
        labelText="Email"
        type="email"
        value={therapist.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
      <Input
        labelText="Phone"
        type="tel"
        value={therapist.phoneNumber}
        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
      />
      <Input
        labelText="Gender"
        value={therapist.gender}
        onChange={(e) => handleInputChange("gender", e.target.value)}
      />
      <Input
        labelText="Country"
        value={therapist.address.country}
        onChange={(e) => handleAddressChange("country", e.target.value)}
      />
      <Input
        labelText="City"
        value={therapist.address.city}
        onChange={(e) => handleAddressChange("city", e.target.value)}
      />
      <Input
        labelText="District"
        value={therapist.address.district}
        onChange={(e) => handleAddressChange("district", e.target.value)}
      />
      <Input
        labelText="Street"
        value={therapist.address.street}
        onChange={(e) => handleAddressChange("street", e.target.value)}
      />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-800">About</h3>
      <Input
        labelText="Bio"
        value={therapist.bio}
        onChange={(e) => handleInputChange("bio", e.target.value)}
        component="textarea"
      />
    </div>
  </div>
);

export default PersonalTab;
