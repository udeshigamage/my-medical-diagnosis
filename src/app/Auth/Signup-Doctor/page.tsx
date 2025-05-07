"use client";
import Link from "next/link";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactNumber: "",
      options: {
        ward: false,
        specialization: false,
        opd: false,
        fresher: false,
      },
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      contactNumber: Yup.string().required("Contact number is required"),
      options: Yup.object().test(
        "at-least-one-checked",
        "Select at least one option",
        (val) => Object.values(val).some(Boolean)
      ),
    }),
    onSubmit: (values) => {
      console.log("Doctor registration values:", values);
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
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          p: 3,
          borderRadius: 4,
          maxWidth: 500,
          width: "100%",
        }}
      >
        <Typography variant="h4" mb={2} color="black">
          Doctor Sign Up
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            label="Contact Number"
            name="contactNumber"
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
            margin="normal"
          />

          <Typography variant="subtitle1" mt={2} color="black">
            Select Options
          </Typography>
          {/* <FormGroup>
            {["ward", "specialization", "opd", "fresher"].map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={formik.values.options[key]}
                    onChange={formik.handleChange}
                    name={`options.${key}`}
                  />
                }
                label={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
          </FormGroup>
          {formik.touched.options && formik.errors.options && (
            <Typography color="error" variant="caption">
              {formik.errors.options}
            </Typography>
          )} */}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>

        <Typography mt={2} variant="body2" color="black">
          Already have an account?{" "}
          <MuiLink component={Link} href="/Auth/Login" underline="hover">
            Login
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
