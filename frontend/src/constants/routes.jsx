export const patientRoutes = [
  { path: "/patient/", name: "Dashboard" },
  { path: "/patient/therapist-list", name: "Therapists" },
  { path: "/patient/appointments", name: "Appointments" },
  { path: "/patient/profile", name: "Profile" },
  { path: "/patient/settings", name: "Settings" },

  // {
  //   path: "/",
  //   name: "Dashboard",
  //   icon: "home",
  //   exact: true,
  // },
  // {
  //   path: "/patient/profile",
  //   name: "Profile",
  //   icon: "user",
  // },
  // {
  //   path: "/patient/appointments",
  //   name: "Appointments",
  //   icon: "calendar",
  // },
];

export const therapistRoutes = [
  { path: "/therapist/", name: "Dashboard" },
  { path: "/therapist/availability", name: "Availability" },
  { path: "/therapist/appointments", name: "Appointments" },
  // { path: "/therapist/settings", name: "Settings" },
  // { path: "/therapist/profile", name: "Profile" },
];
