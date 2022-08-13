export default class FpsText extends Phaser.GameObjects.Text {
  constructor(scene) {
    super(scene, 10, 10, '', { color: '#FFF', fontSize: '28px', fontFamily: 'EvilEmpire' })
    const t = scene.add.existing(this, true)
    t.setScrollFactor(0, 0);
    this.setOrigin(0)
  }

  public update() {
    this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)
  }
}
