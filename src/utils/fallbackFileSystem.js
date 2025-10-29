// Fallback file system for browsers without File System Access API

export const openDirectoryFallback = () => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.multiple = true;

    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      resolve(files);
    };

    input.click();
  });
};

export const buildFileTreeFromFiles = (files) => {
  const tree = {
    name: 'root',
    type: 'directory',
    path: '',
    children: [],
  };

  const directories = new Map();
  directories.set('', tree);

  // Sort files by path to ensure directories are created before their files
  const sortedFiles = [...files].sort((a, b) => a.webkitRelativePath.localeCompare(b.webkitRelativePath));

  sortedFiles.forEach((file) => {
    const pathParts = file.webkitRelativePath.split('/');
    const fileName = pathParts[pathParts.length - 1];

    // Get or create parent directory
    let currentPath = '';
    let parentNode = tree;

    for (let i = 0; i < pathParts.length - 1; i++) {
      const dirName = pathParts[i];
      const dirPath = currentPath ? `${currentPath}/${dirName}` : dirName;

      if (!directories.has(dirPath)) {
        const dirNode = {
          name: dirName,
          type: 'directory',
          path: dirPath,
          children: [],
        };
        directories.set(dirPath, dirNode);
        parentNode.children.push(dirNode);
        parentNode = dirNode;
      } else {
        parentNode = directories.get(dirPath);
      }

      currentPath = dirPath;
    }

    // Add file to parent directory
    const filePath = file.webkitRelativePath;
    const fileNode = {
      name: fileName,
      type: 'file',
      path: filePath,
      file: file, // Store the actual File object
    };
    parentNode.children.push(fileNode);
  });

  // Sort children: directories first, then files
  const sortChildren = (node) => {
    if (node.children) {
      node.children.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === 'directory' ? -1 : 1;
      });
      node.children.forEach(sortChildren);
    }
  };
  sortChildren(tree);

  return tree;
};

export const readFileContentFallback = async (fileNode) => {
  if (!fileNode.file) {
    return '';
  }

  try {
    return await fileNode.file.text();
  } catch (err) {
    console.error('Error reading file:', err);
    return '';
  }
};

export const downloadFile = (content, filename) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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
    sass: 'sass',
    less: 'less',
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
    bash: 'shell',
    yml: 'yaml',
    yaml: 'yaml',
    xml: 'xml',
    sql: 'sql',
  };

  return languageMap[extension.toLowerCase()] || 'plaintext';
};
