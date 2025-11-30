import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '300px',
      '&:focus': {
        width: '400px',
      },
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ width: '100%', boxSizing: 'border-box' }}>
      <Toolbar sx={{ px: { xs: 1, sm: 2, md: 3 }, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: { xs: '56px', sm: '64px' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: { xs: '.1rem', sm: '.2rem', md: '.3rem' },
              color: 'inherit',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
            }}
          >
            IMAGE
          </Typography>
        </Box>

        {/* Center Section - Search Bar */}
        <Search sx={{ 
          flex: '1 1  auto',
          maxWidth: { xs: '150px', sm: '250px', md: '400px' }, 
          mx: { xs: 0.5, sm: 1, md: 2 },
          display: { xs: 'none', sm: 'block' }
        }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Right Section - Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.75, md: 1 }, ml: 'auto' }}>
          
          {/* Mobile Search Icon */}
          <IconButton 
            color="inherit" 
            size="small" 
            sx={{ 
              display: { xs: 'inline-flex', sm: 'none' },
              p: { xs: '6px', sm: '8px' }
            }}
          >
            <SearchIcon sx={{ fontSize: '1.25rem' }} />
          </IconButton>

          {/* Notifications Button - Desktop only */}
          <Box sx={{ display: { xs: 'none', md: 'inline-flex' }, alignItems: 'center', gap: 0.5 }}>
            <IconButton 
              color="inherit" 
              size="small"
              sx={{ 
                p: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <NotificationsIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <Typography sx={{ display: { xs: 'none', lg: 'block' }, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              Notifications
            </Typography>
          </Box>

          {/* Help Button - Desktop only */}
          <Box sx={{ display: { xs: 'none', md: 'inline-flex' }, alignItems: 'center', gap: 0.5 }}>
            <IconButton 
              color="inherit" 
              size="small"
              sx={{ 
                p: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HelpIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
            <Typography sx={{ display: { xs: 'none', lg: 'block' }, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              Help
            </Typography>
          </Box>

          {/* Profile Avatar with Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: { xs: 0.25, sm: 0.5, md: 1 } }}>
            <IconButton
              onClick={handleMenuOpen}
              color="inherit"
              size="small"
              sx={{
                p: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 32, sm: 36, md: 40 },
                  height: { xs: 32, sm: 36, md: 40 },
                  backgroundColor: '#f0f0f0',
                  color: '#1976d2',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                }}
              >
                U
              </Avatar>
            </IconButton>
            <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              User
            </Typography>
          </Box>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
