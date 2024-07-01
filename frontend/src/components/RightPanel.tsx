import * as types from '../utils/types';
import RightPanelTop from './RightPanelTop';
import SearchResults from './SearchResults';
/** */
import { colors } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const RightPanel = styled(Box)`
  background: ${colors.indigo[100]};
  grid-area: rtp;
  display: grid;
  grid-template-rows: ${types.TLayoutParameters.PANEL_TOP_PX}px 12fr 0.7fr;
  grid-template-areas:
    'rptb'
    'lpsr'
    'rpbb';

  height: calc(
    100vh -
      ${types.TLayoutParameters.MARGIN_TOP_PX +
      types.TLayoutParameters.FOOTER_HEIGHT_PX}px
  );
`;

const RightPanelBottom = styled(Box)`
  grid-area: rpbb;
  background: ${colors.green[200]};
`;

export default () => {
  return (
    <RightPanel className="right-panel">
      <RightPanelTop />
      <SearchResults dataSource={types.TDataSource.HISTORY} />
      <RightPanelBottom />
    </RightPanel>
  );
};
