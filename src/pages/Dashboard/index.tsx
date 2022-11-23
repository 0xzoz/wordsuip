import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './navbar';
import { DashboardSidebar } from './sidebar';
import { Box } from '@mui/material';
import Account from '../../components/account/account';
import Posts from '../../components/posts/posts';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const Dashboard = (props: any) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation()
  const { page } = location.state
  return (
    <div>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {page === 'account' ? <Account /> :
           page === 'posts' ? <Posts /> : <div></div>}

        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </div>
  );
};




