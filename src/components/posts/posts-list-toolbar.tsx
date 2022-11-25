import {
    Box,
    Button,
    Typography,
  } from '@mui/material';
import {
    Upload as UploadIcon,
    Download as DownloadIcon   
    } from '@mui/icons-material';

  
  export const PostsListToolbar = (props: any) => (
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
          Posts
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            color="primary"
            variant="contained"
          >
            Add Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
  