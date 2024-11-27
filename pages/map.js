import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  MyLocation as MyLocationIcon,
} from '@mui/icons-material';

// Import map components dynamically to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const PREFIX = 'Map';

const classes = {
  root: `${PREFIX}-root`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
  mapContainer: `${PREFIX}-mapContainer`,
  loadingContainer: `${PREFIX}-loadingContainer`,
  map: `${PREFIX}-map`,
  locationButton: `${PREFIX}-locationButton`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },
  [`& .${classes.title}`]: {
    flexGrow: 1,
  },
  [`& .${classes.mapContainer}`]: {
    flexGrow: 1,
    position: 'relative',
  },
  [`& .${classes.loadingContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  [`& .${classes.map}`]: {
    height: '100%',
  },
  [`& .${classes.locationButton}`]: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
}));

export default function MapPage() {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setPosition([48.8566, 2.3522]); // Default to Paris
          setLoading(false);
        }
      );
    }
  }, []);

  const handleLocationClick = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          map?.setView([latitude, longitude], 13);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

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
              Navigation
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
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
            Navigation
          </Typography>
        </Toolbar>
      </AppBar>
      
      <div className={classes.mapContainer}>
        {position && (
          <>
            <MapContainer
              center={position}
              zoom={13}
              className={classes.map}
              ref={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  Votre position actuelle
                </Popup>
              </Marker>
            </MapContainer>
            <Paper className={classes.locationButton}>
              <IconButton
                color="primary"
                onClick={handleLocationClick}
                size="large"
              >
                <MyLocationIcon />
              </IconButton>
            </Paper>
          </>
        )}
      </div>
    </Root>
  );
}
