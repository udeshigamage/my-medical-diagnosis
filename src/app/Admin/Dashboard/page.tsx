"use client";

import { useState } from "react";
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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // required base styles
import "./CalendarStyles.css"; // optional custom style overrides (see below)

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
  const [date, setDate] = useState(new Date());

  return (
    <Box p={3}>
      {/* Summary Cards */}
      <Box display="flex" gap={3} flexWrap="wrap">
        {[
          { label: "Total Users", value: 150 },
          { label: "Doctors", value: 25 },
          { label: "Patients", value: 120 },
        ].map((item) => (
          <Card
            key={item.label}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(4px)",
              flex: "1 1 30%",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h6">{item.label}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Charts */}
      <Box display="flex" gap={3} mt={4} flexWrap="wrap">
        <Card
          sx={{
            flex: "1 1 48%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        >
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

        <Card
          sx={{
            flex: "1 1 48%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        >
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

      {/* Calendar */}
      <Box mt={2} maxWidth={800} width={800}>
        <Card
          sx={{
            backgroundColor: "rgba(233, 228, 228, 0.6)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Calendar
          </Typography>
          <Calendar
            value={date}
            tileClassName={({ date }) => {
              const isToday = date.toDateString() === new Date().toDateString();
              return isToday ? "today-tile" : null;
            }}
          />
        </Card>
      </Box>
    </Box>
  );
}
