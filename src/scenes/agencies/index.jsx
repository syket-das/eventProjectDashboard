import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useAgencyStore } from '../../store/agencyStore';

const Agencies = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const agencies = useAgencyStore((state) => state.agencies);
  const getAgencies = useAgencyStore((state) => state.getAgencies);

  console.log(agencies);

  useEffect(() => {
    getAgencies();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'services',
      headerName: 'Services',
      flex: 1,
      cellClassName: 'name-column--cell',

      valueGetter: (params) => `${params.row.services?.length}`,
    },

    {
      field: 'createdBy',
      headerName: 'Created By',
      flex: 1,
      cellClassName: 'name-column--cell',
      valueGetter: (params) => `${params.row.user.fullName}`,
    },

    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      cellClassName: 'name-column--cell',
      valueGetter: (params) => `${new Date(params.row.createdAt)}`,
    },

    {
      field: 'browse',
      headerName: 'Browse',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button variant="contained" color="primary">
              Browse
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="Agencies" subtitle="Manage all agencies " />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={agencies} columns={columns} />
      </Box>
    </Box>
  );
};

export default Agencies;
