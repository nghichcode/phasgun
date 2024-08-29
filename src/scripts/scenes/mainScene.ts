import FpsText from '../objects/fpsText'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "../game";
import LandSmSprite, {generateRandomLandSmSprite} from "../objects/land-sm-sprite";
import {generateFrameNames} from "../utils/utils";
import {Bullet, Bullets} from "../objects/bullets";
import PrimaryButtonText from "../objects/primaryButtonText";
import { getRootStoreVal } from "../models";

const CHARACTER_X = 100

export default class MainScene extends Phaser.Scene {
  private static DEFAULT_LAND_X = 120
  private static DEFAULT_LAND_Y = 580
  private static maxH = 180

  private store
  private fpsText
  private background
  public soundHit: Phaser.Sound.BaseSound
  public soundShot: Phaser.Sound.BaseSound
  public soundWhoosh: Phaser.Sound.BaseSound
  public soundSpawn: Phaser.Sound.BaseSound

  private player
  private platforms
  private landList: Array<any> = []
  private bullets

  private btnA
  private isJump = false
  private isFire = false
  private btnB

  private cursors
  private maxY: number = 0

  constructor() {
    super({key: 'MainScene'})
  }

  create() {
    const game = this
    this.store = getRootStoreVal()
    this.background = this.add.tileSprite(0, 0, DEFAULT_WIDTH, DEFAULT_HEIGHT, "game_background")
      .setOrigin(0)
      .setScrollFactor(0, 0);
    this.fpsText = new FpsText(this)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.input.addPointer(1);
    this.platforms = this.physics.add.staticGroup();
    this.soundHit = this.sound.add('hit');
    this.soundShot = this.sound.add('shot');
    this.soundWhoosh = this.sound.add('whoosh');
    this.soundSpawn = this.sound.add('spawn');

    game.btnA = this.add.sprite(1100, 620, 'button-primary')
      .setScale(0.5).setInteractive()
      .setScrollFactor(0, 0)
      .setDepth(1)
    const btnATxt = new PrimaryButtonText(this, 168, 590, 'Fire')
    btnATxt.setScrollFactor(0, 0)
      .setDepth(2)
      .setFontSize(50)
    game.btnA.on('pointerdown', function (pointer) {
      game.isJump = true
      btnATxt.setAlpha(0.8)
      game.btnA.setAlpha(0.8)
    });
    game.btnA.on('pointerup', function (pointer) {
      game.isJump = false
      btnATxt.setAlpha(1)
      game.btnA.setAlpha(1)
    });
    game.btnB = this.add.sprite(200, 620, 'button-primary')
      .setScale(0.5).setInteractive()
      .setScrollFactor(0, 0)
      .setDepth(1)
    const btnBTxt = new PrimaryButtonText(this, 1058, 590, 'Jump')
    btnBTxt.setScrollFactor(0, 0)
      .setDepth(2)
      .setFontSize(50)
    game.btnB.on('pointerdown', function (pointer) {
      btnBTxt.setAlpha(0.8)
      if (game?.store?.app?.sound) game.soundSpawn.play()
      game.bullets.fireBullet(game.player.x + 20, game.player.y);
      game.isFire = true
      game.btnB.setAlpha(0.8)
    });
    game.btnB.on('pointerup', function (pointer) {
      btnBTxt.setAlpha(1)
      game.isFire = false
      game.btnB.setAlpha(1)
    });

    this.player = this.physics.add.sprite(CHARACTER_X, 440, 'wraith-pack', 'Wraith_01_Idle Blinking_001.png')
    this.player.collideWorldBounds = true
    this.player.setSize(this.player.body.width - 80, this.player.body.height)
      .setScale(0.4).refreshBody()
    this.player.setDepth(1)
    this.player.setBounce(0.2)
    this.physics.add.collider(this.player, this.platforms)
    this.cameras.main.startFollow(this.player, false, 1, 1, -DEFAULT_WIDTH / 2 + 200, 0)

    this.anims.create({
      key: 'idle',
      frames: generateFrameNames('wraith-pack', {
        start: 0, end: 11, prefix: 'Wraith_01_Idle Blinking_', suffix: '.png', pad: 3
      }),
      frameRate: 8, repeat: -1
    })
    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNames('wraith-pack', {
        start: 0, end: 11, prefix: 'Wraith_01_Moving Forward_', suffix: '.png', zeroPad: 3
      }),
      frameRate: 8, repeat: -1
    })
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('wraith-pack', {
        start: 0, end: 11, prefix: 'Wraith_01_Attack_', suffix: '.png', zeroPad: 3
      }),
      frameRate: 18, repeat: -1
    })
    this.anims.create({
      key: 'explosion-gas',
      frames: this.anims.generateFrameNames('explosion-gas', {
        start: 1, end: 6, prefix: 'Explosion_gas_circle', suffix: '.png', zeroPad: 0
      }),
      frameRate: 18, repeat: -1
    })
    this.anims.create({
      key: 'explosion-gas-default',
      frames: [{key: 'explosion-gas', frame: 'Explosion_gas_circle1.png'}],
      frameRate: 18, repeat: -1
    })

    this.bullets = new Bullets(this);
    this.physics.add.collider(this.bullets, this.platforms, (_bulletObj, _platformsObj) => {
      if (_bulletObj) {
        const _bullet = (_bulletObj as Bullet)
        if (_bullet.active && game?.store?.app?.sound) this.soundHit?.play()
        _bullet.anims.play('explosion-gas', true)
        _bullet.setVelocity(0, 0);
      }
    })
    this.input.keyboard.on('keydown-SPACE', (pointer) => {
      if (game?.store?.app?.sound) this.soundSpawn.play()
      this.bullets.fireBullet(this.player.x + 20, this.player.y);
    })
    this.input.keyboard.on('keydown-P', (pointer) => {
      if (this.scene.isPaused()) this.scene.resume()
      else this.scene.pause()
    })

    this.reloadScene()
  }

  reloadScene() {
    this.landList.forEach(it => it.destroy())
    this.landList = []
    for (let i = 0; i < 8; i++) {
      this.generateFromPrevLand()
    }
  }

  update() {
    const cursors = this.cursors
    const player = this.player
    this.fpsText.update()

    if (cursors.right.isDown || (
      this.input.activePointer.isDown && this.isJump
    )) {
      player.anims.play('walking', true)
      player.setVelocityX(MainScene.maxH)
    } else if (cursors.space.isDown) {
      player.anims.play('attack', true)
    } else {
      if (player.anims.getName() !== 'attack' || player.anims.getProgress() === 1) {
        player.anims.play('idle', true)
      }
      player.setVelocityX(0)
    }

    if (player.body.touching.down) {
      if (this?.store?.app?.sound) this.soundWhoosh.play()
      player.setVelocityY(-330)
    }
    const firstLand = this.landList.length > 0 ? this.landList[0] : null
    if (firstLand && firstLand.x < player.x - CHARACTER_X * 3) {
      firstLand.destroy()
      this.platforms.remove(firstLand)
      this.landList.splice(0, 1)

      this.generateFromPrevLand()
    }
    if (player.y > this.maxY + DEFAULT_HEIGHT) {
      this.scene.pause()
      this.scene.setActive(false)
      this.scene.start('PreviewScene')
    }
    this.background.setTilePosition(this.cameras.main.scrollX)
  }

  generateFromPrevLand() {
    let tmpLand
    if (this.landList.length <= 0) {
      tmpLand = LandSmSprite(this, MainScene.DEFAULT_LAND_X, MainScene.DEFAULT_LAND_Y)
    } else {
      const prevLand = this.landList[this.landList.length - 1]
      tmpLand = generateRandomLandSmSprite(this, prevLand.x, prevLand.y)
    }
    this.landList.push(tmpLand)
    this.platforms.add(tmpLand)
    if (tmpLand.y > this.maxY) this.maxY = tmpLand.y
  }
}
