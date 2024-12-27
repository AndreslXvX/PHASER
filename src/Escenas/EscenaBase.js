
import  Phaser  from "phaser";


class EscenaBase extends Phaser.Scene {

    constructor(key, config) {
        super(key );
        this.config = config;
        this.posicionDeMenu = [config.width / 2, config.height / 2]
        this.tamañoFuente = 32
        this.estiloFuente = {fontSize: `${this.tamañoFuente}px`, fill: `#fff`}
        this.ultimaPosicionY = 0
      }
    create() {
        this.add.image(0,0, 'cielo').setOrigin(0);
        if (this.config.botonRegresar) {
            let botonVolver = this.add.image(this.config.width - 10, this.config.height - 10, 'Volver')
            .setScale(2)
            .setOrigin(1)
            .setInteractive()

            botonVolver.on('pointerup', () => {
                this.scene.start('MenuPrincipal')
            })

        }
    }
    crearMenu(menu, eventosMenu) {
        this.ultimaPosicionY = 0
        menu.forEach( menuItem => {
            const posicionMenu = [this.posicionDeMenu[0], this.posicionDeMenu[1] + this.ultimaPosicionY]
            menuItem.textoMenu = this.add.text(...posicionMenu, menuItem.texto, this.estiloFuente).setOrigin(0.5,1);
            this.ultimaPosicionY += 42

            eventosMenu(menuItem)
        });
    }
}
export default EscenaBase;