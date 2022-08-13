export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({key: 'PreloadScene'})
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('game_background', 'assets/img/game_background.png')
    this.load.image('pad_1_3', 'assets/img/pads/Pad_1_3.png')
    this.load.atlas('wraith-pack',
      'assets/img/wraith-pack/wraith.png',
      'assets/img/wraith-pack/wraith.json',
    );
    this.load.atlas('explosion-gas',
      'assets/img/explosion/explosion-gas.png',
      'assets/img/explosion/explosion-gas.json',
    );
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
