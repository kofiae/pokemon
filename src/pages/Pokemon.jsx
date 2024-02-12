import StatMoyenParType from '../StatMoyenParType'
import StatTypePresence from '../charts/StatTypePresence'
import StatTypePrecenceParTier from '../charts/StatTypePresenceParTier'
import Stack from '@mui/material/Stack';
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
  return (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Stack spacing={2}>
        <Stack spacing={2} direction="row">
          <Item>
            <StatTypePresence />
          </Item>
          <Item>
            <StatTypePrecenceParTier />          
          </Item>
        </Stack>
        <Item>
          <StatMoyenParType />
        </Item>
      </Stack>
      <img src={Pokemoni} alt='Background' className='background-img' style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }} />
    </Box>
  )
}

export default Pokemon;
