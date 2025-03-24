import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, Paper, Box } from "@mui/material";

const WasteChart = () => {
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "wasteData"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rawData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      // **Group waste data by type**
      const groupedData = rawData.reduce((acc, entry) => {
        const { wasteType, amount } = entry;
        if (!acc[wasteType]) {
          acc[wasteType] = { wasteType, amount: 0 };
        }
        acc[wasteType].amount += amount;
        return acc;
      }, {});

      setWasteData(Object.values(groupedData)); // Convert object to array for Recharts
    });

    return () => unsubscribe();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Your Waste Statistics
      </Typography>
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={wasteData}>
            <XAxis dataKey="wasteType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default WasteChart;
