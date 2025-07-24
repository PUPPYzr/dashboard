
'use client';

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const drawerWidth = 220;

// 定义菜单项类型
type MenuChild = { label: string; path: string };
type MenuGroup = { label: string; children: MenuChild[] };

// 菜单
const menuList: MenuGroup[] = [
  {
    label: "Node",
    children: [
      { label: "Nodes", path: "/dashboard/nodes" },
      { label: "NodeGroups", path: "/dashboard/nodegroups" },
    ],
  },
  {
    label: "Application",
    children: [
      { label: "Deployments", path: "/dashboard/deployments" },
      { label: "EdgeApplications", path: "/dashboard/edgeapplications" },
    ],
  },
  {
    label: "Config",
    children: [
      { label: "ConfigMaps", path: "/dashboard/configmaps" },
      { label: "Secrets", path: "/dashboard/secrets" },
    ],
  },
  {
    label: "Device",
    children: [
      { label: "DeviceModels", path: "/dashboard/devicemodels" },
      { label: "Devices", path: "/dashboard/devices" },
    ],
  },
  {
    label: "Edge-Cloud Message",
    children: [
      { label: "Rule Endpoints", path: "/dashboard/ruleendpoints" },
      { label: "Rules", path: "/dashboard/rules" },
    ],
  },
  {
    label: "Service Grid",
    children: [
      { label: "Services", path: "/dashboard/services" },
    ],
  },
  {
    label: "Kubernetes Policy",
    children: [
      { label: "Service Accounts", path: "/dashboard/serviceaccounts" },
      { label: "Roles", path: "/dashboard/roles" },
      { label: "Role Bindings", path: "/dashboard/rolebindings" },
      { label: "Cluster Roles", path: "/dashboard/clusterroles" },
      { label: "Cluster Role Bindings", path: "/dashboard/clusterrolebindings" },
    ],
  },
  {
    label: "Customization",
    children: [
      { label: "CRDs", path: "/dashboard/crds" },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const handleClick = (label: string) => {
    setOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {/* 导航栏 */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            KubeEdge Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            All NameSpace
          </Typography>
          <Typography variant="body1">admin</Typography>
        </Toolbar>
      </AppBar>
      {/* 侧边栏 */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {menuList.map((menu) => (
            <React.Fragment key={menu.label}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleClick(menu.label)}>
                  <ListItemText primary={menu.label} />
                  {open[menu.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={open[menu.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {(menu.children || []).map((item) => (
                    <ListItemButton
                      key={item.label}
                      sx={{ pl: 4 }}
                      onClick={() => {
                        router.push(item.path);
                      }}
                    >
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      {/* dashboard 内容区 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          p: 3,
          ml: `${drawerWidth}px`,
          mt: '64px',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </>
  );
}
