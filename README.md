# CodeStudio IDE

A modern, browser-based VS Code-like IDE built with React.js for JavaScript and Python development. Features a complete file system, Monaco editor, and Material-UI design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![Vite](https://img.shields.io/badge/vite-6.0.5-purple.svg)

## 🚀 Features

### Core Functionality
- **📁 Project Management**: Create new projects or upload existing folders
- **📝 File Operations**: Create, edit, delete files and folders anywhere in the tree
- **💾 Auto-save Warning**: Browser warns before closing with unsaved changes
- **📦 Project Export**: Download entire project as ZIP file
- **📄 Individual File Download**: Download any file separately

### Code Editor
- **Monaco Editor**: Same powerful editor used in VS Code
- **Syntax Highlighting**: Support for 30+ languages (JS, TS, Python, Java, C++, Go, Rust, etc.)
- **Code Folding**: Collapse/expand code sections
- **IntelliSense**: Auto-completion and suggestions
- **Multi-file Tabs**: Open multiple files with modified indicators
- **Line Numbers & Minimap**: Professional coding environment

### File Explorer
- **Tree View**: Hierarchical folder structure
- **Context Menu**: Right-click or three-dot menu for file operations
- **Auto-expand**: Root folder opens automatically
- **Visual Indicators**: Icons for files and folders
- **Nested Creation**: Create files/folders at any level

### User Interface
- **🌓 Dark/Light Mode**: Toggle between themes
- **Material-UI**: Modern, professional design
- **Responsive Layout**: Adapts to different screen sizes
- **Status Bar**: Quick access to theme and project info
- **Clean Design**: Inspired by VS Code's interface

### Virtual File System
- **In-Memory Storage**: Create projects without server
- **Browser Compatibility**: Works in all modern browsers
- **Fallback Mode**: Uses standard File API for universal support
- **No Backend Required**: Purely client-side application

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **UI Library**: Material-UI (MUI) 6.2.0
- **Code Editor**: Monaco Editor (VS Code's editor)
- **File Compression**: JSZip
- **Styling**: Emotion CSS-in-JS
- **Icons**: Material Icons

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/AbhiArvension/code-editor.git
cd code-editor

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

The app will be available at \`http://localhost:5173/\`

## 🎯 Usage

### Creating a New Project
1. Click "Project" dropdown in the top bar
2. Select "Create New Project"
3. Enter a project name
4. Start creating files and folders

### Uploading an Existing Project
1. Click "Project" → "Upload Project"
2. Select a folder from your computer
3. All files will be loaded into the editor

### File Operations
- **Create File**: Hover over folder → Click ⋮ → "New File"
- **Create Folder**: Hover over folder → Click ⋮ → "New Folder"
- **Delete**: Hover over item → Click ⋮ → "Delete"
- **Edit**: Click on any file to open it in the editor

### Downloading Work
- **Single File**: Click "Download File" in top bar (when file is open)
- **Entire Project**: Click "Download Project" to get a ZIP file

## ✅ Advantages

### 1. **Zero Setup Required**
- No installation needed
- No server configuration
- Works entirely in the browser
- Perfect for quick prototyping

### 2. **Cross-Platform**
- Works on Windows, Mac, Linux
- Mobile browser support
- No OS-specific issues
- Consistent experience everywhere

### 3. **Universal Browser Support**
- Chrome, Firefox, Safari, Edge
- Fallback mode for older browsers
- No File System Access API required
- Works even on restricted systems

### 4. **Educational Value**
- Great for teaching programming
- Safe sandbox environment
- No risk of breaking system files
- Perfect for coding bootcamps

### 5. **Privacy & Security**
- All data stays in your browser
- No server uploads
- No tracking or analytics
- Complete offline functionality

### 6. **Professional Features**
- Monaco editor (industry standard)
- VS Code-like interface
- Syntax highlighting for 30+ languages
- Code folding and IntelliSense

### 7. **Project Portability**
- Export projects as ZIP
- Share via download
- Import on any device
- No cloud dependencies

### 8. **Resource Efficient**
- Lightweight application
- No backend infrastructure
- Low bandwidth usage
- Fast load times

### 9. **Development Speed**
- Quick iterations
- Hot module replacement
- Instant file operations
- No compilation delays

### 10. **Customizable**
- Open source codebase
- Easy to modify
- Add new features
- Extend functionality

## ⚠️ Disadvantages

### 1. **Limited File System Access**
- Cannot directly save to disk (browser limitation)
- Must download files manually
- No automatic sync with local filesystem
- File System Access API only in Chrome/Edge

### 2. **No Backend Integration**
- Cannot run server-side code
- No database connections
- No API calls to backend services
- Purely frontend application

### 3. **No Code Execution**
- Cannot run JavaScript/Python code
- No terminal or console execution
- Cannot test code directly
- Need external tools to run programs

### 4. **Memory Limitations**
- Browser memory constraints
- Large projects may cause slowdowns
- Limited to ~50-100 files recommended
- No pagination for huge projects

### 5. **No Version Control**
- No built-in Git integration
- Cannot commit/push changes
- No branching or merging
- Manual project versioning only

### 6. **Storage Persistence**
- Files lost on page refresh (unless downloaded)
- No automatic save to browser storage
- Must download before closing
- No cloud backup

### 7. **Limited Collaboration**
- No real-time collaboration
- Cannot share live editing sessions
- No multi-user support
- Single-user only

### 8. **No Debugging Tools**
- No breakpoints
- No step-through debugging
- No variable inspection
- Limited error reporting

### 9. **Performance on Large Files**
- Monaco editor struggles with 10,000+ line files
- No file chunking
- Full file loads into memory
- May freeze on very large files

### 10. **No Package Management**
- Cannot install npm packages
- No dependency resolution
- No package.json execution
- Manual library inclusion only

### 11. **Browser Tab Dependency**
- Closing tab loses unsaved work (with warning)
- Cannot run in background
- Refresh resets everything
- No persistent workspace

### 12. **Limited Language Support**
- Syntax highlighting only
- No language servers
- No advanced refactoring
- No auto-imports

## 🎯 Ideal Use Cases

### ✅ Best For:
- **Learning & Education**: Teaching programming basics
- **Quick Prototyping**: Testing small code snippets
- **Code Sharing**: Creating shareable code examples
- **Interviews**: Coding challenges and assessments
- **Demos**: Showcasing code to others
- **Restricted Environments**: Systems without admin rights
- **Lightweight Editing**: Small projects and scripts

### ❌ Not Recommended For:
- **Production Applications**: Use real VS Code or WebStorm
- **Large Codebases**: 1000+ files
- **Team Development**: No collaboration features
- **Backend Development**: Cannot run server code
- **Full-Stack Projects**: No terminal or execution
- **Long-Term Projects**: No persistent storage

## 🔄 Comparison with Alternatives

| Feature | CodeStudio IDE | VS Code | CodeSandbox | StackBlitz |
|---------|---------------|---------|-------------|------------|
| Browser-Based | ✅ | ❌ | ✅ | ✅ |
| Offline | ✅ | ✅ | ❌ | ⚠️ |
| No Installation | ✅ | ❌ | ✅ | ✅ |
| Code Execution | ❌ | ✅ | ✅ | ✅ |
| Version Control | ❌ | ✅ | ✅ | ✅ |
| Free | ✅ | ✅ | ⚠️ | ⚠️ |
| File System | ⚠️ | ✅ | ❌ | ❌ |
| Privacy | ✅ | ✅ | ⚠️ | ⚠️ |
| Customizable | ✅ | ✅ | ❌ | ❌ |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: \`git checkout -b feature/amazing-feature\`
3. **Commit changes**: \`git commit -m 'Add amazing feature'\`
4. **Push to branch**: \`git push origin feature/amazing-feature\`
5. **Open a Pull Request**

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- **Monaco Editor**: Microsoft's excellent code editor
- **Material-UI**: Beautiful React components
- **Vite**: Lightning-fast build tool
- **React**: The amazing UI library
- **VS Code**: Design inspiration

---

**Note**: This is an educational project and not intended to replace professional IDEs for production development.
