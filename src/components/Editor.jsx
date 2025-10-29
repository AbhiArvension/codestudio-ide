import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Box } from '@mui/material';
import { useThemeMode } from '../contexts/ThemeContext';

const Editor = ({ code, onChange, language }) => {
  const { mode } = useThemeMode();

  const handleEditorChange = (value) => {
    onChange(value);
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MonacoEditor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme={mode === 'dark' ? 'vs-dark' : 'light'}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          foldingHighlight: true,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          bracketPairColorization: {
            enabled: true,
          },
          guides: {
            indentation: true,
            bracketPairs: true,
          },
          contextmenu: true,
          find: {
            addExtraSpaceOnTop: false,
            autoFindInSelection: 'never',
            seedSearchStringFromSelection: 'selection',
          },
        }}
      />
    </Box>
  );
};

export default Editor;
