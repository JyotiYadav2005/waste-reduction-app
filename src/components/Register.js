import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 4, mt: 10, textAlign: "center" }}>
        <Typography variant="h5">Register</Typography>
        <TextField
          fullWidth
          label="Email"
          sx={{ mt: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mt: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Already have an account? Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;
