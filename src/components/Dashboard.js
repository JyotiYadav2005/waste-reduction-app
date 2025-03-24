import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import WasteChart from "./WasteChart";
import LogActivity from "./LogActivity";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, collection, query, where, onSnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [view, setView] = useState("chart");
  const [points, setPoints] = useState(0);
  const [totalWaste, setTotalWaste] = useState(0);
  const [wasteBreakdown, setWasteBreakdown] = useState({});
  const [insights, setInsights] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // **Real-time listener for user points**
    const userRef = doc(db, "users", user.uid);
    const unsubscribeUser = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setPoints(docSnap.data().points || 0);
      }
    });

    // **Real-time listener for total waste logged & breakdown**
    const q = query(
      collection(db, "wasteData"),
      where("userId", "==", user.uid)
    );
    const unsubscribeWaste = onSnapshot(q, (snapshot) => {
      let total = 0;
      let breakdown = { Plastic: 0, Organic: 0, Metal: 0 };

      snapshot.docs.forEach((doc) => {
        const { amount, wasteType } = doc.data();
        total += amount;
        breakdown[wasteType] = (breakdown[wasteType] || 0) + amount;
      });

      setTotalWaste(total);
      setWasteBreakdown(breakdown);
      generateInsights(total, breakdown);
    });

    return () => {
      unsubscribeUser();
      unsubscribeWaste();
    };
  }, []);

  // **Generate insights based on waste data**
  const generateInsights = (total, breakdown) => {
    let message = "You're doing well in managing your waste! Keep it up!";

    if (total > 50) {
      message =
        "⚠️ Your waste generation is quite high. Try reducing and recycling more.";
    } else if (total > 20) {
      message = "👍 You're making progress. Focus on minimizing plastic waste.";
    }

    // **Waste-specific insights**
    if (breakdown.Plastic > breakdown.Organic) {
      message +=
        " Consider replacing plastic items with eco-friendly alternatives.";
    }
    if (breakdown.Metal > 10) {
      message +=
        " You have significant metal waste. Look into scrap recycling programs.";
    }

    setInsights(message);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, mt: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Waste Reduction Dashboard
        </Typography>

        {/* Reward Points & Total Waste */}
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <Card
            sx={{ minWidth: 150, background: "#e0f7fa", textAlign: "center" }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary">
                🎯 Reward Points
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="green">
                {points}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{ minWidth: 150, background: "#f1f8e9", textAlign: "center" }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="secondary">
                ♻️ Total Waste Logged
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="blue">
                {totalWaste} kg
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Tabs for navigation */}
        <Tabs
          value={view}
          onChange={(e, newValue) => setView(newValue)}
          centered
        >
          <Tab label="View Chart" value="chart" />
          <Tab label="Log Waste" value="log" />
        </Tabs>

        <Box mt={3}>{view === "chart" ? <WasteChart /> : <LogActivity />}</Box>

        {/* Insights Section - Now Below the Chart */}
        <Box mt={3} textAlign="center">
          <Typography variant="h6" fontWeight="bold" color="gray">
            💡 Waste Reduction Insights
          </Typography>
          <Typography variant="body1" fontStyle="italic" color="text.secondary">
            {insights}
          </Typography>
        </Box>

        <Box textAlign="center" mt={3}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
