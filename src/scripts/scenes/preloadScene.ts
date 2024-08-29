export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({key: 'PreloadScene'})
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const textStyle = {color: '#000000', fontSize: '28px', fontFamily: 'monospace' }
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: textStyle
    });
    loadingText.setOrigin(0.5, 0.5);
    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: textStyle
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value) {
      percentText.setText(Math.ceil(Number(value) * 100) + "%");
    });

    this.load.on("fileprogress", function (file) {
    });
    this.load.on("complete", function () {
      loadingText.destroy();
      percentText.destroy();
    });

    this.load.audio('hit', 'assets/sound/Hit.wav')
    this.load.audio('shot', 'assets/sound/Shot.wav')
    this.load.audio('whoosh', 'assets/sound/Whoosh.wav')
    this.load.audio('spawn', 'assets/sound/Spawn.wav')
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('game_background', 'assets/img/game_background.png')
    this.load.image('button-primary', 'assets/img/button-primary.png')
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
    this.scene.start('PreviewScene')

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
