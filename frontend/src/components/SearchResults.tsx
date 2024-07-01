import { useContext, useState, useEffect } from 'react';
import { FetchContext } from '../context/fetch.context';
import LeftPanelSearchResultSingle from './SearchResultSingle';
import EmptySearchResults from './EmptySearchResults';
import * as types from '../utils/types';
import EndOfSearchResults from './SearchResultsEnd';
import { useFuseSearch } from '../hooks/useFuseSearch';
/** */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, colors } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const LeftPanelSearchResults = styled(Box)`
  background: ${colors.amber[200]};
  grid-area: lpsr;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: 10fr 1fr;
`;

// function parseFilterData(fuseDisplayedData: any) {
//   const parsed = Object.entries(fuseDisplayedData)
//     .map((entry) => entry[1])
//     .map((entry: any) => entry.item);

//   return parsed;
// }

const getTableData = (
  data: types.TRandomPerson[],
  dataSource: types.TDataSource
) => {
  return data.map((person: types.TRandomPerson & any) => (
    <LeftPanelSearchResultSingle
      person={person}
      dataSource={dataSource}
      key={person?.login?.uuid}
    />
  ));
};
export default (props: { dataSource: types.TDataSource }) => {
  const { dataSource } = props;

  const fc = useContext(FetchContext);

  const [data, setData] = useState(
    dataSource === types.TDataSource.LIVE
      ? fc.state.searchResults
      : fc.state.searchResultsHistory
  );

  // const searchTerm =
  //   dataSource === types.TDataSource.LIVE
  //     ? fc.state.dearchTerm
  //     : fc.state.dearchTermHistory;

  /** */
  const [loadingStatus, setIsLoadingStatus] = useState(
    dataSource === types.TDataSource.LIVE
      ? fc.state.isLoading
      : fc.state.isLoadingHistory
  );

  const [displayedResults, setDisplayedResults] =
    useState<types.TRandomPerson[]>(data);

  const filteredData = useFuseSearch(data, fc.state.searchTerm);

  useEffect(() => {
    setData(
      dataSource === types.TDataSource.LIVE
        ? fc.state.searchResults
        : fc.state.searchResultsHistory
    );
  }, [fc.state.searchResults, fc.state.searchResultsHistory]);

  useEffect(() => {
    setIsLoadingStatus(
      dataSource === types.TDataSource.LIVE
        ? fc.state.isLoading
        : fc.state.isLoadingHistory
    );
  }, [fc.state.searchResults, fc.state.searchResultsHistory]);

  useEffect(() => {
    setDisplayedResults(filteredData.length > 0 ? filteredData : data);
  }, [filteredData]);

  return (
    <LeftPanelSearchResults className="left-panel-search-results">
      <TableContainer component={Paper}>
        {data?.length > 0 && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {types.TSearchResultsTableHeaders.THUMBNAIL}
                </TableCell>
                <TableCell>{types.TSearchResultsTableHeaders.NAME}</TableCell>
                <TableCell align="center">
                  {types.TSearchResultsTableHeaders.GENDER}
                </TableCell>
                <TableCell align="center">
                  {types.TSearchResultsTableHeaders.COUNTRY}
                </TableCell>
                <TableCell align="center">
                  {types.TSearchResultsTableHeaders.PHONE}
                </TableCell>
                <TableCell align="center">
                  {types.TSearchResultsTableHeaders.EMAIL}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{getTableData(data, dataSource)}</TableBody>
          </Table>
        )}
        {data?.length === 0 && !loadingStatus && <EmptySearchResults />}
      </TableContainer>

      <EndOfSearchResults />
    </LeftPanelSearchResults>
  );
};
