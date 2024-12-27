import EscenaBase from "./EscenaBase";

class EscenaPuntaje extends EscenaBase {

    constructor(config) {
        super("EscenaPuntaje", {...config, botonRegresar: true});
        this.botonRegresar
      }

    create() {
        super.create()
        const textoPuntajeMaximo = localStorage.getItem('PuntajeMaximo')
        this.add.text(...this.posicionDeMenu, `Mejor Puntaje: ${textoPuntajeMaximo}`, this.estiloFuente)
        .setOrigin(0.5, 1)
    }
}

export default EscenaPuntaje;