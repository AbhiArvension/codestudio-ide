import { Box, IconButton, Typography } from '@mui/material';
import { Close, InsertDriveFile } from '@mui/icons-material';

const TabBar = ({ openFiles, activeFile, onTabClick, onTabClose }) => {
  if (openFiles.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 2,
        },
      }}
    >
      {openFiles.map((file, index) => (
        <Box
          key={file.path || index}
          onClick={() => onTabClick(file)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            minWidth: 120,
            maxWidth: 200,
            paddingX: 2,
            paddingY: 1,
            cursor: 'pointer',
            borderRight: 1,
            borderColor: 'divider',
            backgroundColor:
              activeFile?.path === file.path ? 'background.paper' : 'transparent',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            position: 'relative',
          }}
        >
          <InsertDriveFile sx={{ fontSize: 14, marginRight: 0.5, color: 'text.secondary' }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: 13,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {file.name}
          </Typography>
          {file.modified && (
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                marginLeft: 0.5,
                marginRight: 0.5,
              }}
            />
          )}
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(file);
            }}
            sx={{
              padding: 0.5,
              marginLeft: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Close sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default TabBar;
