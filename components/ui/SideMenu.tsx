import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { UiContext } from '@/context';

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

// Icons from Material, we imported in this way because the bundle in development is so slow
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import EscalatorWarningOutlinedIcon from '@mui/icons-material/EscalatorWarningOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  const navigateTo = (url: string) => {
    router.push(url);
    toggleSideMenu();
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
              type='text'
              placeholder='Search...'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'My Orders'} />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <MaleOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Men'}
              onClick={() => navigateTo('/category/men')}
            />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <FemaleOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Women'}
              onClick={() => navigateTo('/category/women')}
            />
          </ListItem>

          <ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <EscalatorWarningOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Kids'}
              onClick={() => navigateTo('/category/kid')}
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <VpnKeyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign In'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Products'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Orders'} />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Users'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
