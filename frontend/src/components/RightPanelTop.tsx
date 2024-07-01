import React, { useState, useContext } from 'react';
import { FetchContext } from '../context/fetch.context';
import * as types from '../utils/types';
/** */
import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import HistoryIcon from '@mui/icons-material/History';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';

const RightPanelTop = styled(Box)`
  grid-area: rptb;
  background: ${colors.green[200]};
`;

const RightPanelTopWrapper = styled(Box)(({ theme }) => ({
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
    <RightPanelTop className="right-panel-top">
      <Box className="right-panel-box-flexgrow" sx={{ flexGrow: 1 }}>
        <Toolbar className="right-panel-top-toolbar">
          <RightPanelTopWrapper className="right-panel-top-wrapper">
            <Button
              variant="outlined"
              startIcon={<HistoryIcon />}
              onClick={(e) => {
                e.preventDefault();
                if (fc.dispatch)
                  fc.dispatch({
                    type: types.TFetchActions
                      .ACTION_SEARCH_START_PROCESS_HISTORY,
                    payload: {},
                  });
              }}
            >
              History
            </Button>
          </RightPanelTopWrapper>
        </Toolbar>
      </Box>
      {fc.state.isLoadingHistory && (
        <LinearProgress className="linear-progress-right" />
      )}
    </RightPanelTop>
  );
};
