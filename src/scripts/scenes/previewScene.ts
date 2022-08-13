import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "../game";
import PrimaryButtonText from "../objects/primaryButtonText";

export default class PreviewScene extends Phaser.Scene {
  private enableSound: boolean = false

  constructor() {
    super({key: 'PreviewScene'})
  }

  create() {
    const MIN_Y = 200
    const BUTTON_PRIMARY_WIDTH = 398
    const BUTTON_PRIMARY_HEIGHT = 176
    const game = this

    this.add.tileSprite(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT, "game_background")
      .setOrigin(0)
      .setScrollFactor(0, 0);

    const btnPlay = this.physics.add.staticSprite(DEFAULT_WIDTH / 2, MIN_Y, 'button-primary')
      .setSize(298, 120)
      .setScale(0.8).setInteractive();
    const btnPlayTxt = new PrimaryButtonText(this, DEFAULT_WIDTH / 2 - 40, MIN_Y - 30, 'PLAY')
    btnPlay.on('pointerdown', function (pointer) {
      btnPlay.setAlpha(0.8)
      btnPlayTxt.setAlpha(0.8)
    });
    btnPlay.on('pointerup', function (pointer) {
      btnPlay.setAlpha(1)
      btnPlayTxt.setAlpha(1)
      game.scene.start('MainScene')
    });
    const btnSound = this.add.sprite(DEFAULT_WIDTH / 2, MIN_Y + 180, 'button-primary')
      .setScale(0.8).setInteractive();
    const btnSoundTxt = new PrimaryButtonText(this, DEFAULT_WIDTH / 2 - 120, MIN_Y - 30 + 180, `SOUND: ${game.enableSound ? ' ON' : 'OFF'}`)
    btnSound.on('pointerdown', function (pointer) {
      btnSound.setAlpha(0.8)
      btnSoundTxt.setAlpha(0.8)
    });
    btnSound.on('pointerup', function (pointer) {
      game.enableSound = !game.enableSound
      btnSoundTxt.setText(`SOUND: ${game.enableSound ? 'ON' : 'OFF'}`)
      btnSound.setAlpha(1)
      btnSoundTxt.setAlpha(1)
    });
    const btnInfo = this.add.sprite(DEFAULT_WIDTH / 2, MIN_Y + 180 * 2, 'button-primary')
      .setScale(0.8).setInteractive();
    const btnInfoTxt = new PrimaryButtonText(this, DEFAULT_WIDTH / 2 - 50, MIN_Y - 30 + 180 * 2, 'ABOUT')
    btnInfo.on('pointerdown', function (pointer) {
      btnInfo.setAlpha(0.8)
      btnInfoTxt.setAlpha(0.8)
    });
    btnInfo.on('pointerup', function (pointer) {
      btnInfo.setAlpha(1)
      btnInfoTxt.setAlpha(1)
    });
  }

  defaultPointerDown(btn, btnTxt) {
    btn.setAlpha(0.8)
    btnTxt.setAlpha(0.8)
  }

  update() {

  }
}
