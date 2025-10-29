import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  FolderOpen,
  Create,
  Save,
  Delete,
  LightMode,
  Keyboard,
} from '@mui/icons-material';

const Welcome = ({ open, onClose, isSupported }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ fontSize: 32 }}>👋</Box>
          <Typography variant="h6">Welcome to CodeStudio IDE</Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ paddingTop: 2 }}>
        {!isSupported ? (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: 0.5 }}>
              Browser Not Supported
            </Typography>
            <Typography variant="body2">
              This IDE requires the File System Access API, which is only available in:
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1, marginLeft: 2 }}>
              • Chrome 86+ or Edge 86+
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Please switch to a supported browser to use local file system features.
            </Typography>
          </Alert>
        ) : (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            <Typography variant="body2">
              Your browser supports all features! 🎉
            </Typography>
          </Alert>
        )}

        <Typography variant="body1" sx={{ fontWeight: 600, marginBottom: 1, marginTop: 2 }}>
          Getting Started:
        </Typography>

        <List dense>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <FolderOpen color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Open a Folder"
              secondary="Click the folder icon in the title bar or press Ctrl/Cmd+O"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Create color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Create Files & Folders"
              secondary="Right-click on folders in the explorer to create new items"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Save color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Save Changes"
              secondary="Press Ctrl/Cmd+S to save the current file"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Delete color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Delete Items"
              secondary="Right-click on files/folders and select Delete"
            />
          </ListItem>

          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LightMode color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Toggle Theme"
              secondary="Click the sun/moon icon to switch between light and dark modes"
            />
          </ListItem>
        </List>

        <Box sx={{ bgcolor: 'background.paper', padding: 2, borderRadius: 1, marginTop: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Keyboard fontSize="small" /> Keyboard Shortcuts:
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: 12 }}>
            <strong>Ctrl/Cmd + O</strong> - Open Folder<br />
            <strong>Ctrl/Cmd + S</strong> - Save File<br />
            <strong>Ctrl/Cmd + F</strong> - Find in Editor
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ borderTop: 1, borderColor: 'divider', padding: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Welcome;
