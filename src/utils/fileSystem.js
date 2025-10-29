// File System Access API utilities

export const openDirectory = async () => {
  try {
    const dirHandle = await window.showDirectoryPicker({
      mode: 'readwrite',
    });
    return dirHandle;
  } catch (err) {
    console.error('Error opening directory:', err);
    return null;
  }
};

export const readFileContent = async (fileHandle) => {
  try {
    const file = await fileHandle.getFile();
    const content = await file.text();
    return content;
  } catch (err) {
    console.error('Error reading file:', err);
    return '';
  }
};

export const writeFileContent = async (fileHandle, content) => {
  try {
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    return true;
  } catch (err) {
    console.error('Error writing file:', err);
    return false;
  }
};

export const createFile = async (dirHandle, fileName) => {
  try {
    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
    return fileHandle;
  } catch (err) {
    console.error('Error creating file:', err);
    return null;
  }
};

export const createFolder = async (dirHandle, folderName) => {
  try {
    const newDirHandle = await dirHandle.getDirectoryHandle(folderName, { create: true });
    return newDirHandle;
  } catch (err) {
    console.error('Error creating folder:', err);
    return null;
  }
};

export const deleteFile = async (dirHandle, fileName) => {
  try {
    await dirHandle.removeEntry(fileName);
    return true;
  } catch (err) {
    console.error('Error deleting file:', err);
    return false;
  }
};

export const deleteFolder = async (dirHandle, folderName) => {
  try {
    await dirHandle.removeEntry(folderName, { recursive: true });
    return true;
  } catch (err) {
    console.error('Error deleting folder:', err);
    return false;
  }
};

export const buildFileTree = async (dirHandle, path = '') => {
  const tree = {
    name: dirHandle.name,
    path: path,
    type: 'directory',
    handle: dirHandle,
    children: [],
  };

  try {
    for await (const entry of dirHandle.values()) {
      const entryPath = path ? `${path}/${entry.name}` : entry.name;

      if (entry.kind === 'file') {
        tree.children.push({
          name: entry.name,
          path: entryPath,
          type: 'file',
          handle: entry,
        });
      } else if (entry.kind === 'directory') {
        const subTree = await buildFileTree(entry, entryPath);
        tree.children.push(subTree);
      }
    }

    // Sort: directories first, then files
    tree.children.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'directory' ? -1 : 1;
    });
  } catch (err) {
    console.error('Error building file tree:', err);
  }

  return tree;
};

export const getFileExtension = (fileName) => {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

export const getLanguageFromExtension = (extension) => {
  const languageMap = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    json: 'json',
    html: 'html',
    css: 'css',
    scss: 'scss',
    md: 'markdown',
    txt: 'plaintext',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    go: 'go',
    rs: 'rust',
    php: 'php',
    rb: 'ruby',
    sh: 'shell',
  };

  return languageMap[extension.toLowerCase()] || 'plaintext';
};

// Check if File System Access API is supported
export const isFileSystemAccessSupported = () => {
  return 'showDirectoryPicker' in window;
};
