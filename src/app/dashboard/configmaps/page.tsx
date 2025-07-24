'use client';

import React from 'react';
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
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ConfigmapData {
  namespace: string;
  name: string;
  labels: string;
  creationTime: string;
}

const mockData: ConfigmapData[] = [
  // 示例数据为空即可
];

export default function ConfigmapsPage() {
  const [data, setData] = React.useState<ConfigmapData[]>(mockData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={700}>Configmap</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<span style={{ fontSize: 20, marginRight: 4 }}>＋</span>}
              sx={{ fontWeight: 700, fontSize: 18, minWidth: 170 }}
            >
              ADD CONFIGMAP
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
                <TableCell>Labels</TableCell>
                <TableCell>Creation time</TableCell>
                <TableCell>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: '#aaa', py: 6 }}>
                    {/* 无数据 */}
                  </TableCell>
                </TableRow>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.namespace}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.labels}</TableCell>
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
  );
}
