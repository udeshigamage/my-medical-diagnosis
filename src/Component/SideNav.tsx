"use client";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import Link from "next/link";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useState } from "react";

const navItems = [
  { text: "Reports", path: "/admin/dashboard/reports" },
  { text: "Settings", path: "/admin/dashboard/settings" },
];

export default function SideNav() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [DiagnosisMenuOpen, setDiagnosismenuopen] = useState(false);

  const handleUserClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleclick = () => {
    setDiagnosismenuopen(!DiagnosisMenuOpen);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 200,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <Link href="/Admin/Dashboard" passHref>
          <ListItemButton component="a">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
        {/* Users with sub-menu */}
        <ListItemButton onClick={handleUserClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
          {userMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={userMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/Admin/Dashboard/User" passHref>
              <ListItemButton component="a" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="All users" />
              </ListItemButton>
            </Link>
            <Link href="/Admin/Dashboard/Doctor" passHref>
              <ListItemButton component="a" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Doctor Management" />
              </ListItemButton>
            </Link>
            <Link href="/Admin/Dashboard/Patient" passHref>
              <ListItemButton component="a" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Patient Management" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        <ListItemButton onClick={handleclick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Diagnosis Monitoring" />
          {DiagnosisMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={DiagnosisMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/Admin/Dashboard/User" passHref>
              <ListItemButton component="a" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="All users" />
              </ListItemButton>
            </Link>
            <Link href="/Admin/Dashboard/Doctor" passHref>
              <ListItemButton component="a" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Doctor Management" />
              </ListItemButton>
            </Link>
            <Link href="/Admin/Dashboard/Patient" passHref>
              <ListItemButton component="a" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Patient Management" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        {navItems.map((item) => (
          <Link href={item.path} key={item.text} passHref>
            <ListItemButton component="a">
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
