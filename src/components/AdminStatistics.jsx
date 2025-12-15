import React, { useEffect, useState } from "react";
import "./AdminStatistics.css";

const AdminStatistics = () => {
  const [todayVisits, setTodayVisits] = useState(null);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  useEffect(() => {
    fetchTodayVisits();
  }, []);

  const fetchTodayVisits = async () => {
    try {
      const res = await fetch("/api/daily-visits", {
        credentials: "include",
      });
      const data = await res.json();

      const todayData = data.result?.find((v) => v.date === today);

      setTodayVisits(todayData?.count || 0);
    } catch (err) {
      console.error("Failed to fetch daily visits", err);
      setTodayVisits(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-statistics">
      <h1>Today's Visits</h1>
      <p className="date">{today}</p>
      <div className="visit-count">{todayVisits}</div>
    </div>
  );
};

export default AdminStatistics;
