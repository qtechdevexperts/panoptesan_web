import React from 'react';
import { Badge, IconButton, makeStyles } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '30px', // Adjust the size of the bell icon
  },
  badge: {
    fontSize: '11px',
    backgroundColor: 'red', 
    color: 'white', 
    border: '1px solid white',
    borderRadius: '50%', 
    padding: '4px', 
    minWidth: '9px', 
    height: '9px', 
    boxSizing: 'content-box', 
    margin: '5px',
    marginTop: '8px',
},
}));

const NotificationBell = ({ notificationCount }) => {
  const classes = useStyles();

  return (
    <IconButton color="inherit">
      <Badge
        badgeContent={notificationCount}
        color="secondary"
        classes={{ badge: classes.badge }}
      >
        <NotificationsIcon className={classes.icon} />
      </Badge>
    </IconButton>
  );
};

export default NotificationBell;

// import React from 'react';
// import { Badge, IconButton } from '@material-ui/core';
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
// import { faBell } from '@fontawesome/free-solid-svg-icons';

// const NotificationBell = ({ notificationCount }) => {
//   return (
//     <IconButton color="inherit">
//       <Badge badgeContent={notificationCount} color="secondary">
//         <FontAwesomeIcon icon={faBell} />
//       </Badge>
//     </IconButton>
//   );
// };

// export default NotificationBell;
