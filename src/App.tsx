import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import { Navbar, Dashboard } from './components';
import ImagesListPreview from './modules/ImagesListPreview';

const DRAWER_WIDTH = 260;

function App() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed Navbar */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }}>
        <Navbar />
      </Box>

      {/* Main Layout below navbar */}
      <Box sx={{ display: 'flex', flex: 1, mt: '64px', overflow: 'hidden' }}>
        {/* Sidebar */}
        <Dashboard open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            ml: { xs: 0, sm: `${DRAWER_WIDTH}px` },
            overflow: 'hidden',
            transition: 'margin-left 0.3s ease',
          }}
        >
          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, mb: 2, p: { xs: 2, sm: 3, md: 4 }, position: 'absolute', zIndex: 10 }}>
            <IconButton
              color="primary"
              onClick={handleDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flex: 1,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <ImagesListPreview />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
