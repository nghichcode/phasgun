export default class PrimaryButtonText extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, {
      stroke: '#0D089B', strokeThickness: 6,
      color: '#FFFFFFC9',
      fontSize: '58px',
      fontFamily: 'EvilEmpire'
    })
    const grd = this.context.createLinearGradient(0, 0, 0, this.height)
    grd.addColorStop(0, '#FFFFFF')
    grd.addColorStop(1, '#FFFFFFAA')
    this.setFill(grd)
    scene.add.existing(this)
  }

  public update() {
  }
}
