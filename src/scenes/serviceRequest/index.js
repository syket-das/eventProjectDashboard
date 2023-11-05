import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { Add } from '@mui/icons-material';
import DialogComponent from '../../components/DialogComponent';

const ServiceRequest = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box m="20px">
      <Header
        title="Service Requests"
        subtitle="List of all requests for services"
      />

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
          Add Request
        </Button>
      </Box>

      <Box
        my="20px"
        display={'flex'}
        justifyItems={'center'}
        alignItems={'flex-start'}
        gap={5}
        flexWrap={'wrap'}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, j) => {
          return (
            <Card
              sx={{
                minWidth: !isNonMobile ? '100%' : 275,
                backgroundColor: colors.primary[400],
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                  jgjhfghf{' '}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mb: 2,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: colors.redAccent[700],
                    color: colors.grey[100],
                    border: `1px solid ${colors.grey[300]}`,
                  }}
                  size="small"
                >
                  Reject
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: colors.greenAccent[700],
                    color: colors.grey[100],
                    border: `1px solid ${colors.grey[300]}`,
                  }}
                  size="small"
                >
                  Approve
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <DialogComponent
        title={'Add Request'}
        description={'Please enter request details according to the client.'}
        open={dialogOpen}
        setOpen={setDialogOpen}
        children={<AddServiceRequest />}
      />
    </Box>
  );
};

export default ServiceRequest;

const AddServiceRequest = () => {
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
