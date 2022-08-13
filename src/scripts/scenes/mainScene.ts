import FpsText from '../objects/fpsText'
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "../game";
import LandSmSprite, {generateRandomLandSmSprite} from "../objects/land-sm-sprite";
import {generateFrameNames} from "../utils/utils";
import {Bullet, Bullets} from "../objects/bullets";

const CHARACTER_X = 100

export default class MainScene extends Phaser.Scene {
  private static DEFAULT_LAND_X = 120
  private static DEFAULT_LAND_Y = 580

  private fpsText

  private player
  private platforms
  private landList: Array<any> = []
  private bullets

  private cursors
  private maxY: number = 0

  constructor() {
    super({key: 'MainScene'})
  }

  create() {
    this.add.image(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2, 'game_background')
      .setScrollFactor(0)
    this.fpsText = new FpsText(this)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 8; i++) {
      this.generateFromPrevLand()
    }

    this.player = this.physics.add.sprite(CHARACTER_X, 440, 'wraith-pack', 'Wraith_01_Idle Blinking_001.png')
    this.player.collideWorldBounds = true
    this.player.setSize(this.player.body.width - 80, this.player.body.height)
      .setScale(0.4).refreshBody()
    this.player.setBounce(0.2)
    this.physics.add.collider(this.player, this.platforms)
    this.cameras.main.startFollow(this.player, false, 1, 1, -DEFAULT_WIDTH / 2 + 200, 0);

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
        _bullet.anims.play('explosion-gas', true)
        _bullet.setVelocity(0, 0);
      }
    })
    this.input.keyboard.on('keydown-SPACE', (pointer) => {
      this.bullets.fireBullet(this.player.x + 20, this.player.y);
    })
    this.input.keyboard.on('keydown-P', (pointer) => {
      if (this.scene.isPaused('MainScene')) this.scene.resume('MainScene')
      else this.scene.pause('MainScene')
    })
  }

  update() {
    const cursors = this.cursors
    const player = this.player
    const maxH = 180
    this.fpsText.update()

    if (cursors.left.isDown) {
      player.anims.play('walking', true)
      player.setVelocityX(-maxH)
      player.flipX = true
    } else if (cursors.right.isDown) {
      player.anims.play('walking', true)
      player.setVelocityX(maxH)
      player.flipX = false
    } else if (cursors.space.isDown) {
      player.anims.play('attack', true)
    } else {
      if (player.anims.getName() !== 'attack' || player.anims.getProgress() === 1) {
        player.anims.play('idle', true)
      }
      player.setVelocityX(0)
    }

    if (player.body.touching.down) {
      player.setVelocityY(-330)
    }
    // if ((cursors.up.isDown || cursors.space.isDown) && player.body.touching.down) {
    //   player.setVelocityY(-330)
    // }
    const firstLand = this.landList.length > 0 ? this.landList[0] : null
    if (firstLand && firstLand.x < player.x - CHARACTER_X * 3) {
      firstLand.destroy()
      this.platforms.remove(firstLand)
      this.landList.splice(0, 1)

      this.generateFromPrevLand()
    }
    if (player.y > this.maxY + DEFAULT_HEIGHT) this.scene.pause()
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
