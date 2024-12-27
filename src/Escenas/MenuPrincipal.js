
import EscenaBase from "./EscenaBase";


class MenuPrincipal extends EscenaBase {

    constructor(config) {
        super("MenuPrincipal", config);

        this.menu = [
            {escena: "EscenaJuego", texto: "Jugar"}, 
            {escena: "EscenaPuntaje", texto: 'Puntaje'},
            {escena: null, texto: 'Salir'}
        ]
      }
    create() {
        super.create()
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
            menuItem.escena && this.scene.start(menuItem.escena)

            if(menuItem.texto === 'Salir') {
                this.game.destroy(true)
            }
        })
        
    }
}

export default MenuPrincipal;