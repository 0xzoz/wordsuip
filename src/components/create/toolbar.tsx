import {
    Box,
    Button,
    Typography,
  } from '@mui/material';
import {
    Save as SaveIcon   
    } from '@mui/icons-material';

  
  export const Toolbar = (props: any) => (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Create Post 
        </Typography>
        <Box sx={{ m: 1 }}>
   
          <Button
            startIcon={(<SaveIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Save Draft
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            Publish
          </Button>
        </Box>
      </Box>
    </Box>
  );
  