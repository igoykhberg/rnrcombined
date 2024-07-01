import { useContext } from 'react';
import { AppContext } from '../context/app.context';
import { FetchContext } from '../context/fetch.context';
import * as types from '../utils/types';
import * as helpers from '../utils/helpers';

/** */
import { colors } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LeftPanelTop = styled(Box)`
  background: ${colors.amber[200]};
  grid-area: lpsb;
`;

const LeftPanelTopWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export default () => {
  const fc = useContext(FetchContext);
  return (
    <LeftPanelTop className="left-panel-top">
      <Box className="left-panel-box-flexgrow" sx={{ flexGrow: 1 }}>
        <Toolbar className="left-panel-top-toolbar">
          <LeftPanelTopWrapper className="left-panel-top-wrapper">
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={(e) => {
                e.preventDefault();
                if (fc.dispatch)
                  fc.dispatch({
                    type: types.TFetchActions.ACTION_SEARCH_START_PROCESS,
                    payload: {},
                  });
              }}
            >
              Fetch
            </Button>

            {/* <TextField
              onChange={(e) => {
                e.preventDefault();
                if (fc.dispatch && helpers.isValidInput(e.target.value)) {
                  fc.dispatch({
                    type: types.TFetchActions.ACTION_SEARCH_TERM,
                    payload: {
                      searchTerm: e.target.value,
                    },
                  });
                }
              }}
            /> */}
          </LeftPanelTopWrapper>
        </Toolbar>
      </Box>
      {fc.state.isLoading && (
        <LinearProgress className="linear-progress-left" />
      )}
    </LeftPanelTop>
  );
};
