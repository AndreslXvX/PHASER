
import  Phaser  from "phaser";
class EscenaPreCarga extends Phaser.Scene {

    constructor() {
        super("EscenaPreCarga");
      }


    preload() {
        this.load.image("cielo", "assets/sky.png");
        this.load.image("pajarito", "assets/bird.png");
        this.load.image("tubito", "assets/pipe.png");
        this.load.image("pausa", "assets/pause.png");
    }

    create() {
    this.scene.start('MenuPrincipal')
    }
}

export default EscenaPreCarga;