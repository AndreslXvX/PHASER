
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
        this.crearMenu(this.menu)
    }
}

export default MenuPrincipal;