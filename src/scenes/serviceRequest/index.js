import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { Add } from '@mui/icons-material';
import DialogComponent from '../../components/DialogComponent';
import { useServiceRequestStore } from '../../store/serviceRequestStore';
import { useNavigate } from 'react-router-dom';

const ServiceRequest = () => {
  const navigate = useNavigate();
  const serviceRequests = useServiceRequestStore(
    (state) => state.serviceRequests
  );
  const getServiceRequests = useServiceRequestStore(
    (state) => state.getServiceRequests
  );

  const updateServiceRequest = useServiceRequestStore(
    (state) => state.updateServiceRequest
  );

  const isNonMobile = useMediaQuery('(min-width:600px)');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getServiceRequests();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Service Requests"
        subtitle="List of all requests for services"
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" spacing={1}>
          <Chip label="Pending" />
          <Chip label="Approved" variant="outlined" />
          <Chip label="Rejected" variant="outlined" />
        </Stack>
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
        {serviceRequests.map((serviceRequest) => {
          return (
            <Card
              onDoubleClick={() =>
                navigate(`/service-request/${serviceRequest.id}`)
              }
              key={serviceRequest.id}
              sx={{
                minWidth: !isNonMobile ? '100%' : 275,
                backgroundColor: colors.primary[400],
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {' '}
                  <Chip
                    label={serviceRequest.category.name}
                    variant="outlined"
                  />
                </Typography>
                <Typography variant="h5" component="div">
                  {serviceRequest?.title || 'No title'}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {serviceRequest.lowestBudget} - {serviceRequest.highestBudget}
                </Typography>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                  {serviceRequest.address.city}, {serviceRequest.address.state},{' '}
                  {serviceRequest.address.Country},{' '}
                  {serviceRequest.address.zipCode}
                </Typography>
                <Divider />

                <Typography variant="body2">{serviceRequest.brief}</Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mb: 2,
                }}
              >
                {serviceRequest.requestApproval === null ? (
                  <Button
                    onClick={() =>
                      updateServiceRequest(serviceRequest.id, {
                        requestApproval: false,
                      })
                    }
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
                ) : serviceRequest.requestApproval === true ? (
                  <Button
                    onClick={() =>
                      updateServiceRequest(serviceRequest.id, {
                        requestApproval: false,
                      })
                    }
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
                ) : (
                  <Chip label="Rejected" />
                )}
                {serviceRequest.requestApproval === null ? (
                  <Button
                    onClick={() =>
                      updateServiceRequest(serviceRequest.id, {
                        requestApproval: true,
                      })
                    }
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
                ) : serviceRequest.requestApproval === true ? (
                  <Chip label="Approved" />
                ) : (
                  <Button
                    onClick={() =>
                      updateServiceRequest(serviceRequest.id, {
                        requestApproval: true,
                      })
                    }
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
                )}
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
