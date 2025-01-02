
import EscenaBase from "./EscenaBase";


class EscenaPausa extends EscenaBase {

    constructor(config) {
        super("EscenaPausa", config);

        this.menu = [
            {escena: "EscenaJuego", texto: "Continuar"},
            {escena: "MenuPrincpal", texto: "salir"},
        ]
      }
    create() {
        
        // this.add.image(0,0, 'cielo').setOrigin(0).setAlpha(0.5)
        this.crearMenu(this.menu, this.eventosMenu.bind(this))
    }
    eventosMenu(menuItem) {
        const texto = menuItem.textoMenu;
        texto.setInteractive()

        texto.on('pointerover', () => {
            texto.setStyle({fill: '#ff0'})
        })

        texto.on('pointerout', () => {
            texto.setStyle({fill: '#fff'})
        })

        texto.on('pointerup', () => {
            if(menuItem.escena && menuItem.texto === 'Continuar') {
                this.scene.stop()
                this.scene.resume(menuItem.escena)
            } else {
                this.scene.stop('EscenaJuego')
                this.scene.start('MenuPrincipal')
            }
        })
        
    }
}

export default EscenaPausa