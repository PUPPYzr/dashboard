


'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';



const nodeStatus = [
  { label: '1', status: 'Ready', color: 'green' },
  { label: '0', status: 'NotReady', color: 'orange' },
];

const deployStatus = [
  { label: '2', status: 'Running', color: 'green' },
  { label: '0', status: 'Disabled', color: 'orange' },
];

export default function Dashboard() {
  const cpuUsage = 100;
  const cpuMemory = '950m';
  const memoryUsage = 100;
  const memoryTotal = '290Mi';
  const GPUUsage = 100;
  const GPUTotal = '169Mi';
  return (
    <Box>
      {/* 第一行的三组卡片 */}
      <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
        {/* Node Status */}
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Node Status</Typography>
            <Divider sx={{ mb: 1 }} />
            <Stack direction="row" spacing={2}>
              {nodeStatus.map((item) => (
                <Box key={item.status} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{item.label}</Typography>
                  <Typography sx={{ color: item.color, fontWeight: 700 }}>
                    {item.status}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Deployment Status */}
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Deployment Status</Typography>
            <Divider sx={{ mb: 1 }} />
            <Stack direction="row" spacing={2}>
              {deployStatus.map((item) => (
                <Box key={item.status} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{item.label}</Typography>
                  <Typography sx={{ color: item.color, fontWeight: 700 }}>
                    {item.status}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Version Information */}
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Version Information</Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography sx={{ fontWeight: 700 }}>Kubernetes</Typography>
            <Typography sx={{ fontWeight: 700 }}>KubeEdge</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* CPU 区块 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            CPU
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, ml: 2 }}>
            {cpuUsage}% - Memory: {cpuMemory}
          </Typography>
        </CardContent>
      </Card>
      {/* Memory 区块 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            Memory
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, ml: 2 }}>
            {memoryUsage}% - Memory: {memoryTotal}
          </Typography>
        </CardContent>
      </Card>
      {/* GPU 区块 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            GPU
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, ml: 2 }}>
            {GPUUsage}% - GPU: {GPUTotal}
          </Typography>
        </CardContent>
      </Card>
      
    </Box>
    
  );
}




