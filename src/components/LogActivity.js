import { useState } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Typography,
} from "@mui/material";

const LogActivity = () => {
  const [wasteType, setWasteType] = useState("");
  const [amount, setAmount] = useState("");

  const handleLog = async (e) => {
    e.preventDefault();
    if (!wasteType || !amount) return alert("Please enter waste details");

    const wasteAmount = parseFloat(amount);
    if (wasteAmount <= 0) return alert("Amount must be greater than zero");

    try {
      // ✅ Step 1: Log waste in `wasteData` collection
      await addDoc(collection(db, "wasteData"), {
        userId: auth.currentUser.uid,
        wasteType,
        amount: wasteAmount,
        date: serverTimestamp(),
      });

      // ✅ Step 2: Update points & total waste in `users` collection
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const earnedPoints = wasteAmount * 10; // 🎯 1 kg = 10 points

        await updateDoc(userRef, {
          points: (userData.points || 0) + earnedPoints,
          totalWasteLogged: (userData.totalWasteLogged || 0) + wasteAmount,
        });

        alert(`Waste logged successfully! You earned ${earnedPoints} points.`);
      } else {
        alert("User data not found!");
      }

      // Reset fields
      setWasteType("");
      setAmount("");
    } catch (err) {
      console.error("Error logging waste:", err);
      alert("Error logging waste");
    }
  };

  return (
    <Paper elevation={2} sx={{ padding: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Log Your Waste
      </Typography>
      <Box
        component="form"
        onSubmit={handleLog}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          select
          label="Waste Type"
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value)}
        >
          <MenuItem value="Plastic">Plastic</MenuItem>
          <MenuItem value="Organic">Organic</MenuItem>
          <MenuItem value="Metal">Metal</MenuItem>
        </TextField>

        <TextField
          type="number"
          label="Amount (kg)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Log Waste
        </Button>
      </Box>
    </Paper>
  );
};

export default LogActivity;
