import React from "react";
import { motion } from "framer-motion";

const PerformanceMetrics = ({ therapistId }) => {
  // Mock data (replace with actual data fetching logic)
  const metrics = {
    totalAppointments: 150,
    totalIncome: 5000.0,
    averageRating: 4.8,
    completionRate: 0.95,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <MetricCard
        title="Total Appointments"
        value={metrics.totalAppointments}
        icon="fa-calendar-check"
        color="bg-blue-500"
      />
      <MetricCard
        title="Total Income"
        value={`$${metrics.totalIncome.toFixed(2)}`}
        icon="fa-dollar-sign"
        color="bg-green-500"
      />
      <MetricCard
        title="Average Rating"
        value={metrics.averageRating.toFixed(1)}
        icon="fa-star"
        color="bg-yellow-500"
      />
      <MetricCard
        title="Completion Rate"
        value={`${(metrics.completionRate * 100).toFixed(1)}%`}
        icon="fa-check-circle"
        color="bg-purple-500"
      />
    </motion.div>
  );
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const MetricCard = ({ title, value, icon, color }) => (
  <motion.div
    variants={itemVariants}
    className={`${color} rounded-lg shadow-lg p-6 text-white`}
    whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="text-4xl opacity-80">
        <i className={`fas ${icon}`}></i>
      </div>
    </div>
  </motion.div>
);

export default PerformanceMetrics;
