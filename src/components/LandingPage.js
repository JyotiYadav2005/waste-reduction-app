import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Stack } from "@mui/material";
import { Recycling, Forest, DeleteSweep } from "@mui/icons-material";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mt: 5,
          p: 4,
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
          Welcome to Waste Reduction App ♻️
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Track, manage, and reduce waste efficiently while making an impact!
        </Typography>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mx: 2 }}
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ mx: 2 }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Stack
        direction={{ xs: "column", md: "row" }} // Stack in column for mobile, row for desktop
        spacing={4}
        justifyContent="center"
        alignItems="center"
        mt={5}
      >
        <Box textAlign="center">
          <Recycling fontSize="large" color="success" />
          <Typography variant="h5" fontWeight="bold" mt={2}>
            Track Your Waste
          </Typography>
          <Typography color="textSecondary">
            Log daily waste activities and monitor your progress.
          </Typography>
        </Box>

        <Box textAlign="center">
          <Forest fontSize="large" color="primary" />

          <Typography variant="h5" fontWeight="bold" mt={2}>
            Personalized Insights
          </Typography>
          <Typography color="textSecondary">
            Get recommendations to improve recycling habits.
          </Typography>
        </Box>

        <Box textAlign="center">
          <DeleteSweep fontSize="large" color="error" />
          <Typography variant="h5" fontWeight="bold" mt={2}>
            Connect with Recyclers
          </Typography>
          <Typography color="textSecondary">
            Find nearby recycling centers for proper waste disposal.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default LandingPage;
