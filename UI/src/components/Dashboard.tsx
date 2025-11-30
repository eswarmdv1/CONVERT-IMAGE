import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ImageIcon from '@mui/icons-material/Image';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

interface DashboardProps {
  open: boolean;
  onClose?: () => void;
}

const DRAWER_WIDTH = 260;

export default function Dashboard({ open, onClose }: DashboardProps) {
  const menuItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', id: 'dashboard' },
    { icon: <ImageIcon />, label: 'Images', id: 'images' },
    { icon: <SettingsIcon />, label: 'Settings', id: 'settings' },
    { icon: <HelpIcon />, label: 'Help', id: 'help' },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#f7f6f6ff',
      }}
    >
      <List sx={{ flex: 1, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
                '&.Mui-selected': {
                  backgroundColor: '#bbdefb',
                  '&:hover': {
                    backgroundColor: '#90caf9',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: '#1976d2', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
              style={{ color: '#1976d2' }}
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: 500,
                    fontSize: '14px',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          width: DRAWER_WIDTH,
          backgroundColor: '#fafafa',
          borderRight: '1px solid #e0e0e0',
          display: { xs: 'none', sm: 'block' },
          height: '100%',
          mt: '64px',
          position: 'fixed',
          top: 0,
          left: 0,
          overflowY: 'auto',
        }}
      >
        {drawerContent}
      </Box>

      {/* Mobile Drawer - Overlay */}
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
