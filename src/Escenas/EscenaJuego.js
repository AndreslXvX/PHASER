
import EscenaBase from "./EscenaBase";


const NUMERO_TUBITOS = 5;

class EscenaJuego extends EscenaBase {
  constructor(config) {
    super("EscenaJuego", config);

    this.pajarito = null;
    this.velocidadSalto = 350;
    this.tubitos = null;
    this.velocidadtubitos = 200;
    this.puntos = null;
    this.textoPuntos = " ";
    this.dificultadActual = "facil";

    this.dificultades = {
      facil: {
        rangoDeDistanciaXdeTubitos: [300, 350],
        rangoDeDistanciaEntreTubitos: [130, 140],
      },
      normal: {
        rangoDeDistanciaXdeTubitos: [300, 350],
        rangoDeDistanciaEntreTubitos: [120, 130],
      },
      dificil: {
        rangoDeDistanciaXdeTubitos: [300, 350],
        rangoDeDistanciaEntreTubitos: [80, 100],
      },
    };
  }

  create() {
    this.dificultadActual = "facil";
    super.create();
    this.crearPajarito();
    this.crearTubitos();
    this.asignarTeclas();
    this.crearColisiones();
    this.crearPuntos();
    this.crearBotonDePausa();
    this.listenEvents();

    this.anims.create({
      key: "volar",
      frames: this.anims.generateFrameNumbers("pajarito", {
        start: 8,
        end: 15,
      }),
      frameRate: 24,
      repeat: -1,
    });

    this.pajarito.play("volar");
  }
  update() {
    this.detectarTubosFuera();
    this.alturaPajarito();
    this.guardarPuntos();
  }

  listenEvents() {
    if (this.eventoPausa) {
      return;
    }
    this.eventoPausa = this.events.on("resume", () => {
      this.tiempoInicial = 3;
      this.textoTemporizador = this.add
        .text(
          ...this.posicionDeMenu,
          "Empieza en: " + this.tiempoInicial,
          this.estiloFuente
        )
        .setOrigin(0.5, 1);
      this.temporizador = this.time.addEvent({
        delay: 1000,
        callbackScope: this,
        callback: () => {
          this.tiempoInicial--;
          this.textoTemporizador.setText("Empieza en: " + this.tiempoInicial);
          console.log(" " + this.tiempoInicial);
          if (this.tiempoInicial <= 0) {
            this.textoTemporizador.setText(" ");
            this.physics.resume();
            this.scene.resume();
            this.temporizador.destroy(true);
          }
        },
        loop: true,
      });
    });
  }

  crearBotonDePausa() {
    const botonPausa = this.add
      .image(this.config.width - 10, this.config.height - 10, "pausa")
      .setScale(2)
      .setOrigin(1)
      .setInteractive()
      .setScale(4);
    botonPausa.on("pointerdown", () => {
      this.physics.pause();
      this.scene.pause();
      this.scene.launch("EscenaPausa");
    });
  }
  guardarPuntos() {
    const textoPuntajeMaximo = localStorage.getItem("PuntajeMaximo");

    const puntajeMaximo =
      textoPuntajeMaximo && parseInt(textoPuntajeMaximo, 10);

    if (!puntajeMaximo || this.puntos > puntajeMaximo) {
      localStorage.setItem("PuntajeMaximo", this.puntos);
    } else if (puntajeMaximo == null) {
      localStorage.setItem("PuntajeMaximo", "0");
    }
  }

  crearPuntos() {
    this.puntos = 0;
    const puntajeMaximo = localStorage.getItem("PuntajeMaximo");
    this.textoPuntos = this.add.text(16, 16, `Puntos: ${0}`, {
      fontSize: "32px",
      fill: "#000",
    });
    this.add.text(16, 56, `Mejor puntaje: ${puntajeMaximo || 0} `, {
      fontSize: "16px",
      fill: "x000",
    });
  }

  actualizarPuntos() {
    this.puntos++;
    this.textoPuntos.setText(`Puntos: ${this.puntos}`);
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
    this.pajarito
      .setCollideWorldBounds()
      .setOrigin(1)
      .setScale(2)
      .setFlipX(true);
  }

  crearTubitos() {
    this.tubitos = this.physics.add.group();
    for (let i = 0; i < NUMERO_TUBITOS; i++) {
      let tubitoSuperior = this.tubitos
        .create(0, 0, "tubito")
        .setImmovable(true)
        .setOrigin(0, 1);
      let tubitoInferior = this.tubitos
        .create(0, 0, "tubito")
        .setImmovable(true)
        .setOrigin(0, 0);
      this.reciclarTubos(tubitoSuperior, tubitoInferior);
    }
  }

  asignarTeclas() {
    this.input.keyboard.on("keydown-W", this.movimientoSaltar, this);
  }

  crearColisiones() {
    this.physics.add.collider(
      this.pajarito,
      this.tubitos,
      this.gameOver,
      null,
      this
    );
  }

  alturaPajarito() {
    if (
      this.pajarito.getBounds().bottom >= this.config.height ||
      this.pajarito.y <= 20
    ) {
      this.gameOver();
    }
  }
  gameOver() {
    this.physics.pause();
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false,
    });
  }

  reciclarTubos(tubitoS, tubitoI) {
    const distanciaXdeTubitos = this.distanciaXdeTubos();
    const DistanciaYEntreTubitos = Phaser.Math.Between(
      ...this.dificultades[this.dificultadActual].rangoDeDistanciaEntreTubitos
    );
    const posicionDeLosTubitos = Phaser.Math.Between(
      40,
      this.config.height - 40 - DistanciaYEntreTubitos
    );
    const distanciaXentreTubitos = Phaser.Math.Between(
      ...this.dificultades[this.dificultadActual].rangoDeDistanciaXdeTubitos
    );

    tubitoS.y = posicionDeLosTubitos;
    tubitoS.x = distanciaXdeTubitos + distanciaXentreTubitos;

    tubitoI.y = tubitoS.y + DistanciaYEntreTubitos;
    tubitoI.x = tubitoS.x;

    this.tubitos.setVelocityX(-this.velocidadtubitos);
  }
  distanciaXdeTubos() {
    let distanciaXentreTubos = 350;

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
          this.actualizarPuntos();
          this.aumentarDificultad();
        }
      }
    });
  }
  aumentarDificultad() {
    if (this.puntos === 20) {
      this.dificultadActual = "normal";
    } else if (this.puntos === 40) {
      this.dificultadActual = "dificil";
    }
  }

  movimientoSaltar() {
    this.pajarito.body.velocity.y = -this.velocidadSalto;
  }
}

export default EscenaJuego;
