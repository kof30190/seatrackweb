import React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Map as MapIcon,
  WbSunny as WeatherIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';

const PREFIX = 'Home';

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  container: `${PREFIX}-container`,
  card: `${PREFIX}-card`,
  icon: `${PREFIX}-icon`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
  },
  [`& .${classes.title}`]: {
    flexGrow: 1,
  },
  [`& .${classes.container}`]: {
    marginTop: theme.spacing(4),
  },
  [`& .${classes.card}`]: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[4],
    },
  },
  [`& .${classes.icon}`]: {
    fontSize: 48,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

export default function Home() {
  const menuItems = [
    {
      title: 'Navigation',
      icon: <MapIcon className={classes.icon} />,
      href: '/map',
    },
    {
      title: 'Météo',
      icon: <WeatherIcon className={classes.icon} />,
      href: '/weather',
    },
    {
      title: 'Profil',
      icon: <ProfileIcon className={classes.icon} />,
      href: '/profile',
    },
  ];

  return (
    <Root className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SeaTrack
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        <Grid container spacing={4}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                className={classes.card}
                onClick={() => window.location.href = item.href}
              >
                <CardContent>
                  {item.icon}
                  <Typography variant="h6" component="h2">
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Root>
  );
}
