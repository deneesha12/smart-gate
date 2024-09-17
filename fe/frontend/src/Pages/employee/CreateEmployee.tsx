import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, MenuItem, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Webcam from 'react-webcam';

const CreateEmployee = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        nic: '',
        dob: '',
        gender: '',
        designation: '',
    });

    const [image, setImage] = useState<string | null>(null);
    const [usingWebcam, setUsingWebcam] = useState(false);
    const webcamRef = useRef<Webcam>(null);

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
            setUsingWebcam(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        console.log('Image Data:', image);
        // Navigate back to the /employee page after submitting the form
        navigate('/employees');
    };

    return (
        <Box sx={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" component="h2" sx={{ marginBottom: '20px' }}>
                Create New Employee
            </Typography>
            <form onSubmit={handleSubmit}>
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
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    select
                    required
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
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
                    Create Employee
                </Button>
            </form>
        </Box>
    );
};

export default CreateEmployee;
