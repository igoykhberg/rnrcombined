import React from 'react';
import * as types from '../utils/types';
import { colors } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const SystemLogSingle = styled(Box)`
  background: ${colors.amber[200]};
`;
const getIso = () => {
  const now = new Date();
  return now.toISOString();
};
export default React.memo((props: { log: types.TSystemLog }) => {
  const { log } = props;
  const logStr = `[${log.iso || getIso()}] ${log.message}`;

  return (
    <SystemLogSingle className="system-log-single">
      <Alert severity={log.severity || types.TSeverity.SEVERITY_INFO}>
        {logStr}
      </Alert>
    </SystemLogSingle>
  );
});
