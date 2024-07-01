import React, { useState } from 'react';
import * as types from '../utils/types.ts';
import * as helpers from '../utils/helpers.ts';
/** */
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

export const ModalUserProfile = (props: {
  person: types.TRandomPerson;
  source: types.TDataSource;
  setNameEditted: React.Dispatch<React.SetStateAction<string>>;
  isErrorInput: boolean;
  setIsErrorInput: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { person, source, setNameEditted, isErrorInput, setIsErrorInput } =
    props;
  const [isEditingName, setIsEdittingName] = useState(false);

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: 5 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Avatar
              alt={person.name.first + ' ' + person.name.last}
              src={person.picture.large}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isEditingName ? (
                <TextField
                  id="outlined-basic"
                  label="Edit name"
                  variant="outlined"
                  error={isErrorInput}
                  defaultValue={person.name.first + ' ' + person.name.last}
                  onChange={(e) => {
                    if (helpers.isValidInput(e.target.value)) {
                      setIsErrorInput(false);
                      setNameEditted(e.target.value);
                    } else {
                      setIsErrorInput(true);
                    }
                  }}
                />
              ) : (
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ marginRight: 1 }}
                >
                  {person.name.title} {person.name.first} {person.name.last}
                </Typography>
              )}

              <IconButton
                aria-label="edit"
                onClick={() => setIsEdittingName(true)}
              >
                <ModeEditIcon />
              </IconButton>
            </Box>

            <Typography variant="body2" color="text.secondary">
              {person.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Location</Typography>
            <Typography variant="body2" color="text.secondary">
              {person.location.street.number} {person.location.street.name},{' '}
              {person.location.city}, {person.location.state},{' '}
              {person.location.country}, {person.location.postcode}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Date of Birth</Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(person.dob.date).toLocaleDateString()} (Age:{' '}
              {person.dob.age})
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Phone</Typography>
            <Typography variant="body2" color="text.secondary">
              {person.phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Cell</Typography>
            <Typography variant="body2" color="text.secondary">
              {person.cell}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Nationality</Typography>
            <Typography variant="body2" color="text.secondary">
              {person.nat}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Registered</Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(person.registered.date).toLocaleDateString()} (Age:{' '}
              {person.registered.age})
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">UUID</Typography>
            <Typography variant="body2" color="text.secondary">
              {person.login.uuid}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Data source</Typography>
            <Typography variant="body2" color="text.secondary">
              {source}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
