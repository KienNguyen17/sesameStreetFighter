import BaseScene from "./BaseScene"
import CharacterIcon from "../selectionScreen/CharacterIcon";
import Cursor from "../selectionScreen/Cursor";

export let leftPlayerKey=null;
export let rightPlayerKey=null;

class CharacterSelectScene extends Phaser.Scene{
    constructor(config){
        super('CharacterSelectScene');
        this.config = config;
    }

    create(){
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.image(this.config.width / 2, this.config.height / 2, "selection");
        this.createCharacterIcon();
        this.createCursor();
    }

    createCharacterIcon() {
        this.elmoIcon = new CharacterIcon(this,
            this.config.width/2 - 100,
            this.config.height/2 + 70,
            "elmoSelectionIcon", elmo);
        this.cookieIcon = new CharacterIcon(this,
            this.config.width/2 + 100,
            this.config.height/2 + 70,
            "cookieSelectionIcon", cookie);
        this.iconArray = [this.elmoIcon, this.cookieIcon];
    }

    createCursor() {
        this.leftCursor = new Cursor(this, 0, 0, 'leftCursor', charLeftControl, this.iconArray);
        this.rightCursor = new Cursor(this, 0, 0, 'rightCursor', charRightControl, this.iconArray);
    }

    update() {
        this.leftCursor.update();
        this.rightCursor.update();

        leftPlayerKey = this.leftCursor.chosenCharacterOrNull();
        rightPlayerKey = this.rightCursor.chosenCharacterOrNull();

        if (this.spaceKey.isDown) {
            this.toNextScene();
        }
    }

    toNextScene() {
        if (leftPlayerKey != null && rightPlayerKey != null) {
            this.scene.start('MapSelectScene');
        } else {
            // alert("Please each choose a character!");
        }
    }
}

const elmo = {
    defaultImage: 'Elmo',
    displayName: "Elmo",
    profilePicture:"elmoProfile",
    size: [80, 230],
    blood: 0xFF0000,
    //maybe like this:
    punch: {
        anim: 'elmopunch',
        delay: 175,
        position: [90, 180],
        damage: 20,
    },
    kick: {
        anim: 'elmokick',
        delay: 175,
        position: [90, 210],
    }
}

const cookie = {
    defaultImage: 'CookieMonster',
    displayName: "Cookie Monster",
    size: [100, 230],
    blood: 0x0000FF,
    profilePicture:"cookieMonsterProfile",
    punch: {
        anim: 'cookiepunch',
        delay: 175,
        position: [90, 180],
        damage: 20,
    },
    kick: {
        anim: 'cookiekick',
        delay: 175,
        position: [90, 210]
    }
}

const charRightControl = {
    up: Phaser.Input.Keyboard.KeyCodes.UP,
    left: Phaser.Input.Keyboard.KeyCodes.LEFT,
    down: Phaser.Input.Keyboard.KeyCodes.DOWN,
    right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  };

  const charLeftControl = {
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D,
  };

export default CharacterSelectScene
