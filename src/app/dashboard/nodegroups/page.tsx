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
  Box,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

export default function NodeGroupsPage() {
  // 空数据
  const rows: any[] = [];

  return (
    <Box sx={{ mt: 4, mx: "auto", maxWidth: 1400 }}>
      <Card>
        <CardContent sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              Node Group
            </Typography>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mr: 2, fontWeight: 600, fontSize: 20, py: 1.2, px: 2.5 }}
              >
                ADD NODEGROUP
              </Button>
              <IconButton>
                <RefreshIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: 24, fontWeight: 500 }}>Name</TableCell>
                  <TableCell sx={{ fontSize: 24, fontWeight: 500 }}>Creation time</TableCell>
                  <TableCell sx={{ fontSize: 24, fontWeight: 500 }}>Operation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ height: 80, color: "#888", fontSize: 22 }}>
                      {/* 空数据时显示空行 */}
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.createTime}</TableCell>
                      <TableCell>
                        {/* 操作按钮 */}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {/* 分页栏 */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", py: 2, px: 2 }}>
              <Typography sx={{ mr: 2, fontSize: 18 }}>Rows per page: <b>10</b></Typography>
              <Typography sx={{ fontSize: 18, mr: 2, minWidth: 90 }}>0–0 of 0</Typography>
              <IconButton disabled>
                <span style={{ fontSize: 26, color: "#bbb" }}>{"<"}</span>
              </IconButton>
              <IconButton disabled>
                <span style={{ fontSize: 26, color: "#bbb" }}>{">"}</span>
              </IconButton>
            </Box>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
