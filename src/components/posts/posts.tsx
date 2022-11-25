import { Box, Container, Grid, Pagination } from '@mui/material';
import { posts, Post } from '../../__mocks__/posts';
import { PostsListToolbar } from './posts-list-toolbar';
import { PostCard } from './post-card';


const Posts = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <PostsListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {posts.map((post: any) => (
              <Grid
                item
                key={post.id}
                lg={4}
                md={6}
                xs={12}
              >
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
);


export default Posts;
