



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
let rangoDeDistanciaXdeTubitos = [200, 500]
let distanciaXentreTubos = 0 

const NUMERO_TUBITOS = 4
let tubitos = null
let pajarito = null
let velocidadSalto = 400
let velocidadtubitos = 200

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
 }

 function detectarTubosFuera() {

  let tuboTemporal = []
  tubitos.getChildren().forEach( tubo => {
      if (tubo.getBounds().right <= 0) {

          tuboTemporal.push(tubo)
          if (tuboTemporal.length == 2) {
                crearTubitos(...tuboTemporal)
          }
      }
    })

    velocidadtubitos += 10
    distanciaXentreTubos += 1

 }

function crearTubitos(tubitoS, tubitoI) {

  
  const distanciaXdeTubitos = distanciaXdeTubos() 
  const rangoDeDistanciaEntreTubitos = [100, 200]
  const DistanciaYEntreTubitos = Phaser.Math.Between(...rangoDeDistanciaEntreTubitos)
  const posicionDeLosTubitos = Phaser.Math.Between(40, config.height - 40 - DistanciaYEntreTubitos )
  const distanciaXentreTubitos = Phaser.Math.Between(...rangoDeDistanciaXdeTubitos)

  tubitoS.y = posicionDeLosTubitos
  tubitoS.x = distanciaXdeTubitos + distanciaXentreTubitos

  tubitoI.y = tubitoS.y + DistanciaYEntreTubitos
  tubitoI.x = tubitoS.x
  
  tubitos.setVelocityX(-velocidadtubitos) 


}

  function distanciaXdeTubos(){

    
    tubitos.getChildren().forEach(function(tubo) {
      distanciaXentreTubos = Math.max(tubo.x, distanciaXentreTubos)
    });

    return distanciaXentreTubos

  }
 function update() {

  if(pajarito.y >= config.height - pajarito.height || pajarito.y <= 20) {
    pajarito.body.y = posicionInicialPajarito.y
    pajarito.body.x = posicionInicialPajarito.x
    pajarito.body.velocity.y = 0
  } 

  detectarTubosFuera()
}

 function saltar() {

  pajarito.body.velocity.y = -velocidadSalto

 }

 new Phaser.Game(config);