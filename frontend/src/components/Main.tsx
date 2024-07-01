import React, { useContext } from 'react';
import { AppContext } from '../context/app.context';
import * as types from '../utils/types.ts';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import SystemLogs from './SystemLogs';
import Modal from './Modal';
/** */
import { colors } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// todo media query
const Main = styled(Box)`
  padding: 22px;
`;

const MainContent = styled(Box)`
  display: grid;
  grid-template-columns: 50fr 50fr;
  grid-template-rows: 80px 9fr;
  grid-template-areas:
    'sys sys'
    'ltp rtp';
  background: ${colors.indigo[200]};
  width: 90vw;
  gap: 7px;
  padding: 18px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'sys'
      'ltp'
      'rtp';
  }
`;
export default () => {
  const ac = useContext(AppContext);

  return (
    <Main className="main-panel-content-container">
      <MainContent className="main-panel-content">
        <LeftPanel />
        <RightPanel />
        <SystemLogs />
        {ac.state.isModalOpen && <Modal />}
      </MainContent>
    </Main>
  );
};
