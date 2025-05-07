"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialUsers = [
  {
    id: 1,
    name: "Dr. John Doe",
    email: "john@example.com",
    contactNumber: "1234567890",
    role: "Doctor",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Dr. Alice Ray",
    email: "alice@example.com",
    contactNumber: "9876543210",
    role: "Doctor",
    status: "Inactive",
  },
];

export default function UsersPage() {
  const currentUser = {
    role: "Admin",
  };

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Doctor name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      contactNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be at least 10 digits")
        .required("Contact number is required"),
    }),
    onSubmit: async (values) => {
      console.log("Submitted values:", values); // 👀 Check this
      const newDoctor = {
        ...values,
        id: users.length + 1,
        role: "Doctor",
        status: "Invited",
      };
      await fetch("/api/invite-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor),
      });
      handleCloseModal();
    },
  });

  const handleUpdateStatus = (id: number, newStatus: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
  };

  return (
    <Box p={3}>
      <Box
        px={2}
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: "8px",
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography variant="h4" mb={2} color="black" fontWeight={20} p={2}>
          Doctor Management
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginRight: 2 }}
            size="small"
          />
          {currentUser.role === "Admin" && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenModal}
            >
              Add Doctor
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "8px",
          backdropFilter: "blur(4px)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Contact</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>Dr. {user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contactNumber}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      color: "white",
                      backgroundColor:
                        user.status === "Confirmed"
                          ? "blue"
                          : user.status === "Invited"
                          ? "orange"
                          : user.status === "Active"
                          ? "green"
                          : "red",
                      borderRadius: "12px",
                      padding: "4px 12px",
                      textAlign: "center",
                      display: "inline-block",
                    }}
                  >
                    {user.status}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {user.status === "Invited" && (
                    <Button
                      size="small"
                      onClick={() => handleUpdateStatus(user.id, "Confirmed")}
                      color="success"
                    >
                      Confirm
                    </Button>
                  )}
                  {user.status === "Confirmed" && (
                    <Button
                      size="small"
                      onClick={() => handleUpdateStatus(user.id, "Inactive")}
                      color="warning"
                    >
                      Deactivate
                    </Button>
                  )}
                  {user.status === "Inactive" && (
                    <Button
                      size="small"
                      onClick={() => handleUpdateStatus(user.id, "Confirmed")}
                      color="primary"
                    >
                      Reactivate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "8px",
          backdropFilter: "blur(4px)",
        }}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogContent>
            <TextField
              label="Doctor Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Contact Number"
              name="contactNumber"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactNumber &&
                Boolean(formik.errors.contactNumber)
              }
              helperText={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
