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
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "Dr. John Doe",
    email: "john@example.com",
    role: "Doctor",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Patient",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Alice Ray",
    email: "alice@example.com",
    role: "Doctor",
    status: "Active",
  },
  {
    id: 5,
    name: "Tom Hardy",
    email: "tom@example.com",
    role: "Patient",
    status: "Inactive",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleRoleFilterChange = (e: any) => {
    setRoleFilter(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (roleFilter ? user.role === roleFilter : true));

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
  };

  const handleSaveUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    handleCloseModal();
  };

  return (
    <Box p={3} pt={8}>
      <Box
        mb={2}
        pt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: "white", padding: "10px", borderRadius: "8px" }}
      >
        <Typography variant="h5" mb={2} color="black" p={2}>
          Patient Management
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
          <FormControl
            variant="outlined"
            sx={{
              minWidth: 120,
              marginRight: 2,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={handleRoleFilterChange}
              label="Role"
              size="small"
            >
              <MenuItem value="">All Roles</MenuItem>
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Patient">Patient</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Add User
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
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
                <strong>Role</strong>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      color: "white",
                      backgroundColor:
                        user.status === "Active" ? "green" : "red",
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
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
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
          backgroundColor: "white",
          boxShadow: "none",
          borderRadius: "8px",
          padding: "10px",
        }}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              label="Role"
            >
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Patient">Patient</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
