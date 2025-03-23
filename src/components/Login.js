import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid login credentials!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 4, mt: 10, textAlign: "center" }}>
        <Typography variant="h5">Login</Typography>
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/register")}>
          Don't have an account? Register
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
