



import Phaser from "phaser";

import EscenaJuego from "./Escenas/EscenaJuego";
import MenuPrincipal  from "./Escenas/MenuPrincipal";
import EscenaPreCarga from "./Escenas/EscenaPreCarga";
import EscenaPuntaje from './Escenas/EscenaPuntaje';
import EscenaPausa from './Escenas/EscenaPausa'


 
  const WIDTH = 800
  const HEIGHT = 600
  const POSICION_INICIAL_PAJARITO = { x: WIDTH / 3, y: HEIGHT / 2}
  const VELOCIDAD_SALTOS = 400
  const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    posicionInicial: POSICION_INICIAL_PAJARITO,
    velocidadSaltos: VELOCIDAD_SALTOS

  }
  const escenas = [EscenaPreCarga, MenuPrincipal, EscenaPuntaje, EscenaJuego, EscenaPausa]
  const crearEscenas = escenas => new escenas(SHARED_CONFIG)
  const innitScenes = () => escenas.map(crearEscenas) 
  
 const config = {
    type : Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    physics: {
      default : 'arcade',
      arcade: {
        
        // debug : true
      }

    },
    scene: innitScenes()
 }
 

 new Phaser.Game(config);