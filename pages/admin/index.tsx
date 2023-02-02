import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { AdminLayout } from '@/components/layouts';

import { SummaryTile } from '@/components/admin';

import { Grid, Typography } from '@mui/material';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';

import { DashboardSummaryResponse } from '@/interfaces';

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 60 * 1000, // 60 seconds
    }
  );

  const [refreshIn, setRefreshIn] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 60));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error in Data Loading</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    noPaidOrders,
  } = data!;

  return (
    <AdminLayout
      title='Dashboard'
      subTitle='General Statistics'
      icon={<DashboardOutlinedIcon />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle='Total Orders'
          icon={
            <CreditCardOffOutlinedIcon
              color='secondary'
              sx={{ fontSize: 40 }}
            />
          }
        />
        <SummaryTile
          title={paidOrders}
          subTitle='Paid Orders'
          icon={
            <AttachMoneyOutlinedIcon color='success' sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={noPaidOrders}
          subTitle='Pending Orders'
          icon={
            <CreditCardOffOutlinedIcon color='error' sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={numberOfClients}
          subTitle='Clients'
          icon={<GroupOutlinedIcon color='primary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfProducts}
          subTitle='Products'
          icon={<CategoryOutlinedIcon color='warning' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={productsWithNoInventory}
          subTitle='Out of stock'
          icon={
            <CancelPresentationOutlinedIcon
              color='error'
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTile
          title={lowInventory}
          subTitle='Low Inventory'
          icon={
            <ProductionQuantityLimitsOutlinedIcon
              color='warning'
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTile
          title={refreshIn}
          subTitle='Updating in:'
          icon={
            <AccessTimeOutlinedIcon color='secondary' sx={{ fontSize: 40 }} />
          }
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
