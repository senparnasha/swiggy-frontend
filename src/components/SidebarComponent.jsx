import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Form from './Form';
import Admin from './Admin';

const Sidebar = ({ handleOptionClick }) => (
  <Box
    sx={{ 
      width: 250,
      backgroundColor: '#fafafa', // Adjust background color as needed
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 0,
      backgroundColor:'#9BC680'
    }}
  >
    <List>
      {['Form', 'Admin'].map((text) => (
        <ListItem key={text} disablePadding onClick={() => handleOptionClick(text)}>
          <ListItemButton>
            <ListItemIcon>
              {text === 'Form' ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default function SidebarWithContent() {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div style={{ display: 'flex', }}>
      <Sidebar handleOptionClick={handleOptionClick} />
      <div style={{ marginLeft: 250, padding: '20px', }}>
        {/* Render the selected component */}
        {selectedOption === 'Form' && <Form />}
        {selectedOption === 'Admin' && <Admin />}
      </div>
    </div>
  );
}
