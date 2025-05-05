"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Logging in with:", values);
      // TODO: Add your authentication logic here
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
          maxWidth: 400,
          width: "100%",
          bgcolor: "rgba(255, 255, 255, 0.5)",
          p: 4,
          borderRadius: 10,
          boxShadow: 10,
          textAlign: "center",
        }}
      >
        {/* <Typography variant="h5" mb={1} color="primary">
          Welcome to Browns Health Care System
        </Typography> */}

        <Typography variant="h4" mb={2} color="primary">
          Login
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
          />

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

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>

        <Typography mt={2} variant="body2" color="black">
          Don't have an account?{" "}
          <MuiLink component={Link} href="/Auth/Signup" underline="hover">
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
