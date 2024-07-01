import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { AppContext } from '../context/app.context';

import { colors } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import SystemLogSingle from './SystemLogSingle';

const SystemLogs = styled(Box)`
  background: ${colors.blueGrey[50]};
  grid-area: sys;
`;
const SystemLogsWrapper = styled(Box)`
  overflow-y: scroll;
  height: 100%;
`;

export default () => {
  const ac = useContext(AppContext);
  const sref: any = useRef('systemL-gs');
  useEffect(() => {
    sref.current.scrollTop = sref.current.scrollHeight;
  }, [ac.state.systemLogs]);
  return (
    <SystemLogs className="system-logs">
      <SystemLogsWrapper className="system-logs-wrapper" ref={sref}>
        <Paper>
          {ac.state.systemLogs.map((log) => (
            <SystemLogSingle key={log.guid} log={log} />
          ))}
        </Paper>
      </SystemLogsWrapper>
    </SystemLogs>
  );
};
