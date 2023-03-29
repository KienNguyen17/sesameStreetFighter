import Phaser from "phaser";
import HandleInputs from "../mixin/HandleInputs";
import Player from "../character/Player";
import HealthBar from "../hud/HealthBar";

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    this.createCloud();
    this.createBackground();
    this.createElmo();
    this.createCookieMonster();

    this.physics.add.collider(this.elmo, this.cookieMonster, () =>
      this.attack(this.elmo, this.cookieMonster)
    );

    this.anims.create({
      key: "punch",
      frames: this.anims.generateFrameNames("elmoPunch", {
        frames: [0, 1, 2, 1, 0],
      }),
      frameRate: 12,
    });
    this.anims.create({
      key: "kick",
      frames: this.anims.generateFrameNames("elmoKick", {
        frames: [0, 1, 2, 1, 0],
      }),
      frameRate: 10,
    });

    let particles = this.add.particles("pixel");
    this.emitter = particles.createEmitter({
      quantity: 15,
      speed: { min: -150, max: 150 },
      scale: { start: 2, end: 0.1 },
      lifespan: 800,
      on: false,
    });
  }

  attack(char1, char2) {
    if (char1.isAttacking()) {
      this.healthBar2.decreaseHealth(10);
      console.log("elmo hit!");
      if (char2.x > char1.x) {
        char2.setPosition(char2.x + 50, char2.y);
      } else {
        char2.setPosition(char2.x - 50, char2.y);
      }
    }
    if (char2.isAttacking()) {
      this.healthBar1.decreaseHealth(10);
      console.log("cookie hit!");
      if (char2.x > char1.x) {
        char1.setPosition(char1.x + 50, char1.y);
      } else {
        char1.setPosition(char1.x - 50, char1.y);
      }
    }
  }

  update() {
    this.cloud.tilePositionX += 0.5;
    this.handleControls();
  }

  createCloud() {
    this.cloud = this.add.tileSprite(
      this.config.width / 2,
      150,
      this.config.width,
      500,
      "cloud"
    );
  }

  createBackground() {
    this.background = this.add.image(
      this.config.width / 2,
      this.config.height / 2 + 60,
      "background"
    );
    this.background.setScale(1.6);
  }

  createElmo() {
    this.healthBar1 = new HealthBar(
      this,
      "Elmo",
      true,
      this.config,
      "elmoProfile"
    );
    this.elmo = new Player(
      this,
      100,
      200,
      "Elmo",
      "punch",
      "kick",
      this.healthBar1
    )
      .setOrigin(1)
      .setSize(100, 230)
      .setOffset(100, 40);

    this.elmo.setCollideWorldBounds(true);
    this.leftCharControl = new HandleInputs(this, charLeft, this.elmo);
  }

  createCookieMonster() {
    this.healthBar2 = new HealthBar(
      this,
      "Cookie Monster",
      false,
      this.config,
      "cookieMonsterProfile"
    );
    this.cookieMonster = new Player(
      this,
      1050,
      200,
      "CookieMonster",
      "punch",
      "kick",
      this.healthBar2
    )
      .setScale(0.2)
      .setOrigin(1)
      .setSize(600, 1000)
      .setOffset(200, 600)
      .setFlipX(true);
    this.cookieMonster.setCollideWorldBounds(true);
    this.rightCharControl = new HandleInputs(
      this,
      charRight,
      this.cookieMonster
    );
  }

  handleControls() {
    this.leftCharControl.characterControls();
    this.rightCharControl.characterControls();
  }
}

const charRight = {
  up: Phaser.Input.Keyboard.KeyCodes.UP,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  down: Phaser.Input.Keyboard.KeyCodes.DOWN,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  punch: Phaser.Input.Keyboard.KeyCodes.O,
  kick: Phaser.Input.Keyboard.KeyCodes.P,
};

const charLeft = {
  up: Phaser.Input.Keyboard.KeyCodes.W,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  down: Phaser.Input.Keyboard.KeyCodes.S,
  right: Phaser.Input.Keyboard.KeyCodes.D,
  punch: Phaser.Input.Keyboard.KeyCodes.C,
  kick: Phaser.Input.Keyboard.KeyCodes.V,
};

export default PlayScene;
