import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const navigate = useNavigate();

  const buttons = [
    { label: 'Add BIM', path: '/add-bim' },
    { label: 'Add Worker', path: '/add-worker' },
    { label: 'Add Machine', path: '/add-machine' },
    { label: 'Add Production', path: '/add-production' },
    { label: 'Production List', path: '/production-list' },
    { label: 'View Report', path: '/report' },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ minHeight: '48px !important' }}>
        <Button 
          color="inherit" 
          onClick={() => navigate('/')} 
          size="small"
          sx={{ fontSize: '0.8rem' }}
        >
          Home
        </Button>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 0.5 }}>
          {buttons.map((button) => (
            <Button
              key={button.path}
              color="inherit"
              onClick={() => navigate(button.path)}
              size="small"
              sx={{ fontSize: '0.8rem' }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;