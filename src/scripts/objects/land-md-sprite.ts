const LandMdSprite = (scene, x: number, y: number) => {
  const sprite = scene.physics.add.staticSprite(x, y, 'pad_1_3')
    .setDisplayOrigin(190, 97).setSize(380, 80)
  return sprite
}
export default LandMdSprite
