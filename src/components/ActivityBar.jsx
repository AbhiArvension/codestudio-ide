import { Box, IconButton, Tooltip } from '@mui/material';
import {
  FolderOpen,
  Search,
  SourceOutlined,
  Extension,
  Settings,
} from '@mui/icons-material';

const ActivityBar = ({ activeView, onViewChange }) => {
  const activities = [
    { id: 'explorer', icon: <FolderOpen />, tooltip: 'Explorer' },
    { id: 'search', icon: <Search />, tooltip: 'Search' },
    { id: 'source', icon: <SourceOutlined />, tooltip: 'Source Control' },
    { id: 'extensions', icon: <Extension />, tooltip: 'Extensions' },
  ];

  return (
    <Box
      sx={{
        width: 48,
        backgroundColor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 1,
        paddingBottom: 1,
      }}
    >
      {/* Main Activities */}
      <Box sx={{ flex: 1 }}>
        {activities.map((activity) => (
          <Tooltip key={activity.id} title={activity.tooltip} placement="right">
            <IconButton
              onClick={() => onViewChange(activity.id)}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 0,
                color: activeView === activity.id ? 'primary.main' : 'text.secondary',
                borderLeft: activeView === activity.id ? 2 : 0,
                borderColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {activity.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Settings at Bottom */}
      <Tooltip title="Settings" placement="right">
        <IconButton
          onClick={() => onViewChange('settings')}
          sx={{
            width: 48,
            height: 48,
            borderRadius: 0,
            color: activeView === 'settings' ? 'primary.main' : 'text.secondary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Settings />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ActivityBar;
