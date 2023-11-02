import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useServiceStore } from '../../store/serviceStore';

const Services = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const services = useServiceStore((state) => state.services);
  const getServices = useServiceStore((state) => state.getServices);

  useEffect(() => {
    getServices();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'agency',
      headerName: 'Agency',
      flex: 1,
      cellClassName: 'name-column--cell',
      valueGetter: (params) => `${params.row.agency.name}`,
    },

    {
      field: 'createdBy',
      headerName: 'Created By',
      flex: 1,
      cellClassName: 'name-column--cell',
      valueGetter: (params) => `${params.row.agency.user.fullName}`,
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
      <Header title="Services" subtitle="Manage all services " />

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
        <DataGrid checkboxSelection rows={services} columns={columns} />
      </Box>
    </Box>
  );
};

export default Services;
