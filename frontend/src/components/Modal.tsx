import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/app.context';
import { FetchContext } from '../context/fetch.context';
import * as types from '../utils/types';
import { ModalUserProfile } from './ModalUserProfile';
import * as helpers from '../utils/helpers';
import * as api from '../utils/api';
import { produce } from 'immer';
/** */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const ac = useContext(AppContext);
  const fc = useContext(FetchContext);

  const [nameEditted, setNameEditted] = useState('');
  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
  const [isSubmittingSave, setIsSubmittingSave] = useState(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
  const [isErrorInput, setIsErrorInput] = useState(false);

  const handleClose = () => {
    if (ac.dispatch)
      ac.dispatch({
        type: types.TAppActions.ACTION_APP_TOGGLE_MODAL,
        payload: {
          isModalOpen: false,
        },
      });
  };

  const handleUpdate = async () => {
    if (
      // update data from live search
      ac.state.modified.source === types.TDataSource.LIVE &&
      fc.dispatch &&
      ac.dispatch
    ) {
      fc.dispatch({
        type: types.TFetchActions.ACTION_UPDATE_SEARCH_RESULTS,
        payload: {
          person: ac.state.modified,
          nameEditted: nameEditted,
        },
      });

      ac.dispatch({
        type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
        payload: {
          severity: types.TSeverity.SEVERITY_SUCCESS,
          message: 'SUCCESS_MODIFY_LIVE_DATA' + ` for: ${nameEditted}`,
        },
      });
      handleClose();
    } else if (
      // update data from history search
      ac.state.modified.source === types.TDataSource.HISTORY &&
      ac.dispatch &&
      fc.dispatch
    ) {
      try {
        setIsSubmittingUpdate(true);

        const newFirstName = nameEditted.split(' ')[0];
        const newLastName = nameEditted.split(' ')[1];

        const dataToSave = produce(
          ac.state.modified.data,
          (draft: types.TRandomPerson): any => {
            draft.name.first = newFirstName;
            draft.name.last = newLastName;
          }
        );

        await api.pplSave(dataToSave);
        await helpers.delay();
        ac.dispatch({
          type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
          payload: {
            severity: types.TSeverity.SEVERITY_SUCCESS,
            message:
              'SUCCESS_MODIFY_HISTORY_DATA' +
              ` for: ${newFirstName} + ${newLastName}`,
          },
        });

        fc.dispatch({
          type: types.TFetchActions.ACTION_SEARCH_START_PROCESS_HISTORY,
          payload: {},
        });

        handleClose();
      } catch (err) {
        console.dir({ FROM: 'handleUpdate', err: err });
        ac.dispatch({
          type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
          payload: {
            severity: types.TSeverity.SEVERITY_ERROR,
            message: 'ERROR_UPDATING_HISTORY' + ` for: ${nameEditted}`,
          },
        });
      }
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmittingSave(true);

      const dataToSave = produce(
        ac.state.modified.data,
        (draft: types.TRandomPerson): any => {}
      );
      await api.pplSave(dataToSave);
      await helpers.delay();
      if (ac.dispatch)
        ac.dispatch({
          type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
          payload: {
            severity: types.TSeverity.SEVERITY_SUCCESS,
            message:
              'SUCCESS_SAVE_TO_HISTORY_DATA' +
              ` for: ${ac.state.modified.data.name.first} + ${ac.state.modified.data.name.last}`,
          },
        });

      if (fc.dispatch)
        fc.dispatch({
          type: types.TFetchActions.ACTION_SEARCH_START_PROCESS_HISTORY,
          payload: {},
        });

      handleClose();
    } catch (err) {
      console.dir({ FROM: 'handleUpdate', err: err });
      if (ac.dispatch) {
        ac.dispatch({
          type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
          payload: {
            severity: types.TSeverity.SEVERITY_ERROR,
            message:
              'ERROR_SAVING' +
              ` for: ${ac.state.modified.data.name.first} ${ac.state.modified.data.name.last}`,
          },
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmittingDelete(true);

      const dataToDelete = produce(
        ac.state.modified.data,
        (draft: types.TRandomPerson): any => {}
      );
      await api.pplDelete(dataToDelete);
      await helpers.delay();

      if (ac.dispatch)
        ac.dispatch({
          type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
          payload: {
            severity: types.TSeverity.SEVERITY_SUCCESS,
            message:
              'SUCCESS_DELETE_HISTORY_DATA' +
              ` for: ${ac.state.modified.data.name.first} + ${ac.state.modified.data.name.last}`,
          },
        });

      if (fc.dispatch)
        fc.dispatch({
          type: types.TFetchActions.ACTION_SEARCH_START_PROCESS_HISTORY,
          payload: {},
        });
      handleClose();
    } catch (err) {
      console.dir({ FROM: 'handleDelete', err: err });
      if (ac.dispatch) {
        ac.dispatch({
          type: types.TAppActions.ACTION_APP_ADD_SYSTEM_LOG,
          payload: {
            severity: types.TSeverity.SEVERITY_ERROR,
            message:
              'ERROR_DELETE' +
              ` for: ${ac.state.modified.data.name.first} ${ac.state.modified.data.name.last}`,
          },
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Modify Person Data
            </Typography>
          </Toolbar>
        </AppBar>

        <ModalUserProfile
          source={ac.state.modified.source}
          person={ac.state.modified.data}
          setNameEditted={setNameEditted}
          isErrorInput={isErrorInput}
          setIsErrorInput={setIsErrorInput}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <Button
            autoFocus
            onClick={handleSave}
            disabled={
              isErrorInput ||
              ac.state.modified.source === types.TDataSource.HISTORY
            }
          >
            {isSubmittingSave ? <CircularProgress size={20} /> : 'save'}
          </Button>
          <Button
            autoFocus
            onClick={handleDelete}
            sx={{ mx: 2 }}
            disabled={ac.state.modified.source === types.TDataSource.LIVE}
          >
            {isSubmittingDelete ? <CircularProgress size={20} /> : 'delete'}
          </Button>
          <Button
            autoFocus
            onClick={handleUpdate}
            disabled={isErrorInput || !nameEditted || isSubmittingUpdate}
          >
            {isSubmittingUpdate ? <CircularProgress size={20} /> : 'update'}
          </Button>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
