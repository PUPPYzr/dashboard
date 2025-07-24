'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface DeploymentData {
  namespace: string;
  name: string;
  replicas: string;
  creationTime: string;
  operation?: string;
}

const mockData: DeploymentData[] = [
  {
    namespace: 'kube-system',
    name: 'coredns',
    replicas: '2/2',
    creationTime: '2025-07-17T09:58:08Z',
  },
  {
    namespace: 'kubeedge',
    name: 'cloudcore',
    replicas: '1/1',
    creationTime: '2025-07-17T16:29:47Z',
  },
  {
    namespace: 'kubesphere-system',
    name: 'extensions-museum',
    replicas: '1/1',
    creationTime: '2025-07-21T01:37:31Z',
  },
];

export default function DeploymentsPage() {
  const [data, setData] = useState<DeploymentData[]>(mockData);

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={700}>Deployment</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<span style={{ fontSize: 20, marginRight: 4 }}>＋</span>}
              sx={{ fontWeight: 700, fontSize: 18, minWidth: 190 }}
            >
              ADD DEPLOYMENT
            </Button>
            <IconButton>
              <RefreshIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Divider sx={{ mb: 2 }} />

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Namespace</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Replicas<br />(available/unavailable)</TableCell>
                <TableCell>Creation time</TableCell>
                <TableCell>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.namespace}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.replicas}</TableCell>
                  <TableCell>{row.creationTime}</TableCell>
                  <TableCell>
                    <Button variant="text" color="primary" sx={{ fontWeight: 700 }}>DETAILS</Button>
                    <Button variant="text" color="error" sx={{ fontWeight: 700 }}>DELETE</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
