import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import { useTasks } from "../../context/TaskContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Analytics = () => {
  const { allTasks: tasks, loadAllTasks } = useTasks();
  const chartRef = useRef(null);

  useEffect(() => {
    loadAllTasks();
  }, [loadAllTasks]);

  const stats = {
    Pending: (tasks || []).filter(t => t.status === "Pending").length,
    "In Progress": (tasks || []).filter(t => t.status === "In Progress").length,
    Completed: (tasks || []).filter(t => t.status === "Completed").length
  };

  const data = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: "Tasks",
        data: Object.values(stats),
        backgroundColor: ["#ffc107", "#0d6efd", "#198754"]
      }
    ]
  };

  useEffect(() => {
    const chart = chartRef.current;

    return () => {
      if (chart) chart.destroy();
    };
  }, []);

  return (
    <>
      <h3>Analytics</h3>
      <Bar ref={chartRef} data={data} />
    </>
  );
};

export default Analytics;
