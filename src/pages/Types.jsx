import React from 'react';
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

import StatTypePresence from '../charts/Types';

function Types() {
  return (
    <div className='background-cont'>
      {/* <img src={Pokemon} alt='Background' className='background-img' /> */}

      <div className="types-container" id='border'>
        <img src={Bug} alt="Bug" className="type" />
        <img src={Dark} alt="Dark" className="type" />
        <img src={Dragon} alt="Dragon" className="type" />
        <img src={Fairy} alt="Fairy" className="type" />
        <img src={Electric} alt="Electric" className="type" />
        <img src={Fight} alt="Fight" className="type" />
        <img src={Fire} alt="Fire" className="type" />
        <img src={Flying} alt="Flying" className="type" />
        <img src={Ghost} alt="Ghost" className="type" />
        <img src={Grass} alt="Grass" className="type" />
        <img src={Ground} alt="Ground" className="type" />
        <img src={Ice} alt="Ice" className="type" />
        <img src={Normal} alt="Normal" className="type" />
        <img src={Poison} alt="Poison" className="type" />
        <img src={Psychic} alt="Psychic" className="type" />
        <img src={Rock} alt="Rock" className="type" />
        <img src={Steel} alt="Steel" className="type" />
        <img src={Water} alt="Water" className="type" />
      </div>
      <StatTypePresence />
    </div>
  );
}

export default Types;
