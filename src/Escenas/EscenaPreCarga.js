
import  Phaser  from "phaser";
class EscenaPreCarga extends Phaser.Scene {

    constructor() {
        super("EscenaPreCarga");
      }


    preload() {
        this.load.image("cielo", "assets/sky.png");
        // this.load.image("pajarito", "assets/bird.png");
        this.load.image("tubito", "assets/pipe.png");
        this.load.image("pausa", "assets/pause.png");
        this.load.image('Volver', 'assets/back.png');
        this.load.spritesheet('pajarito', 'assets/birdSprite.png', { frameWidth: 16, frameHeight: 16 })
    }

    create() {
    this.scene.start('MenuPrincipal')
    
    // localStorage.setItem('PuntajeMaximo', '0')
    }
}

export default EscenaPreCarga;