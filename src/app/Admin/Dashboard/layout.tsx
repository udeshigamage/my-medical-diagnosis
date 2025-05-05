// app/admin/dashboard/layout.tsx

import Navbar from "@/Component/Navbar";
import SideNav from "@/Component/SideNav";
import { Box } from "@mui/material";

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
        }}
      >
        <SideNav />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
