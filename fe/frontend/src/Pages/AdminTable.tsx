import  { useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_Row, createMRTColumnHelper } from 'material-react-table';
import { Box, Button, Container, MenuItem, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { data as initialData, type Admin } from '../Admin';
import React from 'react';

const columnHelper = createMRTColumnHelper<Admin>();

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        size: 40,
    }),
    columnHelper.accessor('firstName', {
        header: 'First Name',
        size: 120,
    }),
    columnHelper.accessor('lastName', {
        header: 'Last Name',
        size: 120,
    }),
    columnHelper.accessor('role', {
        header: 'Role',
        size: 300,
    }),
    columnHelper.accessor('status', {
        header: 'STATUS',
    }),
];

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const AdminTable = () => {
    const [tableData, setTableData] = useState<Admin[]>(initialData); // Initialize state with data
    const navigate = useNavigate(); // Use navigate to switch pages

    const handleExportRows = (rows: MRT_Row<Admin>[]) => {
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

    const handleEdit = (row: Admin) => {
        navigate(`/user/edit`, { state: { userData: row } });
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
                <Typography variant='h6'>User Table</Typography>
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
                        disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                        }
                        onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                        startIcon={<FileDownloadIcon />}
                    >
                        Export Selected Rows
                    </Button>
                    {/* New button to navigate to create page */}
                    <Button
                        sx={{
                            backgroundColor: '#DDB49F',    // Background color
                            color: 'black',                 // Text color
                            '&:hover': {
                                backgroundColor: '#c89c87',   // Hover background color
                            },
                        }}
                        onClick={() => navigate('/user/create')}
                        variant="contained"
                    >
                        Add New User
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

export default AdminTable;
