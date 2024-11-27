import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Opacity as OpacityIcon,
  Speed as SpeedIcon,
  Compress as CompressIcon,
} from '@mui/icons-material';
import axios from 'axios';

const API_KEY = 'e34773f836b56f5922b2184107992c88';

const PREFIX = 'Weather';

const classes = {
  root: `${PREFIX}-root`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
  container: `${PREFIX}-container`,
  card: `${PREFIX}-card`,
  weatherMain: `${PREFIX}-weatherMain`,
  temperature: `${PREFIX}-temperature`,
  description: `${PREFIX}-description`,
  detailCard: `${PREFIX}-detailCard`,
  detailItem: `${PREFIX}-detailItem`,
  detailIcon: `${PREFIX}-detailIcon`,
  loadingContainer: `${PREFIX}-loadingContainer`,
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
  [`& .${classes.card}`]: {
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.weatherMain}`]: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  [`& .${classes.temperature}`]: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.description}`]: {
    fontSize: '1.2rem',
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
  },
  [`& .${classes.detailCard}`]: {
    height: '100%',
  },
  [`& .${classes.detailItem}`]: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.detailIcon}`]: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  [`& .${classes.loadingContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
}));

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`
            );
            setWeather(response.data);
          } catch (err) {
            setError("Impossible de récupérer les données météo");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError("Impossible d'obtenir votre position");
          setLoading(false);
        }
      );
    }
  }, []);

  if (loading) {
    return (
      <Root className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => window.location.href = '/'}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Météo
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      </Root>
    );
  }

  if (error) {
    return (
      <Root className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => window.location.href = '/'}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Météo
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.container}>
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        </Container>
      </Root>
    );
  }

  return (
    <Root className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => window.location.href = '/'}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Météo
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        {weather && (
          <>
            <Card className={classes.card}>
              <CardContent className={classes.weatherMain}>
                <Typography className={classes.temperature}>
                  {Math.round(weather.main.temp)}°C
                </Typography>
                <Typography className={classes.description}>
                  {weather.weather[0].description}
                </Typography>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card className={classes.detailCard}>
                  <CardContent>
                    <div className={classes.detailItem}>
                      <OpacityIcon className={classes.detailIcon} />
                      <div>
                        <Typography variant="subtitle2">Humidité</Typography>
                        <Typography variant="h6">
                          {weather.main.humidity}%
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card className={classes.detailCard}>
                  <CardContent>
                    <div className={classes.detailItem}>
                      <SpeedIcon className={classes.detailIcon} />
                      <div>
                        <Typography variant="subtitle2">Vent</Typography>
                        <Typography variant="h6">
                          {Math.round(weather.wind.speed * 3.6)} km/h
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Card className={classes.detailCard}>
                  <CardContent>
                    <div className={classes.detailItem}>
                      <CompressIcon className={classes.detailIcon} />
                      <div>
                        <Typography variant="subtitle2">Pression</Typography>
                        <Typography variant="h6">
                          {weather.main.pressure} hPa
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Root>
  );
}
