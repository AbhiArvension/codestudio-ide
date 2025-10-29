import { useState, useEffect } from 'react';
import { Box, Alert, Snackbar, Button, Typography } from '@mui/material';
import TitleBar from './components/TitleBar';
import ActivityBar from './components/ActivityBar';
import FileExplorer from './components/FileExplorer';
import TabBar from './components/TabBar';
import Editor from './components/Editor';
import Welcome from './components/Welcome';
import TestFolderPicker from './components/TestFolderPicker';
import {
  openDirectory,
  buildFileTree,
  readFileContent,
  writeFileContent,
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
  getFileExtension,
  getLanguageFromExtension,
  isFileSystemAccessSupported,
} from './utils/fileSystem';
import { downloadCode } from './utils/downloadCode';

function App() {
  const [activeView, setActiveView] = useState('explorer');
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [fileTree, setFileTree] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [welcomeOpen, setWelcomeOpen] = useState(false); // Changed to false
  const [isSupported, setIsSupported] = useState(true);
  const [testMode, setTestMode] = useState(true); // Add test mode

  // Check for File System Access API support
  useEffect(() => {
    const supported = isFileSystemAccessSupported();
    setIsSupported(supported);
    if (!supported) {
      setSnackbar({
        open: true,
        message: 'File System Access API not supported in this browser. Please use Chrome or Edge.',
        severity: 'error',
      });
    }
  }, []);

  // Handle opening a folder
  const handleOpenFolder = async () => {
    console.log('Opening folder...');
    try {
      const handle = await openDirectory();
      if (handle) {
        console.log('Folder handle received:', handle.name);
        setDirectoryHandle(handle);
        const tree = await buildFileTree(handle);
        console.log('File tree built:', tree);
        setFileTree(tree);
        setSnackbar({ open: true, message: `Opened folder: ${handle.name}`, severity: 'success' });
      } else {
        console.log('No folder selected');
      }
    } catch (error) {
      console.error('Error opening folder:', error);
      setSnackbar({ open: true, message: `Error opening folder: ${error.message}`, severity: 'error' });
    }
  };

  // Handle opening a file
  const handleFileClick = async (fileNode) => {
    // Check if file is already open
    const existingFile = openFiles.find((f) => f.path === fileNode.path);

    if (existingFile) {
      setActiveFile(existingFile);
      return;
    }

    // Read file content
    const content = await readFileContent(fileNode.handle);
    const extension = getFileExtension(fileNode.name);
    const language = getLanguageFromExtension(extension);

    const newFile = {
      ...fileNode,
      content,
      language,
      modified: false,
      originalContent: content,
    };

    setOpenFiles([...openFiles, newFile]);
    setActiveFile(newFile);
  };

  // Handle file content change
  const handleCodeChange = (newContent) => {
    if (!activeFile) return;

    const updatedFile = {
      ...activeFile,
      content: newContent,
      modified: newContent !== activeFile.originalContent,
    };

    const updatedOpenFiles = openFiles.map((f) =>
      f.path === activeFile.path ? updatedFile : f
    );

    setOpenFiles(updatedOpenFiles);
    setActiveFile(updatedFile);
  };

  // Handle tab click
  const handleTabClick = (file) => {
    setActiveFile(file);
  };

  // Handle tab close
  const handleTabClose = async (file) => {
    if (file.modified) {
      const save = window.confirm(`${file.name} has unsaved changes. Save before closing?`);
      if (save) {
        await handleSaveFile(file);
      }
    }

    const updatedFiles = openFiles.filter((f) => f.path !== file.path);
    setOpenFiles(updatedFiles);

    if (activeFile?.path === file.path) {
      setActiveFile(updatedFiles.length > 0 ? updatedFiles[updatedFiles.length - 1] : null);
    }
  };

  // Handle saving file
  const handleSaveFile = async (file) => {
    const success = await writeFileContent(file.handle, file.content);
    if (success) {
      const updatedFile = {
        ...file,
        modified: false,
        originalContent: file.content,
      };

      const updatedOpenFiles = openFiles.map((f) =>
        f.path === file.path ? updatedFile : f
      );

      setOpenFiles(updatedOpenFiles);
      if (activeFile?.path === file.path) {
        setActiveFile(updatedFile);
      }

      setSnackbar({ open: true, message: `Saved: ${file.name}`, severity: 'success' });
    } else {
      setSnackbar({ open: true, message: `Failed to save: ${file.name}`, severity: 'error' });
    }
  };

  // Handle file operations (create, delete)
  const handleFileOperation = async (operation, node, value) => {
    console.log('File operation:', operation, 'Node:', node, 'Value:', value);

    if (!directoryHandle) {
      console.error('No directory handle available');
      setSnackbar({ open: true, message: 'Please open a folder first', severity: 'error' });
      return;
    }

    try {
      if (operation === 'newFile') {
        const parentHandle = node && node.type === 'directory' ? node.handle : directoryHandle;
        console.log('Creating file in:', parentHandle.name || 'root');

        const newFileHandle = await createFile(parentHandle, value);

        if (newFileHandle) {
          console.log('File created successfully:', value);
          setSnackbar({ open: true, message: `Created file: ${value}`, severity: 'success' });
          // Refresh file tree
          const tree = await buildFileTree(directoryHandle);
          console.log('File tree refreshed:', tree);
          setFileTree(tree);
        } else {
          console.error('Failed to create file');
          setSnackbar({ open: true, message: 'Failed to create file', severity: 'error' });
        }
      } else if (operation === 'newFolder') {
        const parentHandle = node && node.type === 'directory' ? node.handle : directoryHandle;
        console.log('Creating folder in:', parentHandle.name || 'root');

        const newDirHandle = await createFolder(parentHandle, value);

        if (newDirHandle) {
          console.log('Folder created successfully:', value);
          setSnackbar({ open: true, message: `Created folder: ${value}`, severity: 'success' });
          // Refresh file tree
          const tree = await buildFileTree(directoryHandle);
          console.log('File tree refreshed:', tree);
          setFileTree(tree);
        } else {
          console.error('Failed to create folder');
          setSnackbar({ open: true, message: 'Failed to create folder', severity: 'error' });
        }
      } else if (operation === 'delete') {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${node.name}?`);
        if (!confirmDelete) return;

        console.log('Deleting:', node.name);

        // Get parent directory handle
        const pathParts = node.path.split('/');
        pathParts.pop(); // Remove the file/folder name

        let parentHandle = directoryHandle;
        for (const part of pathParts) {
          if (part) {
            parentHandle = await parentHandle.getDirectoryHandle(part);
          }
        }

        let success = false;
        if (node.type === 'file') {
          success = await deleteFile(parentHandle, node.name);
        } else {
          success = await deleteFolder(parentHandle, node.name);
        }

        if (success) {
          console.log('Deleted successfully:', node.name);
          setSnackbar({ open: true, message: `Deleted: ${node.name}`, severity: 'success' });

          // Close the file if it's open
          if (node.type === 'file') {
            const updatedFiles = openFiles.filter((f) => f.path !== node.path);
            setOpenFiles(updatedFiles);
            if (activeFile?.path === node.path) {
              setActiveFile(updatedFiles.length > 0 ? updatedFiles[0] : null);
            }
          }

          // Refresh file tree
          const tree = await buildFileTree(directoryHandle);
          console.log('File tree refreshed after delete:', tree);
          setFileTree(tree);
        } else {
          console.error('Failed to delete:', node.name);
          setSnackbar({ open: true, message: 'Failed to delete', severity: 'error' });
        }
      }
    } catch (error) {
      console.error('File operation error:', error);
      setSnackbar({ open: true, message: `Operation failed: ${error.message}`, severity: 'error' });
    }
  };

  // Handle download
  const handleDownload = () => {
    if (activeFile) {
      downloadCode(activeFile.content, activeFile.language);
      setSnackbar({ open: true, message: `Downloaded: ${activeFile.name}`, severity: 'success' });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (activeFile && activeFile.modified) {
          handleSaveFile(activeFile);
        }
      }

      // Ctrl/Cmd + O to open folder
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        handleOpenFolder();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFile, openFiles]);

  // Show test mode if enabled
  if (testMode) {
    return (
      <Box>
        <Box sx={{ padding: 2, bgcolor: 'warning.main', color: 'warning.contrastText', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            <strong>TEST MODE:</strong> Testing File System Access API
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => setTestMode(false)}
            sx={{ bgcolor: 'background.paper' }}
          >
            Exit Test Mode
          </Button>
        </Box>
        <TestFolderPicker />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Title Bar */}
      <TitleBar
        onOpenFolder={handleOpenFolder}
        onDownload={handleDownload}
        hasOpenFiles={openFiles.length > 0}
      />

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Activity Bar */}
        <ActivityBar activeView={activeView} onViewChange={setActiveView} />

        {/* Side Panel */}
        {activeView === 'explorer' && (
          <FileExplorer
            fileTree={fileTree}
            onFileClick={handleFileClick}
            onOpenFolder={handleOpenFolder}
            onFileOperation={handleFileOperation}
          />
        )}

        {/* Editor Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tab Bar */}
          <TabBar
            openFiles={openFiles}
            activeFile={activeFile}
            onTabClick={handleTabClick}
            onTabClose={handleTabClose}
          />

          {/* Editor */}
          {activeFile ? (
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Editor
                code={activeFile.content}
                onChange={handleCodeChange}
                language={activeFile.language}
              />
            </Box>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
              }}
            >
              <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                <Box sx={{ fontSize: 48, marginBottom: 2 }}>📁</Box>
                <Box sx={{ fontSize: 14 }}>No file opened</Box>
                <Box sx={{ fontSize: 12, marginTop: 1 }}>
                  Open a folder and select a file to start editing
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Welcome Dialog */}
      <Welcome
        open={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
        isSupported={isSupported}
      />
    </Box>
  );
}

export default App;
