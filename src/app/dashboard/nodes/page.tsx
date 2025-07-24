'use client';

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function NodesPage() {
  // 假数据
  const [rows] = useState([
    {
      name: "k8s-master",
      id: "985cc078-9e8f-4bbe-851a-324cf02f6375",
      status: "Ready",
      host: "k8s-master 192.168.0.2",
      createTime: "2025-07-17T09:58:05Z",
      version: "v1.28.15"
    }
  ]);

  // 对话框状态
  const [open, setOpen] = useState(false);

  // 表单数据
  const [form, setForm] = useState({
    master: "",
    version: "",
    runtime: "",
    token: "",
    command: "",
  });

  // 表单选项
  const runtimeOptions = ["docker", "containerd"];

  // 打开/关闭弹窗
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  // 表单数据变化
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 生成命令（假实现）
  const handleGenerate = () => {
    setForm({
      ...form,
      command: `edgeadm join ${form.master} --kubeedge-version ${form.version} --runtime ${form.runtime} --token ${form.token}`
    });
  };

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
          Nodes
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div />
          <div>
            <Button variant="contained" sx={{ mr: 2 }} onClick={handleDialogOpen}>
              + ADD NODE
            </Button>
            <IconButton><RefreshIcon /></IconButton>
            <IconButton><MoreVertIcon /></IconButton>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name/ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Hostname/IP</TableCell>
                <TableCell>Creation time</TableCell>
                <TableCell>Edge side software version</TableCell>
                <TableCell>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Typography color="primary" sx={{ cursor: "pointer" }}>{row.name}</Typography>
                    <Typography variant="body2">{row.id}</Typography>
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.host}</TableCell>
                  <TableCell>{row.createTime}</TableCell>
                  <TableCell>{row.version}</TableCell>
                  <TableCell>
                    <Typography color="primary" sx={{ cursor: "pointer", mr: 2 }}>DETAILS</Typography>
                    <Typography color="error" sx={{ cursor: "pointer" }}>DELETE</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* Add Node 对话框 */}
      <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Node</DialogTitle>
        <DialogContent>
          <TextField
            label="Cloud master node ip:port *"
            name="master"
            value={form.master}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            label="KubeEdge version *"
            name="version"
            value={form.version}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Runtime type *"
            name="runtime"
            value={form.runtime}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {runtimeOptions.map(option => (
              <MenuItem value={option} key={option}>{option}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Token *"
            name="token"
            value={form.token}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Command"
            name="command"
            value={form.command}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            multiline
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>CANCEL</Button>
          <Button onClick={handleGenerate} variant="contained">GENERATE COMMAND</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
