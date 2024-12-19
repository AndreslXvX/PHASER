import Phaser from "phaser";

const NUMERO_TUBITOS = 4;

class EscenaJuego extends Phaser.Scene {
  constructor(config) {
    super("EscenaJuego");
    this.config = config;
    this.pajarito = null;
    this.velocidadSalto = 300;
    this.tubitos = null;
    this.velocidadtubitos = 200;
    this.rangoDeDistanciaXdeTubitos = [300, 400];
    this.puntos = null
    this.textoPuntos = ' '
  }

  create() {
    this.crearFondo();
    this.crearPajarito();
    this.crearTubitos();
    this.asignarTeclas();
    this.crearColisiones();
    this.crearPuntos();
    this.crearBotonDePausa()
  }
  update() {
    this.detectarTubosFuera();
    this.alturaPajarito();
    this.guardarPuntos()
  }
  
  crearBotonDePausa() {
    const botonPausa= this.add.image(this.config.width - 10, this.config.height - 10, "pausa").setScale(2).setOrigin(1).setInteractive()
    botonPausa.on('pointerdown', () => {
      
        this.physics.pause()
        this.scene.pause()
    
    
      
    })
  }
  guardarPuntos() {
    const textoPuntajeMaximo = localStorage.getItem('PuntajeMaximo')

    const puntajeMaximio = textoPuntajeMaximo && parseInt(textoPuntajeMaximo, 10)

        if (!puntajeMaximio || this.puntos > puntajeMaximio ) {
            localStorage.setItem('PuntajeMaximo', this.puntos)
        }
  }

  crearPuntos() {
    this.puntos = 0
    const puntajeMaximo = localStorage.getItem('PuntajeMaximo')
    this.textoPuntos = this.add.text(16, 16, `Puntos: ${0}`, {fontSize: '32px', fill: '#000' })
    this.add.text(16, 56, `Mejor puntaje: ${puntajeMaximo || 0} `, {fontSize: '16px', fill: 'x000'})
  }

  actualizarPuntos() {
    this.puntos++
    this.textoPuntos.setText(`Puntos: ${this.puntos}`)
  }

  crearFondo() {
    this.add.image(0, 0, "cielo").setOrigin(0, 0);
  }

  crearPajarito() {
    this.pajarito = this.physics.add.sprite(
      this.config.posicionInicial.x,
      this.config.posicionInicial.y,
      "pajarito"
    );
    this.pajarito.body.gravity.y = 1000;
    this.pajarito.setCollideWorldBounds()
  }

  crearTubitos() {
    this.tubitos = this.physics.add.group();
    for (let i = 0; i < NUMERO_TUBITOS; i++) {
      let tubitoSuperior = this.tubitos.create(0, 0, "tubito")
      .setImmovable(true)
      .setOrigin(0, 1);
      let tubitoInferior = this.tubitos.create(0, 0, "tubito")
      .setImmovable(true)
      .setOrigin(0, 0);
      this.reciclarTubos(tubitoSuperior, tubitoInferior);
    }
  }

  asignarTeclas() {
    this.input.keyboard.on("keydown-W", this.saltar, this);
  }

  crearColisiones() {
    this.physics.add.collider(this.pajarito, this.tubitos, this.gameOver, null, this)
  }

  alturaPajarito() {
    if (this.pajarito.getBounds().bottom >= this.config.height || this.pajarito.y <= 20) {
        this.gameOver()
      }
  }
  gameOver() {


    this.physics.pause()
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            this.scene.restart()
        },
        loop: false
    })
  }

  

  

  reciclarTubos(tubitoS, tubitoI) {
    const distanciaXdeTubitos = this.distanciaXdeTubos();
    const rangoDeDistanciaEntreTubitos = [100, 200];
    const DistanciaYEntreTubitos = Phaser.Math.Between(
      ...rangoDeDistanciaEntreTubitos
    );
    const posicionDeLosTubitos = Phaser.Math.Between(
      40,
      this.config.height - 40 - DistanciaYEntreTubitos
    );
    const distanciaXentreTubitos = Phaser.Math.Between(
      ...this.rangoDeDistanciaXdeTubitos
    );

    tubitoS.y = posicionDeLosTubitos;
    tubitoS.x = distanciaXdeTubitos + distanciaXentreTubitos;

    tubitoI.y = tubitoS.y + DistanciaYEntreTubitos;
    tubitoI.x = tubitoS.x;

    this.tubitos.setVelocityX(-this.velocidadtubitos);
  }
  distanciaXdeTubos() {
    let distanciaXentreTubos = 0;

    this.tubitos.getChildren().forEach(function (tubo) {
      distanciaXentreTubos = Math.max(tubo.x, distanciaXentreTubos);
    });

    return distanciaXentreTubos;
  }
  detectarTubosFuera() {
    let tuboTemporal = [];
    this.tubitos.getChildren().forEach((tubo) => {
      if (tubo.getBounds().right <= 0) {
        tuboTemporal.push(tubo);
        if (tuboTemporal.length == 2) {
          this.reciclarTubos(...tuboTemporal);
          this.actualizarPuntos()
        }
      }
    });
  }

  saltar() {
    this.pajarito.body.velocity.y = -this.velocidadSalto;
  }
}

export default EscenaJuego;
