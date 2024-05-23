import React from "react";

const RequiredFiles = ({ formData, handleChange }) => (
  <div>
    <h2>Required Files</h2>
    <form>
      <label>
        File:
        <input type="file" name="file" onChange={handleChange} />
      </label>
    </form>
  </div>
);

export default RequiredFiles;
