import React from "react";
import { FaLock, FaTrash } from "react-icons/fa";
import Input from "../../../common/forms/Input";
import Button from "../../../common/Button";

const SecurityTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-greenPrimary flex items-center">
          <FaLock className="mr-2" /> Change Password
        </h3>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Current Password"
            labelText="Current Password"
            id="currentPassword"
            name="currentPassword"
          />
          <Input
            type="password"
            placeholder="New Password"
            labelText="New Password"
            id="newPassword"
            name="newPassword"
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            labelText="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <Button
            label="Change Password"
            onClick={() => {
              /* Change password logic */
            }}
            icon={<FaLock className="mr-2" />}
          />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-greenPrimary flex items-center">
          <FaLock className="mr-2" /> Two-Factor Authentication
        </h3>
        <Button
          label="Enable Two-Factor Authentication"
          onClick={() => {
            /* Enable 2FA logic */
          }}
          icon={<FaLock className="mr-2" />}
          color="green-600"
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
          <FaTrash className="mr-2" /> Delete Account
        </h3>
        <p className="text-gray-600 mb-4">
          Warning: This action is irreversible. All your data will be
          permanently deleted.
        </p>
        <Button
          label="Delete Account"
          onClick={() => {
            /* Delete account logic */
          }}
          icon={<FaTrash className="mr-2" />}
          color="red-600"
        />
      </div>
    </div>
  );
};

export default SecurityTab;
