import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  Box,
  Fade,
} from '@mui/material';

interface AddDeviceModelDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: {
    name: string;
    protocol: string;
    description: string;
    attributeName: string;
    attributeType: string;
  }) => void;
}

const ATTRIBUTE_TYPES = [
  { value: 'INT', label: 'INT' },
  { value: 'STRING', label: 'STRING' },
  { value: 'DOUBLE', label: 'DOUBLE' },
  { value: 'FLOAT', label: 'FLOAT' },
  { value: 'BOOLEAN', label: 'BOOLEAN' },
  { value: 'BYTES', label: 'BYTES' },
];

export default function AddDeviceModelDialog({
  open,
  onClose,
  onSubmit,
}: AddDeviceModelDialogProps) {
  const [form, setForm] = useState({
    name: '',
    protocol: '',
    description: '',
    attributeName: '',
    attributeType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(form);
    setForm({
      name: '',
      protocol: '',
      description: '',
      attributeName: '',
      attributeType: '',
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: 8,
          background: '#f4faff',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 900,
          color: '#1976d2',
          letterSpacing: 1,
          background: '#eaf3fb',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          // borderBottom: '2px dashed #90caf9',
        }}
      >
        ADD devicemodel
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            // required
            sx={{ background: '#fff', borderRadius: 2 }}
          />
          <TextField
            label="Protocol"
            name="protocol"
            value={form.protocol}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            // required
            sx={{ background: '#fff', borderRadius: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            multiline
            minRows={2}
            sx={{ background: '#fff', borderRadius: 2 }}
          />
          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <TextField
                label="Attribute Name"
                name="attributeName"
                value={form.attributeName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ background: '#fff', borderRadius: 2 }}
              />
            </Box>
            <Box flex={1}>
              <TextField
                select
                label="Attribute Type"
                name="attributeType"
                value={form.attributeType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ background: '#fff', borderRadius: 2 }}
              >
                {ATTRIBUTE_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, px: 4 }}
          onClick={handleSubmit}
          disabled={!form.name || !form.protocol || !form.attributeType}
        >
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
