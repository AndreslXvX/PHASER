
import  Phaser  from "phaser";


class MenuPrincipal extends Phaser.Scene {

    constructor(config) {
        super("MenuPrincipal");
        this.config = config;
      }
    create() {
    this.scene.start('EscenaJuego');
    }
        
    crearFondo() {
        this.add.image(0, 0, "cielo").setOrigin(0, 0);
    }
}

export default MenuPrincipal;