import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useServiceRequestStore } from '../../store/serviceRequestStore';
import Header from '../../components/Header';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useBidStore } from '../../store/bidStore';

const ServiceRequestDetails = () => {
  const updateBid = useBidStore((state) => state.updateBid);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const params = useParams();
  const { serviceRequestId } = params;

  const serviceRequest = useServiceRequestStore(
    (state) => state.serviceRequest
  );

  const getServiceRequest = useServiceRequestStore(
    (state) => state.getServiceRequest
  );

  useEffect(() => {
    getServiceRequest(serviceRequestId);
  }, [params, getServiceRequest, serviceRequestId]);

  return (
    <Box m="20px">
      <Header
        title="Service Request Details"
        subtitle="All Details for the service request"
      />{' '}
      <Box>
        <Typography variant="h6">
          Service Request ID: {serviceRequest.id}
        </Typography>
        <Typography variant="h6">
          Service Request Status:{' '}
          {serviceRequest?.requestApproval === null
            ? 'Pending'
            : serviceRequest.requestApproval
            ? 'Approved'
            : 'Rejected'}
        </Typography>
        <Typography variant="h6">
          Category: {serviceRequest?.category?.name}
        </Typography>
        <Typography variant="h6">Title: {serviceRequest?.title}</Typography>
        <Typography variant="h6">
          Description: {serviceRequest?.brief}
        </Typography>
        <Typography variant="h6">
          Location: {serviceRequest?.address?.city} -{' '}
          {serviceRequest?.address?.state} - {serviceRequest?.address?.country}{' '}
          - {serviceRequest?.address?.zipCode}
        </Typography>
        <Typography variant="h6">
          Date : {serviceRequest?.startDate} - {serviceRequest?.endDate}
        </Typography>
        <Typography variant="h6">
          Budget: {serviceRequest?.lowestBudget} {serviceRequest?.highestBudget}
        </Typography>

        <Typography variant="h6">
          Manpower Needed : {serviceRequest?.manpowerNeeded ? 'Yes' : 'No'}
        </Typography>

        <Divider />

        <Box
          sx={{
            display: 'flex',
            float: 'right',
          }}
        >
          Approved Agency: {serviceRequest?.approvedAgency?.name || 'None'}
        </Box>

        <Typography variant="h3" textAlign="center" my={4}>
          BIDS RECEIVED
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          {serviceRequest?.bids?.map((bid) => (
            <Card
              key={bid.id}
              sx={{
                minWidth: 275,

                backgroundColor: bid?.accepted
                  ? colors.greenAccent[700]
                  : colors.primary[400],
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {bid?.agency?.name}
                </Typography>
                <Typography variant="h5" component="div">
                  {bid?.price}
                </Typography>

                <Typography variant="body2">{bid?.message}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{
                    backgroundColor: colors.greenAccent[700],
                    color: colors.grey[100],
                    border: `1px solid ${colors.grey[300]}`,
                    ml: 'auto',
                  }}
                  onClick={() => {
                    updateBid(bid.id, {
                      accepted: true,
                    });
                  }}
                >
                  Accept Bid
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceRequestDetails;
