import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";

const RecyclingCenters = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecyclingCenters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recyclingCenters"));
        const centerList = querySnapshot.docs.map((doc) => doc.data());
        setCenters(centerList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recycling centers:", error);
        setLoading(false);
      }
    };

    fetchRecyclingCenters();
  }, []);

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        ♻️ Nearby Recycling Centers
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {centers.length > 0 ? (
            centers.map((center, index) => (
              <Card key={index} sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {center.name}
                  </Typography>
                  <Typography variant="body2">{center.address}</Typography>
                  <Typography variant="body2" fontStyle="italic">
                    Contact: {center.contact}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>
              No recycling centers found. Add some data in Firebase!
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default RecyclingCenters;
