import React from "react";
import useDataFetching from "../../../../hooks/useFech";

const Appointments = () => {
  const [loading, error, data, fetchData] = useDataFetching(
    "/patient/appointments"
  );

  // Handle loading state
  if (loading) {
    return <p>Loading data...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(data);
  return (
    <div>
      <h1>Appointments</h1>
      <p>Appointments page content</p>
    </div>
  );
};

export default Appointments;
