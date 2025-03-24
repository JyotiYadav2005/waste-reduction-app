import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import SideBar from "../components/SideBar"; // Import Sidebar

const SanitationWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wasteCollection"));
        const workerList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkers(workerList);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar /> {/* Sidebar remains visible */}
      <Container maxWidth="md" sx={{ ml: "260px" }}>
        {" "}
        {/* Adjusted for Sidebar */}
        <Paper
          elevation={3}
          sx={{ padding: 3, mt: 4, borderRadius: 3, textAlign: "center" }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🚛 Sanitation Workers
          </Typography>
          <Box mt={2}>
            <List>
              {workers.length > 0 ? (
                workers.map((worker) => (
                  <ListItem key={worker.id} divider>
                    <ListItemText
                      primary={worker.name || "Unknown Worker"}
                      secondary={`Contact: ${
                        worker.contact || "N/A"
                      } | Assigned Area: ${worker.area || "N/A"}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No sanitation workers available.
                </Typography>
              )}
            </List>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SanitationWorkers;
