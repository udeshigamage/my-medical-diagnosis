"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const userData = [
  { name: "Jan", users: 30 },
  { name: "Feb", users: 45 },
  { name: "Mar", users: 60 },
  { name: "Apr", users: 50 },
  { name: "May", users: 70 },
];

const roleData = [
  { name: "Doctors", value: 10 },
  { name: "Patients", value: 90 },
  { name: "Admins", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Dashboard() {
  return (
    <Box p={3}>
      {/* Cards Section */}
      <Box display="flex" gap={3} flexWrap="wrap" sx={{ mt: 10 }}>
        <Card sx={{ bgcolor: "#f0f4ff", flex: "1 1 30%" }}>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">150</Typography>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "#fff7e6", flex: "1 1 30%" }}>
          <CardContent>
            <Typography variant="h6">Doctors</Typography>
            <Typography variant="h4">25</Typography>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "#e6f7e6", flex: "1 1 30%" }}>
          <CardContent>
            <Typography variant="h6">Patients</Typography>
            <Typography variant="h4">120</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Charts Section */}
      <Box display="flex" gap={3} mt={4} flexWrap="wrap">
        <Card sx={{ flex: "1 1 48%" }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              User Growth
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#1976d2" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 48%" }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Role Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {roleData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
