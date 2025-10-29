import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode, GetApp, FolderOpen } from '@mui/icons-material';
import { useThemeMode } from '../contexts/ThemeContext';

const TitleBar = ({ onOpenFolder, onDownload, hasOpenFiles }) => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box
      sx={{
        height: 35,
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
      }}
    >
      {/* Left: App Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          CodeStudio IDE
        </Typography>
      </Box>

      {/* Right: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title="Open Folder">
          <IconButton size="small" onClick={onOpenFolder} sx={{ padding: 0.5 }}>
            <FolderOpen sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download Current File">
          <span>
            <IconButton
              size="small"
              onClick={onDownload}
              disabled={!hasOpenFiles}
              sx={{ padding: 0.5 }}
            >
              <GetApp sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}>
          <IconButton size="small" onClick={toggleTheme} sx={{ padding: 0.5 }}>
            {mode === 'dark' ? <LightMode sx={{ fontSize: 18 }} /> : <DarkMode sx={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TitleBar;
