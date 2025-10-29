import { useState, useEffect } from 'react';
import { Box, Alert, Snackbar, Button, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { FolderOpen, GetApp, LightMode, DarkMode, FolderZip, CreateNewFolder, Upload, ExpandMore } from '@mui/icons-material';
import JSZip from 'jszip';
import FileExplorer from './components/FileExplorer';
import TabBar from './components/TabBar';
import Editor from './components/Editor';
import { useThemeMode } from './contexts/ThemeContext';
import {
  openDirectoryFallback,
  buildFileTreeFromFiles,
  readFileContentFallback,
  downloadFile,
  getFileExtension,
  getLanguageFromExtension,
} from './utils/fallbackFileSystem';

function AppFallback() {
  const { mode, toggleTheme } = useThemeMode();
  const [fileTree, setFileTree] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [allFiles, setAllFiles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Handle opening a folder
  const handleOpenFolder = async () => {
    console.log('[Fallback] Opening folder...');
    try {
      const files = await openDirectoryFallback();

      if (files && files.length > 0) {
        console.log('[Fallback] Selected files:', files.length);
        setAllFiles(files);

        const tree = buildFileTreeFromFiles(files);
        console.log('[Fallback] File tree built:', tree);
        setFileTree(tree);

        setSnackbar({
          open: true,
          message: `Loaded ${files.length} files`,
          severity: 'success'
        });
      } else {
        console.log('[Fallback] No files selected');
      }
    } catch (error) {
      console.error('[Fallback] Error opening folder:', error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: 'error'
      });
    }
  };

  // Handle creating a new project
  const handleCreateNewProject = () => {
    const name = prompt('Enter project name:', 'my-project');
    if (name) {
      console.log('[Fallback] Creating new project:', name);
      const newTree = {
        name: name,
        type: 'directory',
        path: '',
        children: [],
        isVirtual: true,
      };
      setFileTree(newTree);
      setProjectName(name);
      setAllFiles([]);
      setSnackbar({
        open: true,
        message: `Created new project: ${name}`,
        severity: 'success'
      });
    }
    setAnchorEl(null);
  };

  // Handle file operations (create file, create folder)
  const handleFileOperation = (operation, node, value) => {
    console.log('[AppFallback] Operation:', operation, '| Parent:', node?.name, '| Parent path:', node?.path, '| Value:', value);

    if (operation === 'newFile') {
      // Create new file
      const parentNode = node && node.type === 'directory' ? node : fileTree;
      const newPath = parentNode.path ? `${parentNode.path}/${value}` : value;

      const newFile = {
        name: value,
        type: 'file',
        path: newPath,
        isVirtual: true,
        content: '',
      };

      console.log('[AppFallback] Creating file in parent path:', parentNode.path, '→ New file path:', newPath);
      const updatedTree = addNodeToTree(fileTree, parentNode.path, newFile);
      setFileTree(updatedTree);
      setHasUnsavedChanges(true);

      setSnackbar({
        open: true,
        message: `Created file: ${value}`,
        severity: 'success'
      });
    } else if (operation === 'newFolder') {
      // Create new folder
      const parentNode = node && node.type === 'directory' ? node : fileTree;
      const newPath = parentNode.path ? `${parentNode.path}/${value}` : value;

      const newFolder = {
        name: value,
        type: 'directory',
        path: newPath,
        children: [],
        isVirtual: true,
      };

      console.log('[AppFallback] Creating folder in parent path:', parentNode.path, '→ New folder path:', newPath);
      const updatedTree = addNodeToTree(fileTree, parentNode.path, newFolder);
      setFileTree(updatedTree);
      setHasUnsavedChanges(true);

      setSnackbar({
        open: true,
        message: `Created folder: ${value}`,
        severity: 'success'
      });
    } else if (operation === 'delete') {
      // Delete file or folder
      const updatedTree = deleteNodeFromTree(fileTree, node.path);
      setFileTree(updatedTree);
      setHasUnsavedChanges(true);

      setSnackbar({
        open: true,
        message: `Deleted: ${node.name}`,
        severity: 'success'
      });
    }
  };

  // Helper function to add a node to the tree
  const addNodeToTree = (tree, parentPath, newNode) => {
    if (!tree) return tree;

    const newTree = { ...tree };

    // Check if this is the parent node we're looking for
    if (tree.path === parentPath) {
      console.log('[addNodeToTree] ✓ Found parent! Adding', newNode.name, 'to', tree.name);
      newTree.children = [...(tree.children || []), newNode].sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'directory' ? -1 : 1;
      });
      return newTree;
    }

    // Recursively search in children
    if (tree.children) {
      newTree.children = tree.children.map(child => addNodeToTree(child, parentPath, newNode));
    }

    return newTree;
  };

  // Helper function to delete a node from the tree
  const deleteNodeFromTree = (tree, pathToDelete) => {
    if (!tree) return tree;

    const newTree = { ...tree };

    if (tree.children) {
      newTree.children = tree.children
        .filter(child => child.path !== pathToDelete)
        .map(child => deleteNodeFromTree(child, pathToDelete));
    }

    return newTree;
  };

  // Handle opening a file
  const handleFileClick = async (fileNode) => {
    console.log('[Fallback] Opening file:', fileNode.name);

    // Check if file is already open
    const existingFile = openFiles.find((f) => f.path === fileNode.path);

    if (existingFile) {
      setActiveFile(existingFile);
      return;
    }

    try {
      // For virtual files (created in IDE), use existing content
      // For real files (from disk), read from file object
      const content = fileNode.isVirtual
        ? (fileNode.content || '')
        : await readFileContentFallback(fileNode);

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

      console.log('[Fallback] File opened:', newFile.name, 'Language:', language, 'Virtual:', fileNode.isVirtual);
    } catch (error) {
      console.error('[Fallback] Error reading file:', error);
      setSnackbar({
        open: true,
        message: `Error reading file: ${error.message}`,
        severity: 'error'
      });
    }
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

    // Mark as having unsaved changes
    if (updatedFile.modified) {
      setHasUnsavedChanges(true);
    }
  };

  // Warn before closing tab with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Please download your project before leaving.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handle tab click
  const handleTabClick = (file) => {
    setActiveFile(file);
  };

  // Handle tab close
  const handleTabClose = (file) => {
    if (file.modified) {
      const save = window.confirm(
        `${file.name} has unsaved changes. Download before closing?`
      );
      if (save) {
        downloadFile(file.content, file.name);
      }
    }

    const updatedFiles = openFiles.filter((f) => f.path !== file.path);
    setOpenFiles(updatedFiles);

    if (activeFile?.path === file.path) {
      setActiveFile(updatedFiles.length > 0 ? updatedFiles[updatedFiles.length - 1] : null);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (activeFile) {
      downloadFile(activeFile.content, activeFile.name);
      setSnackbar({
        open: true,
        message: `Downloaded: ${activeFile.name}`,
        severity: 'success'
      });
    }
  };

  // Handle download all files as zip
  const handleDownloadAll = async () => {
    if (!fileTree) {
      setSnackbar({
        open: true,
        message: 'No project to download',
        severity: 'warning'
      });
      return;
    }

    try {
      setSnackbar({
        open: true,
        message: 'Creating zip file...',
        severity: 'info'
      });

      const zip = new JSZip();

      // Recursive function to add files to zip
      const addFilesToZip = async (node, parentPath = '') => {
        if (node.type === 'file') {
          const filePath = parentPath ? `${parentPath}/${node.name}` : node.name;

          // Get content from open files if modified, otherwise from file itself
          const openFile = openFiles.find(f => f.path === node.path);
          let content;

          if (openFile) {
            content = openFile.content;
          } else if (node.isVirtual) {
            content = node.content || '';
          } else if (node.file) {
            content = await node.file.text();
          } else {
            content = '';
          }

          zip.file(filePath, content);
        } else if (node.type === 'directory' && node.children) {
          const dirPath = parentPath ? `${parentPath}/${node.name}` : node.name;
          for (const child of node.children) {
            await addFilesToZip(child, dirPath);
          }
        }
      };

      // Add all files from file tree
      if (fileTree.children) {
        for (const child of fileTree.children) {
          await addFilesToZip(child, '');
        }
      }

      // Generate zip file
      const blob = await zip.generateAsync({ type: 'blob' });

      // Download zip file
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName || 'project'}-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setHasUnsavedChanges(false);

      setSnackbar({
        open: true,
        message: `Downloaded project as zip`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error creating zip:', error);
      setSnackbar({
        open: true,
        message: `Error creating zip: ${error.message}`,
        severity: 'error'
      });
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Simple Title Bar */}
      <Box
        sx={{
          height: 50,
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          CodeStudio IDE
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            endIcon={<ExpandMore />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Project
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleCreateNewProject}>
              <ListItemIcon>
                <CreateNewFolder fontSize="small" />
              </ListItemIcon>
              <ListItemText>Create New Project</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { handleOpenFolder(); setAnchorEl(null); }}>
              <ListItemIcon>
                <Upload fontSize="small" />
              </ListItemIcon>
              <ListItemText>Upload Project</ListItemText>
            </MenuItem>
          </Menu>

          <Button
            variant="outlined"
            size="small"
            startIcon={<GetApp />}
            onClick={handleDownload}
            disabled={!activeFile}
          >
            Download File
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<FolderZip />}
            onClick={handleDownloadAll}
            disabled={!fileTree}
            color="primary"
          >
            Download Project
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={toggleTheme}
            startIcon={mode === 'dark' ? <LightMode /> : <DarkMode />}
          >
            {mode === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* File Explorer */}
        {fileTree && (
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
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box sx={{ fontSize: 64 }}>📁</Box>
              <Typography variant="h6" color="text.secondary">
                No folder opened
              </Typography>
              <Button
                variant="contained"
                startIcon={<FolderOpen />}
                onClick={handleOpenFolder}
                size="large"
              >
                Open Folder
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, textAlign: 'center', marginTop: 2 }}>
                Select a folder to view and edit files. You can read, edit, and download individual files
                or download the entire project as a zip file.
              </Typography>
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
    </Box>
  );
}

export default AppFallback;
