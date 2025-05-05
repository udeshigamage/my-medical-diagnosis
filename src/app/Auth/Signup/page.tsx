"use client";
import Link from "next/link";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      role: Yup.string().required("Role is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string().required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Signing up with:", values);
      // TODO: Add your signup logic (API call, etc.)
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url('/pico2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          height: "500",
          backgroundColor: "rgba(255, 255, 255, 0.6)", // White with 20% opacity
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: 3,
          p: 2,
          borderRadius: 4,
        }}
      >
        <Box sx={{ maxWidth: 500, width: "100%" }}>
          <Typography variant="h4" mb={2} color="black">
            Sign Up
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Role"
              name="role"
              select
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              margin="normal"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              margin="normal"
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </form>
          <Typography mt={2} variant="body2" color="black">
            Already have an account?
            <MuiLink component={Link} href="/Auth/Login" underline="hover">
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
