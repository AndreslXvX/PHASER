



import Phaser, { Physics } from "phaser";

 const config = {
    type : Phaser.AUTO,
    width : 800,
    height : 600,
    physics: {
      default : 'arcade',
      arcade: {
        gravity : 200,
        debug : true
      }

    },
    scene: {
      preload,
      create,
      update,
    }
 }

const VELOCIDAD = 300;
const GRAVEDAD = 1000;


let pajarito = null;
let totalDelta = null;

 function preload() {
  this.load.image('cielo', 'assets/sky.png')
  this.load.image('pajarito', 'assets/bird.png')
 }
 function create() {
  this.add.image(0, 0, 'cielo').setOrigin(0,0)
  pajarito = this.physics.add.sprite(config.width / 10, config.height / 2, 'pajarito')

  this.input.keyboard.on('keydown-W', saltar);
  // this.input.keyboard.on('keyup-SPACE', caer);


  pajarito.body.gravity.y = GRAVEDAD
  
  // pajarito.body.gravity.y = 1000;
  // pajarito.body.velocity.y = 500;
  
 }

 function update(time, delta) {

  if(pajarito.y <= config.height - pajarito.height) {
    pajarito.body.gravity.y = 0
    pajarito.body.velocity.y = 0
  }

  
   
 }

 function saltar() {
  pajarito.body.velocity.y = -VELOCIDAD
 }
//  function caer() {
//   pajarito.body.gravity.x = 
//  }

 new Phaser.Game(config);