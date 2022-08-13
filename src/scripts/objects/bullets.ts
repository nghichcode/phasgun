import Phaser from "phaser";
import {DEFAULT_HEIGHT} from "../game";
import MainScene from "../scenes/mainScene";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  mainScene: MainScene

  constructor(scene, x, y) {
    super(scene, x, y, 'explosion-gas', 'Explosion_gas_circle1.png');
  }

  setMainScene(mainScene: MainScene) {
    if (!this.mainScene) this.mainScene = mainScene
  }

  fire(x, y) {
    this.anims.play('explosion-gas-default')
    this.body.reset(x, y);
    this.setDepth(1);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(600);

    setTimeout(() => {
      if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
        this.anims.play('explosion-gas', true)
      }
    }, 2200)
  }


  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.anims.getName() === 'explosion-gas' && this.anims.getProgress() === 1) {
      this.setActive(false);
      this.setVisible(false);
    }
  }


}

export class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({frameQuantity: 5, key: 'bullet', active: false, visible: false, classType: Bullet});
  }

  fireBullet(x, y) {
    let bullet = this.getFirstDead(false);

    if (bullet) {
      if (bullet.anims.getName() === 'explosion-gas') {
        if (bullet.anims.getProgress() === 1) bullet.fire(x, y);
      } else bullet.fire(x, y);
    }
    return bullet
  }
}
