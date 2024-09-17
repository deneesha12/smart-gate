import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Admin, data } from '../../Admin';
import { Box, Button, TextField, Typography, MenuItem, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Webcam from 'react-webcam';

const CreateUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state?.userData as Admin | undefined;

    // Initialize form data based on whether editing an existing user or creating a new one
    const [formData, setFormData] = useState<Admin>({
        id: userData?.id || data.length + 1, // Auto-generate a new ID if creating a new user
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        role: userData?.role || '',
        status: userData?.status || '',
    });

    const [image, setImage] = useState<string | null>(null); // State to store the captured/uploaded image
    const [usingWebcam, setUsingWebcam] = useState(false); // Toggle webcam view
    const webcamRef = useRef<Webcam>(null); // Ref for the webcam

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const captureWebcamImage = () => {
        const screenshot = webcamRef.current?.getScreenshot();
        if (screenshot) {
            setImage(screenshot);
            setUsingWebcam(false); // Turn off the webcam view after capturing the image
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (userData) {
            // Update existing user
            const updatedData = data.map((user) =>
                user.id === formData.id ? { ...formData, image } : user
            );
            console.log('Updated User Data:', updatedData);
        } else {
            // Create a new user
            const newUser = { ...formData, image };
            data.push(newUser);
            console.log('New User Data:', data);
        }

        // Navigate back to the /user page after submitting the form
        navigate('/user');
    };

    return (
        <Box sx={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
                {userData ? 'Edit User' : 'Create New User'}
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* Image Capture and Upload Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Button
                        variant="outlined"
                        startIcon={<CameraAltIcon />}
                        onClick={() => setUsingWebcam(!usingWebcam)}
                        sx={{
                            color: usingWebcam ? 'red' : 'black',
                            borderColor: usingWebcam ? 'red' : '#DDB49F',
                        }}
                    >
                        {usingWebcam ? 'Stop Webcam' : 'Use Webcam'}
                    </Button>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        sx={{ color: 'black', borderColor: '#DDB49F' }}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                    </Button>
                </Box>

                {/* Webcam and Image Preview */}
                <Box sx={{ marginBottom: '20px' }}>
                    {usingWebcam ? (
                        <Box>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width="100%"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={captureWebcamImage}
                                sx={{ marginTop: '10px' }}
                            >
                                Capture Image
                            </Button>
                        </Box>
                    ) : (
                        image && <img src={image} alt="Uploaded or Captured" width="100%" />
                    )}
                </Box>

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
                    {userData ? 'Save Changes' : 'Create User'}
                </Button>
            </form>
        </Box>
    );
};

export default CreateUser;
