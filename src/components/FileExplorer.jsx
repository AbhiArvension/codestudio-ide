import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Folder,
  FolderOpen,
  InsertDriveFile,
  ChevronRight,
  ExpandMore,
  Add,
  CreateNewFolder,
  Delete,
  Edit,
  MoreVert,
} from '@mui/icons-material';

const FileTreeItem = ({ node, level, onFileClick, onFileOperation }) => {
  // Auto-expand root folder (level 0)
  const [expanded, setExpanded] = useState(level === 0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action) => {
    onFileOperation(action, node);
    handleCloseMenu();
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop();
    return <InsertDriveFile sx={{ fontSize: 16, color: '#858585' }} />;
  };

  if (node.type === 'file') {
    return (
      <Box
        onContextMenu={handleContextMenu}
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: level * 2,
          paddingY: 0.5,
          paddingX: 1,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover',
            '& .action-button': {
              visibility: 'visible',
            },
          },
        }}
      >
        <Box
          onClick={() => onFileClick(node)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            minWidth: 0,
          }}
        >
          {getFileIcon(node.name)}
          <Typography
            variant="body2"
            sx={{
              marginLeft: 0.5,
              fontSize: 13,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {node.name}
          </Typography>
        </Box>

        <IconButton
          className="action-button"
          size="small"
          onClick={handleContextMenu}
          sx={{
            visibility: 'hidden',
            padding: 0.25,
            marginLeft: 'auto',
          }}
        >
          <MoreVert sx={{ fontSize: 16 }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            sx: {
              minWidth: 200,
              boxShadow: 3,
            }
          }}
        >
          <MenuItem
            onClick={() => handleMenuAction('delete')}
            sx={{ fontSize: 13, paddingY: 1 }}
          >
            <Delete sx={{ fontSize: 18, marginRight: 1.5, color: 'error.main' }} />
            <Typography variant="body2">Delete File</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        onContextMenu={handleContextMenu}
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: level * 2,
          paddingY: 0.5,
          paddingX: 1,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover',
            '& .action-button': {
              visibility: 'visible',
            },
          },
        }}
      >
        <Box
          onClick={() => setExpanded(!expanded)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            minWidth: 0,
          }}
        >
          {expanded ? (
            <ExpandMore sx={{ fontSize: 16, color: 'text.secondary' }} />
          ) : (
            <ChevronRight sx={{ fontSize: 16, color: 'text.secondary' }} />
          )}
          {expanded ? (
            <FolderOpen sx={{ fontSize: 16, color: '#dcb67a', marginLeft: 0.5 }} />
          ) : (
            <Folder sx={{ fontSize: 16, color: '#dcb67a', marginLeft: 0.5 }} />
          )}
          <Typography
            variant="body2"
            sx={{
              marginLeft: 0.5,
              fontSize: 13,
              fontWeight: 500,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {node.name}
          </Typography>
        </Box>

        <IconButton
          className="action-button"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleContextMenu(e);
          }}
          sx={{
            visibility: 'hidden',
            padding: 0.25,
            marginLeft: 'auto',
          }}
        >
          <MoreVert sx={{ fontSize: 16 }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            sx: {
              minWidth: 200,
              boxShadow: 3,
            }
          }}
        >
          <MenuItem
            onClick={() => handleMenuAction('newFile')}
            sx={{ fontSize: 13, paddingY: 1 }}
          >
            <Add sx={{ fontSize: 18, marginRight: 1.5, color: 'primary.main' }} />
            <Typography variant="body2">New File</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction('newFolder')}
            sx={{ fontSize: 13, paddingY: 1 }}
          >
            <CreateNewFolder sx={{ fontSize: 18, marginRight: 1.5, color: 'primary.main' }} />
            <Typography variant="body2">New Folder</Typography>
          </MenuItem>
          {level > 0 && (
            <MenuItem
              onClick={() => handleMenuAction('delete')}
              sx={{ fontSize: 13, paddingY: 1 }}
            >
              <Delete sx={{ fontSize: 18, marginRight: 1.5, color: 'error.main' }} />
              <Typography variant="body2">Delete Folder</Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>

      {expanded && node.children && (
        <Box>
          {node.children.map((child, index) => (
            <FileTreeItem
              key={child.path || index}
              node={child}
              level={level + 1}
              onFileClick={onFileClick}
              onFileOperation={onFileOperation}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

const FileExplorer = ({ fileTree, onFileClick, onOpenFolder, onFileOperation }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({ type: '', node: null });
  const [inputValue, setInputValue] = useState('');

  const handleFileOperation = (action, node) => {
    console.log('[FileExplorer] Opening dialog for action:', action, 'on node:', node?.name, 'at path:', node?.path);
    setDialogConfig({ type: action, node: node });
    setDialogOpen(true);
    setInputValue('');
  };

  const handleDialogSubmit = () => {
    if (inputValue.trim() && dialogConfig.node) {
      console.log('[FileExplorer] Creating', dialogConfig.type, 'with name:', inputValue, 'in parent:', dialogConfig.node?.name, 'path:', dialogConfig.node?.path);
      onFileOperation(dialogConfig.type, dialogConfig.node, inputValue.trim());
    }
    setDialogOpen(false);
    setDialogConfig({ type: '', node: null });
  };

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'background.default',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="body2" sx={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'text.secondary' }}>
            Explorer
          </Typography>
        </Box>

        {fileTree && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => handleFileOperation('newFile', fileTree)}
              sx={{
                border: 1,
                borderColor: 'divider',
                '&:hover': { borderColor: 'primary.main', color: 'primary.main' }
              }}
              title="New File"
            >
              <Add sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleFileOperation('newFolder', fileTree)}
              sx={{
                border: 1,
                borderColor: 'divider',
                '&:hover': { borderColor: 'primary.main', color: 'primary.main' }
              }}
              title="New Folder"
            >
              <CreateNewFolder sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* File Tree */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {!fileTree ? (
          <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 2, fontSize: 13 }}>
              No folder opened
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<FolderOpen />}
              onClick={onOpenFolder}
              sx={{ fontSize: 12 }}
            >
              Open Folder
            </Button>
          </Box>
        ) : (
          <FileTreeItem
            node={fileTree}
            level={0}
            onFileClick={onFileClick}
            onFileOperation={handleFileOperation}
          />
        )}
      </Box>

      {/* Dialog for creating files/folders */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontSize: 14 }}>
          {dialogConfig.type === 'newFile' && 'New File'}
          {dialogConfig.type === 'newFolder' && 'New Folder'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            placeholder={dialogConfig.type === 'newFile' ? 'filename.js' : 'folder name'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleDialogSubmit();
              }
            }}
            sx={{ marginTop: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} size="small">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} variant="contained" size="small">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileExplorer;
