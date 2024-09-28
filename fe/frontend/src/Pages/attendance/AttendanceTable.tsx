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
import {  type Attendance } from '../../Attendance';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';



const columnHelper = createMRTColumnHelper<Attendance>();

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        size: 40,
    }),
    columnHelper.accessor('employee_name', {
        header: 'Employee Name',
        size: 120,
    }),
    columnHelper.accessor('date', {
        header: 'Date',
        size: 120,
    }),
    columnHelper.accessor('time', {
        header: 'Time',
        size: 300,
    }),
];

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});



const AttendanceTable = () => {
    const [attendance, setAttendance] = useState<Attendance[]>([])
   // Fetch employee data on component mount
   useEffect(() => {
    axios.get(import.meta.env.VITE_API_URI+'attendance/',{
        withCredentials: true
    }) // Replace with your actual API endpoint
        .then((response) => setAttendance(response.data))
        .catch((error) => console.error('Error fetching employee data:', error));
    }, []);

    useEffect(()=>{
        setTableData(attendance)
    }, [attendance])
    const [tableData, setTableData] = useState<Attendance[]>(attendance); // Initialize state with Person data
    const navigate = useNavigate(); // Use navigate to switch pages

    const handleExportRows = (rows: MRT_Row<Attendance>[]) => {
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

    const handleEdit = (row: Attendance) => {
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

export default AttendanceTable;
