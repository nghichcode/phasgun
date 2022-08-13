import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import PreviewScene from "./scenes/previewScene";

export const DEFAULT_WIDTH = 1280
export const DEFAULT_HEIGHT = 720

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#FFF',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, PreviewScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {y: 400}
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
  window.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
      game.scene.getScenes(false).forEach(it => {
        if (it.scene.isPaused()) it.scene.resume()
        console.log(it.scene.key, it.scene.isPaused())
      })
    }
  })
})
