
import  Phaser  from "phaser";


class EscenaBase extends Phaser.Scene {

    constructor(key, config) {
        super(key);
        this.config = config;
        this.posicionDeMenu = [config.width / 2, config.height / 2]
        this.tamañoFuente = 32
        this.estiloFuente = {fontSize: `${this.tamañoFuente}px`, fill: `#CD00FF`}
        this.ultimaPosicionY = 0
      }
    create() {
        this.add.image(0,0, 'cielo').setOrigin(0);
    }
    crearMenu(menu) {
        menu.forEach( menuItem => {
            const posicionMenu = [this.posicionDeMenu[0], this.posicionDeMenu[1] + this.ultimaPosicionY]
            this.add.text(...posicionMenu, menuItem.texto, this.estiloFuente).setOrigin(0.5,1);
            this.ultimaPosicionY += 42
        });
    }

export default EscenaBase