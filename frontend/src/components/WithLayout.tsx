import { useContext } from 'react';
import { AppContext } from '../context/app.context';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CssBaseline } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { colors } from '@mui/material';
import * as types from '../utils/types';

// todo add type
export function WithLayout(props: any) {
  const ac = useContext(AppContext);

  return (
    <Paper>
      <CssBaseline />
      <Box className="with-layout-wrapper">
        <AppBar className="app-bar" component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>
          </Toolbar>
        </AppBar>
        {/**
         * todo: media queries here
         */}
        <Box
          className="main-props-children-wrapper"
          sx={{
            marginTop: `${types.TLayoutParameters.MARGIN_TOP_PX}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.children}
        </Box>
        <Box
          sx={{
            height: `${types.TLayoutParameters.FOOTER_HEIGHT_PX}px`,
            background: colors.grey[200],
          }}
        ></Box>
      </Box>
    </Paper>
  );
}
