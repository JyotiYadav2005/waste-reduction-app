import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WasteChart = () => {
  const [data, setData] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "wasteData"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chartData = {};
      let totalWaste = 0;

      snapshot.forEach((doc) => {
        const { wasteType, amount } = doc.data();
        chartData[wasteType] = (chartData[wasteType] || 0) + amount;
        totalWaste += amount;
      });

      const formattedData = Object.keys(chartData).map((type) => ({
        wasteType: type,
        amount: chartData[type],
      }));

      setData(formattedData);
      generateInsights(chartData, totalWaste);
    });

    return () => unsubscribe();
  }, []);

  // Generate insights based on waste data
  const generateInsights = (wasteData, totalWaste) => {
    const newInsights = [];

    if (wasteData["Plastic"] > 5) {
      newInsights.push(
        "You generate a lot of plastic waste. Try using reusable bottles and bags."
      );
    }
    if (wasteData["Organic"] > 5) {
      newInsights.push(
        "Consider composting your organic waste to reduce landfill impact."
      );
    }
    if (wasteData["Metal"] > 3) {
      newInsights.push(
        "Recycling metal can save energy. Look for local recycling programs."
      );
    }
    if (totalWaste > 10) {
      newInsights.push(
        "You have a high waste output. Try reducing single-use items."
      );
    }

    setInsights(newInsights);
  };

  return (
    <Paper elevation={2} sx={{ padding: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Waste Statistics
      </Typography>
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="wasteType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Waste Reduction Insights */}
      <Typography variant="h6" fontWeight="bold" mt={3}>
        Waste Reduction Insights
      </Typography>
      {insights.length > 0 ? (
        <List>
          {insights.map((tip, index) => (
            <ListItem key={index}>
              <ListItemText primary={`✅ ${tip}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>
          No insights available yet. Log more waste to get recommendations!
        </Typography>
      )}
    </Paper>
  );
};

export default WasteChart;
