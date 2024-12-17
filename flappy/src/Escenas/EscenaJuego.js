
import Phaser from "phaser";

class EscenaJuego extends Phaser.Scene {

    constructor(config) {
        super('EscenaJuego'); 
        this.config = config
        this.pajarito = null

    }

    preload() {
  this.load.image('cielo', 'assets/sky.png')
  this.load.image('pajarito', 'assets/bird.png')
    }

    create(){
        
  this.add.image(0, 0, 'cielo').setOrigin(0,0)
  this.pajarito = this.physics.add.sprite(this.config.posicionInicial.x , this.config.posicionInicial.y,  'pajarito')
  this.pajarito.body.gravity.y = 1000
    }

    update(){

    }
    

}

export default EscenaJuego