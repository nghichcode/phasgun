/*! For license information please see main.f519c888647a560c6edc.bundle.js.LICENSE.txt */
(()=>{var e,t={975:(e,t,s)=>{"use strict";s.d(t,{R:()=>k,$:()=>F});var i=s(260),a=s.n(i);class n extends Phaser.GameObjects.Text{constructor(e){super(e,10,10,"",{color:"#FFF",fontSize:"28px",fontFamily:"EvilEmpire"}),e.add.existing(this,!0).setScrollFactor(0,0),this.setOrigin(0)}update(){this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)}}const o=(e,t,s)=>e.physics.add.staticSprite(t,s,"pad_1_3").setScale(.5).refreshBody().setDisplayOrigin(190,97).setSize(180,40),r=o,c=(e,t)=>{const s=[];for(let i=t.start;i<=t.end;i++)s.push({key:e,frame:`${t.prefix}${String(i).padStart(t.pad,"0")}${t.suffix}`});return s};class l extends a().Physics.Arcade.Sprite{constructor(e,t,s){super(e,t,s,"explosion-gas","Explosion_gas_circle1.png")}setMainScene(e){this.mainScene||(this.mainScene=e)}fire(e,t){this.anims.play("explosion-gas-default"),this.body.reset(e,t),this.setDepth(1),this.setActive(!0),this.setVisible(!0),this.setVelocityX(600),setTimeout((()=>{this.scene.cameras.main.worldView.contains(this.x,this.y)||this.anims.play("explosion-gas",!0)}),2200)}preUpdate(e,t){super.preUpdate(e,t),"explosion-gas"===this.anims.getName()&&1===this.anims.getProgress()&&(this.setActive(!1),this.setVisible(!1))}}class h extends a().Physics.Arcade.Group{constructor(e){super(e.physics.world,e),this.createMultiple({frameQuantity:5,key:"bullet",active:!1,visible:!1,classType:l})}fireBullet(e,t){let s=this.getFirstDead(!1);return s&&("explosion-gas"===s.anims.getName()?1===s.anims.getProgress()&&s.fire(e,t):s.fire(e,t)),s}}class p extends Phaser.GameObjects.Text{constructor(e,t,s,i){super(e,t,s,i,{stroke:"#0D089B",strokeThickness:6,color:"#FFFFFFC9",fontSize:"58px",fontFamily:"EvilEmpire"});const a=this.context.createLinearGradient(0,0,0,this.height);a.addColorStop(0,"#FFFFFF"),a.addColorStop(1,"#FFFFFFAA"),this.setFill(a),e.add.existing(this)}update(){}}class d extends Phaser.Scene{constructor(){super({key:"MainScene"}),this.landList=[],this.isJump=!1,this.isFire=!1,this.maxY=0}create(){const e=this;this.background=this.add.tileSprite(0,0,F,k,"game_background").setOrigin(0).setScrollFactor(0,0),this.fpsText=new n(this),this.cursors=this.input.keyboard.createCursorKeys(),this.input.addPointer(1),this.platforms=this.physics.add.staticGroup(),this.soundHit=this.sound.add("hit"),this.soundShot=this.sound.add("shot"),this.soundWhoosh=this.sound.add("whoosh"),this.soundSpawn=this.sound.add("spawn"),e.btnA=this.add.sprite(1100,620,"button-primary").setScale(.5).setInteractive().setScrollFactor(0,0).setDepth(1);const t=new p(this,168,590,"Fire");t.setScrollFactor(0,0).setDepth(2).setFontSize(50),e.btnA.on("pointerdown",(function(s){e.isJump=!0,t.setAlpha(.8),e.btnA.setAlpha(.8)})),e.btnA.on("pointerup",(function(s){e.isJump=!1,t.setAlpha(1),e.btnA.setAlpha(1)})),e.btnB=this.add.sprite(200,620,"button-primary").setScale(.5).setInteractive().setScrollFactor(0,0).setDepth(1);const s=new p(this,1058,590,"Jump");s.setScrollFactor(0,0).setDepth(2).setFontSize(50),e.btnB.on("pointerdown",(function(t){s.setAlpha(.8),e.soundSpawn.play(),e.bullets.fireBullet(e.player.x+20,e.player.y),e.isFire=!0,e.btnB.setAlpha(.8)})),e.btnB.on("pointerup",(function(t){s.setAlpha(1),e.isFire=!1,e.btnB.setAlpha(1)})),this.player=this.physics.add.sprite(100,440,"wraith-pack","Wraith_01_Idle Blinking_001.png"),this.player.collideWorldBounds=!0,this.player.setSize(this.player.body.width-80,this.player.body.height).setScale(.4).refreshBody(),this.player.setDepth(1),this.player.setBounce(.2),this.physics.add.collider(this.player,this.platforms),this.cameras.main.startFollow(this.player,!1,1,1,-F/2+200,0),this.anims.create({key:"idle",frames:c("wraith-pack",{start:0,end:11,prefix:"Wraith_01_Idle Blinking_",suffix:".png",pad:3}),frameRate:8,repeat:-1}),this.anims.create({key:"walking",frames:this.anims.generateFrameNames("wraith-pack",{start:0,end:11,prefix:"Wraith_01_Moving Forward_",suffix:".png",zeroPad:3}),frameRate:8,repeat:-1}),this.anims.create({key:"attack",frames:this.anims.generateFrameNames("wraith-pack",{start:0,end:11,prefix:"Wraith_01_Attack_",suffix:".png",zeroPad:3}),frameRate:18,repeat:-1}),this.anims.create({key:"explosion-gas",frames:this.anims.generateFrameNames("explosion-gas",{start:1,end:6,prefix:"Explosion_gas_circle",suffix:".png",zeroPad:0}),frameRate:18,repeat:-1}),this.anims.create({key:"explosion-gas-default",frames:[{key:"explosion-gas",frame:"Explosion_gas_circle1.png"}],frameRate:18,repeat:-1}),this.bullets=new h(this),this.physics.add.collider(this.bullets,this.platforms,((e,t)=>{var s;if(e){const t=e;t.active&&(null===(s=this.soundHit)||void 0===s||s.play()),t.anims.play("explosion-gas",!0),t.setVelocity(0,0)}})),this.input.keyboard.on("keydown-SPACE",(e=>{this.soundSpawn.play(),this.bullets.fireBullet(this.player.x+20,this.player.y)})),this.input.keyboard.on("keydown-P",(e=>{this.scene.isPaused()?this.scene.resume():this.scene.pause()})),this.reloadScene()}reloadScene(){this.landList.forEach((e=>e.destroy())),this.landList=[];for(let e=0;e<8;e++)this.generateFromPrevLand()}update(){const e=this.cursors,t=this.player;this.fpsText.update(),e.right.isDown||this.input.activePointer.isDown&&this.isJump?(t.anims.play("walking",!0),t.setVelocityX(d.maxH)):e.space.isDown?t.anims.play("attack",!0):("attack"===t.anims.getName()&&1!==t.anims.getProgress()||t.anims.play("idle",!0),t.setVelocityX(0)),t.body.touching.down&&(this.soundWhoosh.play(),t.setVelocityY(-330));const s=this.landList.length>0?this.landList[0]:null;s&&s.x<t.x-300&&(s.destroy(),this.platforms.remove(s),this.landList.splice(0,1),this.generateFromPrevLand()),t.y>this.maxY+k&&(this.scene.pause(),this.scene.setActive(!1),this.scene.start("PreviewScene")),this.background.setTilePosition(this.cameras.main.scrollX)}generateFromPrevLand(){let e;if(this.landList.length<=0)e=r(this,d.DEFAULT_LAND_X,d.DEFAULT_LAND_Y);else{const i=this.landList[this.landList.length-1];this,t=i.x,s=i.y,e=o(this,Phaser.Math.Between(t+190+10,t+300),Phaser.Math.Between(s-100,s))}var t,s;this.landList.push(e),this.platforms.add(e),e.y>this.maxY&&(this.maxY=e.y)}}d.DEFAULT_LAND_X=120,d.DEFAULT_LAND_Y=580,d.maxH=180;class u extends Phaser.Scene{constructor(){super({key:"PreloadScene"})}preload(){this.load.audio("hit","assets/sound/Hit.wav"),this.load.audio("shot","assets/sound/Shot.wav"),this.load.audio("whoosh","assets/sound/Whoosh.wav"),this.load.audio("spawn","assets/sound/Spawn.wav"),this.load.image("phaser-logo","assets/img/phaser-logo.png"),this.load.image("game_background","assets/img/game_background.png"),this.load.image("button-primary","assets/img/button-primary.png"),this.load.image("pad_1_3","assets/img/pads/Pad_1_3.png"),this.load.atlas("wraith-pack","assets/img/wraith-pack/wraith.png","assets/img/wraith-pack/wraith.json"),this.load.atlas("explosion-gas","assets/img/explosion/explosion-gas.png","assets/img/explosion/explosion-gas.json")}create(){this.scene.start("PreviewScene")}}var f=s(90);const m=f.V5.model("AppModel").props({score:f.V5.optional(f.V5.number,0),sound:f.V5.optional(f.V5.boolean,!0)}).extend((e=>({views:{get environment(){return(0,f.dU)(e)}}}))).actions((e=>({setScore:t=>{e.score=t},setSound:t=>{e.sound=t}}))).views((e=>({}))),g=f.V5.model("RootStore").props({app:f.V5.optional(m,{})});class y{constructor(){}setup(){return e=this,t=void 0,i=function*(){},new((s=void 0)||(s=Promise))((function(a,n){function o(e){try{c(i.next(e))}catch(e){n(e)}}function r(e){try{c(i.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,r)}c((i=i.apply(e,t||[])).next())}));var e,t,s,i}}var v=function(e,t,s,i){return new(s||(s=Promise))((function(a,n){function o(e){try{c(i.next(e))}catch(e){n(e)}}function r(e){try{c(i.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,r)}c((i=i.apply(e,t||[])).next())}))},w=function(e,t,s,i){return new(s||(s=Promise))((function(a,n){function o(e){try{c(i.next(e))}catch(e){n(e)}}function r(e){try{c(i.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(o,r)}c((i=i.apply(e,t||[])).next())}))};let x=null;var b=s(949);class S extends Phaser.Scene{constructor(){super({key:"PreviewScene"})}create(){var e;const t=x,s=this;this.add.tileSprite(0,0,F,k,"game_background").setOrigin(0).setScrollFactor(0,0);const i=this.physics.add.staticSprite(F/2,200,"button-primary").setSize(298,120).setScale(.8).setInteractive(),a=new p(this,F/2-40,170,"PLAY");i.on("pointerdown",(function(e){i.setAlpha(.8),a.setAlpha(.8)})),i.on("pointerup",(function(e){i.setAlpha(1),a.setAlpha(1),s.scene.setActive(!1),s.scene.get("MainScene").scene.restart()}));const n=this.add.sprite(F/2,380,"button-primary").setScale(.8).setInteractive(),o=new p(this,F/2-120,350,"SOUND: "+((null===(e=null==t?void 0:t.app)||void 0===e?void 0:e.sound)?"ON":"OFF"));n.on("pointerdown",(function(e){n.setAlpha(.8),o.setAlpha(.8)})),n.on("pointerup",(function(e){var s,i;null===(s=null==t?void 0:t.app)||void 0===s||s.setSound(!(null===(i=null==t?void 0:t.app)||void 0===i?void 0:i.sound)),n.setAlpha(1),o.setAlpha(1)}));const r=this.add.sprite(F/2,560,"button-primary").setScale(.8).setInteractive(),c=new p(this,F/2-50,530,"ABOUT");r.on("pointerdown",(function(e){r.setAlpha(.8),c.setAlpha(.8)})),r.on("pointerup",(function(e){r.setAlpha(1),c.setAlpha(1)})),(0,b.EH)((()=>{var e;o.setText("SOUND: "+((null===(e=null==t?void 0:t.app)||void 0===e?void 0:e.sound)?"ON":"OFF"))}))}defaultPointerDown(e,t){e.setAlpha(.8),t.setAlpha(.8)}update(){}}const F=1280,k=720,A={type:Phaser.AUTO,backgroundColor:"#FFF",scale:{parent:"phaser-game",mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:F,height:k},scene:[u,S,d],physics:{default:"arcade",arcade:{debug:!1,gravity:{y:400}}}};window.addEventListener("load",(()=>{const e=new Phaser.Game(A);(function(){w(this,void 0,void 0,(function*(){let e,t;const s=yield function(){return w(this,void 0,void 0,(function*(){const e=new y;return yield e.setup(),e}))}();try{t=(yield function(e){return v(this,void 0,void 0,(function*(){try{const e=yield localStorage.getItem("root");return JSON.parse(e||"{}")}catch(e){return null}}))}())||{},e=g.create(t,s)}catch(t){e=g.create({},s)}return(0,f.cf)(e,(e=>function(e,t){return v(this,void 0,void 0,(function*(){try{return yield localStorage.setItem("root",JSON.stringify(t)),!0}catch(e){return!1}}))}(0,e))),x=e,e}))})(),window.addEventListener("keydown",(t=>{"p"===t.key&&e.scene.getScenes(!1).forEach((e=>{e.scene.isPaused()&&e.scene.resume(),console.log(e.scene.key,e.scene.isPaused())}))}))}))},204:()=>{console.log("%c %c %c %c %c Built using phaser-project-template %c https://github.com/yandeu/phaser-project-template","background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none")}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var n=s[e]={exports:{}};return t[e].call(n.exports,n,n.exports,i),n.exports}i.m=t,e=[],i.O=(t,s,a,n)=>{if(!s){var o=1/0;for(h=0;h<e.length;h++){for(var[s,a,n]=e[h],r=!0,c=0;c<s.length;c++)(!1&n||o>=n)&&Object.keys(i.O).every((e=>i.O[e](s[c])))?s.splice(c--,1):(r=!1,n<o&&(o=n));if(r){e.splice(h--,1);var l=a();void 0!==l&&(t=l)}}return t}n=n||0;for(var h=e.length;h>0&&e[h-1][2]>n;h--)e[h]=e[h-1];e[h]=[s,a,n]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,n,[o,r,c]=s,l=0;if(o.some((t=>0!==e[t]))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(c)var h=c(i)}for(t&&t(s);l<o.length;l++)n=o[l],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(h)},s=self.webpackChunkphaser_project_template=self.webpackChunkphaser_project_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})(),i.O(void 0,[216],(()=>i(975)));var a=i.O(void 0,[216],(()=>i(204)));a=i.O(a)})();