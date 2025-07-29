'use client';

import React, { useState } from 'react'; // 用 useState 替换 React.useState
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
  TablePagination,
  Box, 
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import AddDeviceModelDialog from './AddDeviceModelDialog';

interface DeviceModelData {
  name: string;
  protocol: string;
  creationTime: string;
}

const mockData: DeviceModelData[] = [
  // 示例数据可自行添加
];

export default function DeviceModelsPage() {
  const [data, setData] = React.useState<DeviceModelData[]>(mockData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const [dialogOpen, setDialogOpen] = useState(false);
  const handleAddModel = (formData: any) => {
    console.log('收到的表单数据:', formData);
    // 你可以在这里用 fetch/axios 提交到后端
    // 提交后刷新列表、关闭弹窗等
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <Card sx={{ mt: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight={700}>DeviceModel</Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<span style={{ fontSize: 20, marginRight: 4 }}>＋</span>}
                sx={{ fontWeight: 700, fontSize: 18, minWidth: 170 }}
                onClick={() => setDialogOpen(true)}
              >
                ADD MODEL
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
                  <TableCell>Name</TableCell>
                  <TableCell>Protocol</TableCell>
                  <TableCell>Creation time</TableCell>
                  <TableCell>Operation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ color: '#aaa', py: 6 }}>
                      {/* 暂无数据 */}
                    </TableCell>
                  </TableRow>
                ) : (
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.protocol}</TableCell>
                        <TableCell>{row.creationTime}</TableCell>
                        <TableCell>
                          {/* 可放 Details / Delete 按钮 */}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10]}
          />
        </CardContent>
      </Card>
      {/* 弹窗放在 Card 之后即可 */}
      <AddDeviceModelDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddModel}
      />
    </>
    
    
  );
}
