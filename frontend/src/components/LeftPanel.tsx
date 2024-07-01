import * as types from '../utils/types';
import LeftPanelTop from './LeftPanelTop';
import SearchResults from './SearchResults';
/** */
import { colors } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const LeftPanel = styled(Box)`
  background: ${colors.cyan[200]};
  grid-area: ltp;
  display: grid;
  grid-template-rows: ${types.TLayoutParameters.PANEL_TOP_PX}px 12fr 0.7fr;
  grid-template-areas:
    'lpsb'
    'lpsr'
    'lpsf';
  height: calc(
    100vh -
      ${types.TLayoutParameters.MARGIN_TOP_PX +
      types.TLayoutParameters.FOOTER_HEIGHT_PX}px
  );
`;
const LeftPanelSearchResultsBottom = styled(Box)`
  grid-area: lpsf;
  background: ${colors.amber[200]};
`;
export default () => (
  <LeftPanel className="left-panel">
    <LeftPanelTop />
    <SearchResults dataSource={types.TDataSource.LIVE} />
    <LeftPanelSearchResultsBottom />
  </LeftPanel>
);
