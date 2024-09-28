import { useEffect, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_Row,
    createMRTColumnHelper,
} from 'material-react-table';
import { Box, Button, Container, MenuItem, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import {  type Person } from '../Person';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';



const columnHelper = createMRTColumnHelper<Person>();

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        size: 40,
    }),
    columnHelper.accessor('first_name', {
        header: 'First Name',
        size: 120,
    }),
    columnHelper.accessor('last_name', {
        header: 'Last Name',
        size: 120,
    }),
    columnHelper.accessor('email', {
        header: 'Email',
        size: 300,
    }),
    columnHelper.accessor('nic', {
        header: 'NIC',
    }),
    columnHelper.accessor('dob', {
        header: 'DOB',
        size: 220,
    }),
    columnHelper.accessor('gender', {
        header: 'Gender',
        size: 220,
    }),
    columnHelper.accessor('designation', {
        header: 'Designation',
        size: 220,
    }),
];

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});



const EmployeesTable = () => {
    const [employeeData, setEmployeeData] = useState<Person[]>([])
   // Fetch employee data on component mount
   useEffect(() => {
    axios.get(import.meta.env.VITE_API_URI+'employees/',{      
        withCredentials: true
    }) // Replace with your actual API endpoint
        .then((response) => setEmployeeData(response.data))
        .catch((error) => console.error('Error fetching employee data:', error));
    }, []);

    useEffect(()=>{
        setTableData(employeeData)
    }, [employeeData])
    const [tableData, setTableData] = useState<Person[]>(employeeData); // Initialize state with Person data
    const navigate = useNavigate(); // Use navigate to switch pages

    const handleExportRows = (rows: MRT_Row<Person>[]) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(tableData);
        download(csvConfig)(csv);
    };

    const handleDelete = (rowId: number) => {
        setTableData((prevData) => prevData.filter((row) => row.id !== rowId));
    };

    const handleEdit = (row: Person) => {
        navigate(`/employee/edit`, { state: { userData: row } });
    };

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        renderTopToolbarCustomActions: ({ table }) => (
            <Container>
                <Typography variant="h6">Employee Table</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '12px',
                        padding: '10px',
                        flexWrap: 'wrap',
                        width: '100%',
                    }}
                >
                    <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
                        Export All Data
                    </Button>
                    <Button
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                    >
                        Export All Rows
                    </Button>
                    <Button
                        disabled={table.getRowModel().rows.length === 0}
                        onClick={() => handleExportRows(table.getRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                    >
                        Export Page Rows
                    </Button>
                    <Button
                        disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                    >
                        Export Selected Rows
                    </Button>
                    {/* Add New Employee Button */}
                    <Button
                        onClick={() => navigate('/employee/create')}
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: '#DDB49F',    // Background color
                            color: 'black',                 // Text color
                            '&:hover': {
                                backgroundColor: '#c89c87',   // Hover background color
                            },
                        }}
                    >
                        New Employee
                    </Button>
                </Box>
            </Container>
        ),
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActionMenuItems: ({ row }) => [
            <MenuItem key="edit" onClick={() => handleEdit(row.original)}>
                Edit
            </MenuItem>,
            <MenuItem key="delete" onClick={() => handleDelete(row.original.id)}>
                Delete
            </MenuItem>,
        ],
    });

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '12px',
                padding: '20px',
                flexWrap: 'wrap',
                width: '100%',
            }}
        >
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default EmployeesTable;
