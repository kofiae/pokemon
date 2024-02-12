import PonytaStats from '../asset/images/poke/ponytastats.png';
import { motion } from 'framer-motion';
import Pokemon from '../asset/images/pokemon.jpg';

function Explication() {
  const openLink = () => {
    window.location.href = '/types';
  };
    
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src={Pokemon} alt='Background' className='background-img' />
      <a onClick={openLink} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '2' }}>
        <motion.img src={PonytaStats} className="expl" style={{ transition: 'opacity 1s' }}/>
      </a>
    </div>
  )
}

export default Explication;
