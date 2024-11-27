import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Card,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import PrivateRoute from '../../components/PrivateRoute';

const PREFIX = 'Boat';

const classes = {
  root: `${PREFIX}-root`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
  container: `${PREFIX}-container`,
  form: `${PREFIX}-form`,
  formField: `${PREFIX}-formField`,
  submitButton: `${PREFIX}-submitButton`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },
  [`& .${classes.title}`]: {
    flexGrow: 1,
  },
  [`& .${classes.container}`]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(3),
  },
  [`& .${classes.formField}`]: {
    width: '100%',
  },
  [`& .${classes.submitButton}`]: {
    marginTop: theme.spacing(2),
  },
}));

const boatTypes = [
  'Voilier',
  'Catamaran',
  'Yacht à moteur',
  'Semi-rigide',
  'Bateau de pêche',
  'Autre',
];

export default function BoatPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    length: '',
    width: '',
    draft: '',
    manufacturer: '',
    model: '',
    year: '',
    registrationNumber: '',
    homePort: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (user) {
      const fetchBoatData = async () => {
        const boatDoc = await getDoc(doc(db, 'boats', user.uid));
        if (boatDoc.exists()) {
          setFormData(boatDoc.data());
        }
      };
      fetchBoatData();
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, 'boats', user.uid), formData);
      setSnackbar({
        open: true,
        message: 'Informations du bateau sauvegardées avec succès',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la sauvegarde',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <PrivateRoute>
      <Root className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => window.location.href = '/profile'}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Mon Bateau
            </Typography>
          </Toolbar>
        </AppBar>

        <Container className={classes.container}>
          <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.formField}
                    label="Nom du bateau"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formField} required>
                    <InputLabel>Type de bateau</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      label="Type de bateau"
                    >
                      {boatTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.formField}
                    label="Année de construction"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    inputProps={{ min: 1900, max: new Date().getFullYear() }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={classes.formField}
                    label="Longueur (m)"
                    name="length"
                    type="number"
                    value={formData.length}
                    onChange={handleChange}
                    inputProps={{ step: 0.1 }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={classes.formField}
                    label="Largeur (m)"
                    name="width"
                    type="number"
                    value={formData.width}
                    onChange={handleChange}
                    inputProps={{ step: 0.1 }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={classes.formField}
                    label="Tirant d'eau (m)"
                    name="draft"
                    type="number"
                    value={formData.draft}
                    onChange={handleChange}
                    inputProps={{ step: 0.1 }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.formField}
                    label="Constructeur"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.formField}
                    label="Modèle"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.formField}
                    label="Numéro d'immatriculation"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.formField}
                    label="Port d'attache"
                    name="homePort"
                    value={formData.homePort}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    fullWidth
                  >
                    Sauvegarder
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Root>
    </PrivateRoute>
  );
}
