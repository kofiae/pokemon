import React, { useState } from 'react';
import '../asset/Types.css';
import Bug from '../asset/images/types/bug.png';
import Dark from '../asset/images/types/dark.png';
import Dragon from '../asset/images/types/dragon.png';
import Electric from '../asset/images/types/electr.png';
import Fairy from '../asset/images/types/fairy.png';
import Fight from '../asset/images/types/fight.png';
import Fire from '../asset/images/types/fire.png';
import Flying from '../asset/images/types/flying.png';
import Ghost from '../asset/images/types/ghost.png';
import Grass from '../asset/images/types/grass.png';
import Ground from '../asset/images/types/ground.png';
import Ice from '../asset/images/types/ice.png';
import Normal from '../asset/images/types/normal.png';
import Poison from '../asset/images/types/poison.png';
import Psychic from '../asset/images/types/psychc.png';
import Rock from '../asset/images/types/rock.png';
import Steel from '../asset/images/types/steel.png';
import Water from '../asset/images/types/water.png';
import Pokemon from '../asset/images/pokemon.jpg';
import { motion } from 'framer-motion';
import Pokemons from '../asset/images/all.png';

function Types() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const openLink = () => {
    window.location.href = '/types/chart';
  };
  return (
    <div className='cont' onClick={openLink}>
      <img src={Pokemon} alt='Background' className='background-img' />
      {!isVisible && (
      <div className="types-cont">
        <motion.img src={Bug} alt="Bug" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Dark} alt="Dark" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Dragon} alt="Dragon" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Fairy} alt="Fairy" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Electric} alt="Electric" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Fight} alt="Fight" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Fire} alt="Fire" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Flying} alt="Flying" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Ghost} alt="Ghost" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Grass} alt="Grass" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Ground} alt="Ground" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Ice} alt="Ice" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Normal} alt="Normal" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Poison} alt="Poison" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Psychic} alt="Psychic" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Rock} alt="Rock" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Steel} alt="Steel" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
        <motion.img src={Water} alt="Water" className="type" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}/>
      </div>        
      )}
      {isVisible && (
      <motion.img src={Pokemons} alt="All Pokemons" className="all-pokemons" onClick={openLink}/>
      )}

    </div>
  );
}

export default Types;
