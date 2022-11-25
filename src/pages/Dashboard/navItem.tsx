import { Link as RedirectLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props: { [x: string]: any; href: any; icon: any; title: any; }) => {
  const { href, icon, title, page, ...others } = props;
  const active = true

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >

      <RedirectLink to={href} state={{ page: page }}>
        <Button
          component="a"
          startIcon={icon}
          fullWidth
          color="secondary"

        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </RedirectLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
