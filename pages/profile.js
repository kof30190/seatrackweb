import React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  DirectionsBoat as BoatIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

const PREFIX = 'Profile';

const classes = {
  root: `${PREFIX}-root`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
  container: `${PREFIX}-container`,
  profileCard: `${PREFIX}-profileCard`,
  avatar: `${PREFIX}-avatar`,
  profileName: `${PREFIX}-profileName`,
  profileEmail: `${PREFIX}-profileEmail`,
  listSection: `${PREFIX}-listSection`,
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
  [`& .${classes.profileCard}`]: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  [`& .${classes.avatar}`]: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  [`& .${classes.profileName}`]: {
    marginBottom: theme.spacing(1),
  },
  [`& .${classes.profileEmail}`]: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.listSection}`]: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default function ProfilePage() {
  const menuItems = [
    {
      icon: <PersonIcon />,
      text: 'Informations personnelles',
      onClick: () => console.log('Informations personnelles'),
    },
    {
      icon: <BoatIcon />,
      text: 'Mon bateau',
      onClick: () => console.log('Mon bateau'),
    },
    {
      icon: <SettingsIcon />,
      text: 'Paramètres',
      onClick: () => console.log('Paramètres'),
    },
    {
      icon: <HelpIcon />,
      text: 'Aide',
      onClick: () => console.log('Aide'),
    },
  ];

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
            Profil
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        <Card className={classes.profileCard}>
          <Avatar className={classes.avatar}>
            <PersonIcon style={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" className={classes.profileName}>
            Utilisateur
          </Typography>
          <Typography variant="body1" className={classes.profileEmail}>
            utilisateur@example.com
          </Typography>
        </Card>

        <Card className={classes.listSection}>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem button onClick={item.onClick}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
                {index < menuItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      </Container>
    </Root>
  );
}
