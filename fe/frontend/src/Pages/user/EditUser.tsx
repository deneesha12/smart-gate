import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Admin } from '../../Admin';

const EditUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.userData as Admin | undefined;

    const [formData, setFormData] = useState<Admin>({
        id: userData?.id || 0,
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        role: userData?.role || '',
        status: userData?.status || '',
        email:userData?.email || '',
        password:userData?.password || ''
    });

    if (!userData) {
        return <Typography variant="h6">No user selected for editing.</Typography>;
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
        const updatedData = initialData.map((user) =>
            user.id === formData.id ? formData : user
        );

        console.log('Updated User Data:', updatedData);

        // Navigate back to the /user page
        navigate('/user');
    };

    return (
        <Box sx={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
                Edit User
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
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Status"
                    name="status"
                    value={formData.status}
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

export default EditUser;
