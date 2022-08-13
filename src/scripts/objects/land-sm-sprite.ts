export const MAX_LAND_WIDTH = 300
export const MAX_LAND_HEIGHT = 100
const ORIGIN_LAND_W = 190
const ORIGIN_LAND_H = 97
const LandSmSprite = (scene, x: number, y: number) => {
  const sprite = scene.physics.add.staticSprite(x, y, 'pad_1_3')
    .setScale(0.5).refreshBody()
    .setDisplayOrigin(ORIGIN_LAND_W, 97).setSize(180, 40)
  return sprite
}
const generateRandomLandSmSprite = (scene, lastX: number, lastY: number) => {
  return LandSmSprite(
    scene,
    Phaser.Math.Between(lastX + ORIGIN_LAND_W + 10, lastX + MAX_LAND_WIDTH),
    Phaser.Math.Between(lastY - MAX_LAND_HEIGHT, lastY)
    // Phaser.Math.Between(lastY - MAX_LAND_HEIGHT, lastY + MAX_LAND_HEIGHT)
  )
}
export default LandSmSprite
export {
  generateRandomLandSmSprite
}
