import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Pokemoni from '../asset/images/pokemon.jpg';
import StartBestType from '../charts/PokemonChart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Pokemon3() {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Set height to 100vh to fill the entire vertical height of the viewport
        width: '100vw', // Set width to 100vw to fill the entire horizontal width of the viewport
      }}
    >
      <Stack spacing={1}>
        <Item style={{ height: '100%'}}>
          <StartBestType />
        </Item>
      </Stack>
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
    </Box>
  );
}

export default Pokemon3;
