import React from 'react';
import StatTypePresence from '../charts/StatTypePresence';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Pokemoni from '../asset/images/pokemon.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

function Pokemon() {
  const openLink = () => {
    window.location.href = '/pokemon/2';
  };
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img
        src={Pokemoni}
        alt='Background'
        className='background-img'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '-1',
        }}
      />
      <Item         onClick={openLink}
>
        <StatTypePresence />
      </Item>
    </Box>
  );
}

export default Pokemon;
