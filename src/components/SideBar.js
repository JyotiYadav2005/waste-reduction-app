import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RecyclingIcon from "@mui/icons-material/Recycling";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem component={Link} to="/log-activity">
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Log Waste" />
        </ListItem>

        <ListItem component={Link} to="/recycling-centers">
          <ListItemIcon>
            <RecyclingIcon />
          </ListItemIcon>
          <ListItemText primary="Recycling Centers" />
        </ListItem>

        <ListItem component={Link} to="/sanitation-workers">
          <ListItemIcon>
            <CleaningServicesIcon />
          </ListItemIcon>
          <ListItemText primary="Sanitation Workers" />
        </ListItem>

        <ListItem>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            fullWidth
          >
            <ExitToAppIcon /> Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
