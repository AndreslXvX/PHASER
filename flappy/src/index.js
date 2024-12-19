



import Phaser, { Physics, Scenes } from "phaser";
import EscenaJuego from "./Escenas/EscenaJuego";
import MenuPrincipal  from "./Escenas/MenuPrincipal";
import EscenaPreCarga from "./Escenas/EscenaPreCarga";


 
  const WIDTH = 800
  const HEIGHT = 600
  const POSICION_INICIAL_PAJARITO = { x: WIDTH / 10, y: HEIGHT / 2}
  const VELOCIDAD_SALTOS = 400
  const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    posicionInicial: POSICION_INICIAL_PAJARITO,
    velocidadSaltos: VELOCIDAD_SALTOS

  }
  const escenas = [EscenaPreCarga, MenuPrincipal, EscenaJuego]
  const crearEscenas = escenas => new escenas(SHARED_CONFIG)
  const innitScenes = () => escenas.map(crearEscenas) 
  
 const config = {
    type : Phaser.AUTO,
    ...SHARED_CONFIG,
    physics: {
      default : 'arcade',
      arcade: {
        debug : true
      }

    },
    scene: innitScenes()
 }
 

 new Phaser.Game(config);