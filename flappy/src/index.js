



import Phaser, { Physics } from "phaser";

 const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 600,
    physics: {
      default : 'arcade',
      arcade: {
        debug : true
      }

    },
    scene: {
      preload,
      create,
      update,
    }
 }

 
const VELOCIDAD = 200;
const GRAVEDAD = 1000;
const posicionInicialPajarito = { x: config.width / 10, y: config.height / 2}
const rangoDeDistanciaXdeTubitos = 400

const NUMERO_TUBITOS = 8

let tubitos = null
let pajarito = null
let velocidadSalto = 400
let distanciaXdeTubitos = rangoDeDistanciaXdeTubitos


 function preload() {
  this.load.image('cielo', 'assets/sky.png')
  this.load.image('pajarito', 'assets/bird.png')
  this.load.image('tubito', 'assets/pipe.png')
 }

 
 function create() {
  //objetos
          //cielito
  this.add.image(0, 0, 'cielo').setOrigin(0,0)

  pajarito = this.physics.add.sprite(posicionInicialPajarito.x , posicionInicialPajarito.y,  'pajarito')
  pajarito.body.gravity.y = GRAVEDAD

  tubitos = this.physics.add.group();
  
  //comandos al presionar teclas
  this.input.keyboard.on('keydown-W', saltar);
  

  for (let i = 0 ; i < NUMERO_TUBITOS ; i++) {

  let tubitoSuperior = tubitos.create( 0, 0, 'tubito').setOrigin(0, 1)
  let tubitoInferior = tubitos.create( 0, 0, 'tubito').setOrigin(0, 0)
  crearTubitos(tubitoSuperior, tubitoInferior)
    // debugger
  }
  
  tubitos.setVelocityX(-VELOCIDAD)
  
  

 }

function crearTubitos(tubitoS, tubitoI) {

  
  distanciaXdeTubitos += rangoDeDistanciaXdeTubitos
  let rangoDeDistanciaEntreTubitos = [100, 200]
  let DistanciaEntreTubitos = Phaser.Math.Between(...rangoDeDistanciaEntreTubitos)
  let posicionDeLosTubitos = Phaser.Math.Between(40, config.height - 40 - DistanciaEntreTubitos )

  tubitoS.y = posicionDeLosTubitos
  tubitoS.x = distanciaXdeTubitos

  tubitoI.y = tubitoS.y + DistanciaEntreTubitos
  tubitoI.x = tubitoS.x

  


}

 function update() {

  if(pajarito.y >= config.height - pajarito.height || pajarito.y <= 20) {
    pajarito.body.y = posicionInicialPajarito.y
    pajarito.body.x = posicionInicialPajarito.x
    pajarito.body.velocity.y = 0
  } 

}

 function saltar() {

  pajarito.body.velocity.y = -velocidadSalto

 }ww

 new Phaser.Game(config);