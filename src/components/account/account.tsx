import { useEffect,useState } from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { AccountProfile } from '../../components/account/account-profile';
import { AccountProfileDetails } from '../../components/account/account-profile-details';
import useSui from '../../hooks/useSui';

const Account = () => {
  let { createUser, deleteUser, isUser } = useSui();
  const [user,setUser] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setUser(await isUser());
    }
    fetchData();
  }, [isUser])

  const deleteAccount = async () => {
    await deleteUser();
    setUser(await isUser());
  }
  
  
  return(
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      {user ?
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
            <Button
            color="error"
            variant="contained"
            sx={{ m: 1 }}
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
          </Grid>
        </Grid>
      </Container>
      : 
      <Grid container>
        <Grid item sm={12}>
          <Box display="flex" justifyContent="center">
              <Button                     
                        color="secondary"
                        component="a"
                        variant="contained"
                        onClick={createUser}>Create User</Button>
          </Box>
        </Grid>
      </Grid>}
    </Box>
  </>
  );
};



export default Account;
