import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Person, data as initialData } from '../../Person';

const EditEmployee = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.userData as Person | undefined;

    const [formData, setFormData] = useState<Person>({
        id: userData?.id || 0,
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        email: userData?.email || '',
        nic: userData?.nic || '',
        dob: userData?.dob || '',
        gender: userData?.gender || '',
        designation: userData?.designation || '',
    });

    if (!userData) {
        return <Typography variant="h6">No employee selected for editing.</Typography>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update the data in the existing data array (mock update)
        const updatedData = initialData.map((employee) =>
            employee.id === formData.id ? formData : employee
        );

        console.log('Updated Employee Data:', updatedData);

        // Navigate back to the /employee page
        navigate('/employees');
    };

    return (
        <Box sx={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
                Edit Employee
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="NIC"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Date of Birth"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: '20px', color: 'black', backgroundColor: '#DDB49F' }}
                >
                    Save Changes
                </Button>
            </form>
        </Box>
    );
};

export default EditEmployee;
