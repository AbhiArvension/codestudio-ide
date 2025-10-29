import { useState } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { FolderOpen } from '@mui/icons-material';

const TestFolderPicker = () => {
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const testFolderPicker = async () => {
    console.log('Test: Starting folder picker...');
    setError('');
    setFiles([]);

    try {
      // Check if API exists
      if (!('showDirectoryPicker' in window)) {
        const err = 'File System Access API not supported in this browser!';
        console.error(err);
        setError(err);
        return;
      }

      console.log('Test: showDirectoryPicker available');

      // Open folder picker
      const dirHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
      });

      console.log('Test: Folder selected:', dirHandle.name);
      setFolderName(dirHandle.name);

      // Read files
      const fileList = [];
      for await (const entry of dirHandle.values()) {
        console.log('Test: Found entry:', entry.name, entry.kind);
        fileList.push({
          name: entry.name,
          type: entry.kind,
        });
      }

      console.log('Test: Total files/folders found:', fileList.length);
      setFiles(fileList);

    } catch (err) {
      console.error('Test: Error:', err);
      setError(err.message || 'Unknown error occurred');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        File System Access API Test
      </Typography>

      <Button
        variant="contained"
        startIcon={<FolderOpen />}
        onClick={testFolderPicker}
        sx={{ marginBottom: 2 }}
      >
        Test Open Folder
      </Button>

      {error && (
        <Paper sx={{ padding: 2, marginBottom: 2, bgcolor: 'error.main', color: 'error.contrastText' }}>
          <Typography variant="body2">
            <strong>Error:</strong> {error}
          </Typography>
          <Typography variant="caption" sx={{ marginTop: 1, display: 'block' }}>
            Please use Chrome 86+ or Edge 86+ browser
          </Typography>
        </Paper>
      )}

      {folderName && (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">
            Folder: {folderName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Found {files.length} items
          </Typography>
        </Paper>
      )}

      {files.length > 0 && (
        <Paper sx={{ padding: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Files and Folders:
          </Typography>
          <List dense>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={file.name}
                  secondary={file.type}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Paper sx={{ padding: 2, marginTop: 2, bgcolor: 'background.default' }}>
        <Typography variant="caption" component="div">
          <strong>Instructions:</strong>
        </Typography>
        <Typography variant="caption" component="div" sx={{ marginTop: 1 }}>
          1. Click "Test Open Folder"<br />
          2. Select a folder from your computer<br />
          3. Grant permission when prompted<br />
          4. Files should appear below
        </Typography>
      </Paper>
    </Box>
  );
};

export default TestFolderPicker;
