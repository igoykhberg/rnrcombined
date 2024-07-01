import { colors } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EndOfSearchResults = styled(Box)`
  background: ${colors.grey[200]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid grey;
`;

export default () => {
  return (
    <EndOfSearchResults className="end-of-search-results">
      <Typography>End of results</Typography>
    </EndOfSearchResults>
  );
};
