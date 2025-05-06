// app/admin/dashboard/layout.tsx

import Navbar from "@/Component/Navbar";
import SideNav from "@/Component/SideNav";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <Box sx={{ display: "flex", height: "100vh" }}>
    //   <Box
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //     }}
    //   >
    //     <SideNav />
    //   </Box>

    //   <Box sx={{ flexGrow: 1 }}>
    //     <Navbar />
    //     <Box sx={{ p: 3 }}>{children}</Box>
    //   </Box>
    // </Box>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Top AppBar */}
      {/* Sidebar Drawer */}
      <SideNav />

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          color: "red",
          backgroundImage: 'url("/pico4.jpg")', // assuming bg.jpg is in /public
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        {/* Adds space below top AppBar */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
