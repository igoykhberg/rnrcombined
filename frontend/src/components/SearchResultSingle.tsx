import React, { useContext } from 'react';
import * as types from '../utils/types';
import { AppContext } from '../context/app.context';

/** */
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const EmptyResult = () => {
  return (
    <Typography variant="overline" display="block" gutterBottom>
      N/A
    </Typography>
  );
};

export default (props: {
  person: types.TRandomPerson;
  dataSource: types.TDataSource;
}) => {
  const { person, dataSource } = props;
  const ac = useContext(AppContext);

  return (
    <TableRow
      onClick={(e) => {
        e.preventDefault();
        if (ac.dispatch) {
          ac.dispatch({
            type: types.TAppActions.ACTION_APP_TOGGLE_MODAL,
            payload: {
              isModalOpen: true,
              modified: {
                source: dataSource,
                data: person,
              },
            },
          });
        }
      }}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
        }}
        component="th"
        scope="row"
      >
        {/* <LeftPanelSearchResultSingleAddToStatsButton player={person} /> */}
        <Avatar
          src={person?.picture?.thumbnail}
          sx={{ flexShrink: 0 }}
          alt={`${person?.name?.first}${person?.name?.last}`}
        />
      </TableCell>
      <TableCell>{`${person?.name?.title} ${person?.name?.first} ${person?.name?.last}`}</TableCell>
      <TableCell align="center">{person?.gender || <EmptyResult />}</TableCell>
      <TableCell align="center">
        {person?.location?.country || <EmptyResult />}
      </TableCell>
      <TableCell align="center">{person?.phone || <EmptyResult />}</TableCell>
      <TableCell align="center">{person?.email || <EmptyResult />}</TableCell>
    </TableRow>
  );
};
