import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Email:", data.email);
    console.log("Password:", data.password);
    let success = true;
    if (success) {
      toast.success("Login Successful");
      navigate("/home");
    }
  };

  return (
      <Box
          sx={{
            display: "flex",
            minHeight: "85vh",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10rem", // Adjust padding as needed
          }}
      >
        {/* Left Side - Logo */}
        <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "5rem", // Add space between image and form
            }}
        >
          <img
              src="/login_background.png"
              alt="Logo"
              style={{
                width: "100%", // Adjust width as needed
                maxWidth: "800px", // Max width to ensure the image does not stretch too much
              }}
          />
        </Box>

        {/* Right Side - Login Form */}
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              flex: 1,
              maxWidth: 400,
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background for the form
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Please enter your credentials to log in
          </Typography>

          <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
          />

          <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
          />

          <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#DDB49F",
                "&:hover": { backgroundColor: "#d1a48c" },
                color: "black",
              }}
          >
            Log In
          </Button>
        </Box>
      </Box>
  );
};

export default Login;
