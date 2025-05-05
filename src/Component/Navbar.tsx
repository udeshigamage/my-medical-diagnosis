import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#1976d2",
        width: "calc(100% - 200px)",
        marginLeft: "250px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div">
          Udeshi gamage
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
