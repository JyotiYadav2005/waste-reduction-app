import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";

const RecyclingCenters = () => {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recyclingCenters"));
        const centersList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            location: data.location?._lat
              ? `${data.location._lat}, ${data.location._long}`
              : "Location not available", // Convert GeoPoint to string
          };
        });
        setCenters(centersList);
      } catch (error) {
        console.error("Error fetching recycling centers:", error);
      }
    };

    fetchCenters();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mt={4}
        mb={3}
      >
        ♻️ Nearby Recycling Centers
      </Typography>
      <Grid container spacing={3}>
        {centers.length > 0 ? (
          centers.map((center) => (
            <Grid item xs={12} sm={6} md={4} key={center.id}>
              <Card sx={{ background: "#e0f7fa", textAlign: "center", p: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {center.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    📍 {center.location}
                  </Typography>

                  <Typography variant="body1" mt={1}>
                    📞 Contact: {center.contact || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography textAlign="center" width="100%" mt={4}>
            No recycling centers available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default RecyclingCenters;
