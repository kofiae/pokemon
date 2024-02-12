import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../asset/Home.css';
import Logo from '../asset/images/logopokemon.png';
import Background from '../asset/images/landscape.jpg';
import Bulbasaur from '../asset/images/poke/bulbasaur.png';
import Deerling from '../asset/images/poke/deerling.png';
import Persian from '../asset/images/poke/persian.png';
import Ponyta from '../asset/images/poke/ponyta.png';
import PonytaStats from '../asset/images/poke/ponytastats.png';
import Taillow from '../asset/images/poke/taillow.png';
import Tepig from '../asset/images/poke/tepig.png';

function Home() {
  const [isVisibleLogo, setIsVisibleLogo] = useState(false);
  const [isVisibleTaillow, setIsVisibleTaillow] = useState(false);
  const [isVisibleBulbasaur, setIsVisibleBulbasaur] = useState(false);
  const [isVisibleDeerling, setIsVisibleDeerling] = useState(false);
  const [isVisiblePersian, setIsVisiblePersian] = useState(false);
  const [isVisiblePonyta, setIsVisiblePonyta] = useState(false);
  const [isVisibleTepig, setIsVisibleTepig] = useState(false);
  const [isVisiblePonytaStats, setIsVisiblePonytaStats] = useState(false);

  const logoRef = useRef(null);
  const taillowRef = useRef(null);
  const bulbasaurRef = useRef(null);
  const deerlingRef = useRef(null);
  const persianRef = useRef(null);
  const ponytaRef = useRef(null);
  const tepigRef = useRef(null);
  const ponytaStatsRef = useRef(null);

  useEffect(() => {
    const observerLogo = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleLogo(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }
    );
    const observerTaillow = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleTaillow(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }
    );

    const observerBulbasaur = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleBulbasaur(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }
    );

    const observerDeerling = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleDeerling(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }
    );

    const observerPersian = new IntersectionObserver(
      ([entry]) => {
        setIsVisiblePersian(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }
    );

    const observerPonyta = new IntersectionObserver(
      ([entry]) => {
        setIsVisiblePonyta(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }
    );

    const observerTepig = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleTepig(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }
    );

    const observerPonytaStats = new IntersectionObserver(
      ([entry]) => {
        setIsVisiblePonytaStats(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }
    );

    if (logoRef.current) {
      observerLogo.observe(logoRef.current);
    }

    if (taillowRef.current) {
      observerTaillow.observe(taillowRef.current);
    }

    if (bulbasaurRef.current) {
      observerBulbasaur.observe(bulbasaurRef.current);
    }

    if (deerlingRef.current) {
      observerDeerling.observe(deerlingRef.current);
    }

    if (persianRef.current) {
      observerPersian.observe(persianRef.current);
    }

    if (ponytaRef.current) {
      observerPonyta.observe(ponytaRef.current);
    }

    if (tepigRef.current) {
      observerTepig.observe(tepigRef.current);
    }

    if (ponytaStatsRef.current) {
      observerPonytaStats.observe(ponytaStatsRef.current);
    }

    return () => {
      if (taillowRef.current) {
        observerTaillow.unobserve(taillowRef.current);
      }
      if (bulbasaurRef.current) {
        observerBulbasaur.unobserve(bulbasaurRef.current);
      }
      if (deerlingRef.current) {
        observerDeerling.unobserve(deerlingRef.current);
      }
      if (persianRef.current) {
        observerPersian.unobserve(persianRef.current);
      }
      if (ponytaRef.current) {
        observerPonyta.unobserve(ponytaRef.current);
      }
      if (ponytaStatsRef.current) {
        observerPonytaStats.unobserve(ponytaStatsRef.current);
      }
    };
  }, []);

  const togglePonytaStatsVisibility = () => {
    setIsVisiblePonytaStats(!isVisiblePonytaStats);
  };

  const openLink = () => {
    window.location.href = '/stats';
  };

  return (
    <div className='background-container'>
      <img src={Background} alt='Background' className='background-image' />
      <div className='logo-container'>
        <motion.img src={Logo} alt='Logo' className='logo' style={{ opacity: isVisibleLogo ? 1 : 0, transition: 'opacity 1s' }} ref={logoRef}/>
      </div>

      <div className='pokemon-container'>
          <motion.img src={Taillow} alt='Taillow' className='taillow' style={{ opacity: isVisibleTaillow ? 1 : 0, transition: 'opacity 1s' }} ref={taillowRef}/>
          <motion.img src={Bulbasaur} alt='Bulbasaur' className='bulbasaur' style={{ opacity: isVisibleBulbasaur ? 1 : 0, transition: 'opacity 1s' }} ref={bulbasaurRef}/>
          <motion.img src={Deerling} alt='Deerling' className='deerling' style={{ opacity: isVisibleDeerling ? 1 : 0, transition: 'opacity 1s' }} ref={deerlingRef}/>
          <motion.img src={Persian} alt='Persian' className='persian' style={{ opacity: isVisiblePersian ? 1 : 0, transition: 'opacity 1s' }} ref={persianRef}/>
          <motion.img src={Tepig} alt='Tepig' className='tepig' style={{ opacity: isVisibleTepig ? 1 : 0, transition: 'opacity 1s' }} ref={tepigRef}/>

        <a>
          <motion.img
            src={Ponyta}
            alt='Ponyta'
            className='ponyta'
            onClick={togglePonytaStatsVisibility}
            style={{ opacity: isVisiblePonyta ? 1 : 0, transition: 'opacity 1s' }}
            ref={ponytaRef}
          />
        </a>
        <motion.div animate={{ opacity: isVisiblePonytaStats ? 1 : 0 }} initial={{ opacity: 0 }} ref={ponytaStatsRef}>
          {isVisiblePonytaStats && (
            <a>
              <img
                src={PonytaStats}
                alt='PonytaStats'
                className='ponytastats'
                onClick={openLink}
              />
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
