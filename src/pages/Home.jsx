import '../asset/Home.css';
import Logo from '../asset/images/logopokemon.png';
import Background from '../asset/images/landscape.jpg';
import Bulbasaur from '../asset/images/poke/bulbasaur.png';
import Deerling from '../asset/images/poke/deerling.png';
import Persian from '../asset/images/poke/persian.png';
import Ponyta from '../asset/images/poke/ponyta.png';
import Taillow from '../asset/images/poke/taillow.png';
import Tepig from '../asset/images/poke/tepig.png';

function Home() {
    console.log(window.getSelection());
    
  return (
    <div className='background-container'>
      <img src={Background} alt='Background' className='background-image' />
      <div className='logo-container'>
        <img src={Logo} alt='Logo' className='logo' />
      </div>

        <div className='pokemon-container'>
          <img src={Taillow} alt='Taillow' className='taillow' />
          <img src={Bulbasaur} alt='Bulbasaur' className='bulbasaur' />
          <img src={Deerling} alt='Deerling' className='deerling' />
          <img src={Persian} alt='Persian' className='persian' />
          <img src={Ponyta} alt='Ponyta' className='ponyta' />
          <img src={Tepig} alt='Tepig' className='tepig' />

        </div>
    </div>
  );
}

export default Home;
