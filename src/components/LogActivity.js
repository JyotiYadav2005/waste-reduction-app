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

    try {
      const user = auth.currentUser;
      if (!user) return;

      // Add waste entry
      await addDoc(collection(db, "wasteData"), {
        userId: user.uid,
        wasteType,
        amount: parseFloat(amount),
        date: serverTimestamp(),
      });

      // Update points
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      let currentPoints = userSnap.exists() ? userSnap.data().points || 0 : 0;

      const earnedPoints = parseFloat(amount) * 10;

      await updateDoc(userRef, {
        points: currentPoints + earnedPoints,
      });

      alert(`Waste logged successfully! You earned ${earnedPoints} points.`);
      setWasteType("");
      setAmount("");
    } catch (err) {
      console.error(err);
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
