import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { Add } from '@mui/icons-material';
import DialogComponent from '../../components/DialogComponent';

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box m="20px">
      <Header title="Categories" subtitle="List of all categories" />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            border: `1px solid ${colors.grey[300]}`,
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            width: '200px',
          }}
          onClick={() => setDialogOpen(true)}
        >
          <Add sx={{ mr: '10px' }} />
          Add Category
        </Button>
      </Box>

      <Box
        my="20px"
        display={'flex'}
        justifyItems={'flex-start'}
        alignItems={'flex-start'}
        gap={5}
        flexWrap={'wrap'}
      >
        <Box
          backgroundColor={colors.primary[400]}
          sx={{
            minWidth: '100px',
            maxWidth: '150px',
            minHeight: '100px',
            maxHeight: '150px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            Title
          </Typography>
        </Box>
      </Box>
      <DialogComponent
        title={'Add Category'}
        description={'Please enter a category name and description.'}
        open={dialogOpen}
        setOpen={setDialogOpen}
        children={<AddCategory />}
      />
    </Box>
  );
};

export default Categories;

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Box mt={4}>
      <TextField
        fullWidth
        variant="outlined"
        type="text"
        name="name"
        label="Name"
        sx={{
          mb: 2,
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        fullWidth
        variant="outlined"
        type="text"
        name="name"
        label="Description"
        multiline
        rows={3}
        sx={{
          mb: 2,
        }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Box>
  );
};
