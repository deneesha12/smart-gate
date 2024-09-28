import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menue, setMenue] = useState(null);

  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfilClose = () => {
    setAnchorEl(null);
  };

  const handleLogout =()=>{
    axios.post(import.meta.env.VITE_API_URI+'logout/').then(res=>{
      console.log(res)
      navigate("/");
    })
    handleProfilClose()
  }

  const handleMenuOpen = (event) => {
    setMenue(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenue(null);
  };

  const navigate = useNavigate();
  return (
    <AppBar position='static' sx={{ mb: 4, backgroundColor: "#DDB49F" }}>
      <Toolbar>
        {/* Logo */}
        <img
            src="/ratko_logo.png"
            alt="Logo"
            style={{ height: 40, marginRight: 16 }}
        />

        {/* Title */}
        <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, color: "black" }}
        >
          Ratko Smart Gate Solution
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: { md: "flex" } }}>
          {/* <Button
              sx={{ color: "#000" }}
              onClick={() => { navigate('/') }}
          >
            Home
          </Button> */}
          <Button
              sx={{ color: "#000" }}
              onClick={() => { navigate('/user') }}
          >
            Users
          </Button>
          <Button
              sx={{ color: "#000" }}
              onClick={() => { navigate('/employees') }}
          >
            Employee
          </Button>
          <Button
              sx={{ color: "#000" }}
              onClick={() => { navigate('/attendance') }}
          >
            Employee Attendance
          </Button>
        </Box>


        {/* User Profile with Avatar */}
        <IconButton
          size='large'
          edge='end'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleProfileOpen}
          color='inherit'
        >
          <Avatar alt='User' />
        </IconButton>

        {/* Mobile Menu Icon */}
        {/* <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={handleMenuOpen}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton> */}

        {/* User Menu Dropdown */}
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleProfilClose}
        >
          <MenuItem onClick={handleProfilClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        <Menu
          id='menu-appbar'
          anchorEl={menue}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(menue)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Users</MenuItem>
          <MenuItem onClick={handleMenuClose}>Employees</MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
