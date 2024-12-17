



import Phaser, { Physics } from "phaser";
import EscenaJuego from "./Escenas/EscenaJuego";

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
 const config = {
    type : Phaser.AUTO,
    ...SHARED_CONFIG,
    physics: {
      default : 'arcade',
      arcade: {
        debug : true
      }

    },
    scene: [new EscenaJuego(SHARED_CONFIG)]
 }
 

 new Phaser.Game(config);