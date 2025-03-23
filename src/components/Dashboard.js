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
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [view, setView] = useState("chart");
  const [points, setPoints] = useState(0);
  const [totalWaste, setTotalWaste] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setPoints(userSnap.data().points || 0);
          setTotalWaste(userSnap.data().totalWasteLogged || 0);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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

        {/* Points & Waste Info */}
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
