'use strict';
import Phaser from "phaser";

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  create() {
    // Maak een startknop (tekst of sprite)
    let startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start Game', { font: '60px Arial'})
      .setInteractive()
      .setOrigin(0.5);

    // Voeg een event listener toe voor de klik
    startButton.on('pointerdown', () => {
      // Start het spel of ga naar een andere scene
      this.scene.start('SkieGame'); // Vervang 'GameScene' met de key van je hoofdgame scene
    });
  }
};

interface AnswerText extends Phaser.GameObjects.Text {
  isCorrect: boolean;
}

export class SkieGame extends Phaser.Scene {
  private _player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private _cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private _firstNumber!: number;
  private _secondNumber!: number;
  private _sumText!: Phaser.GameObjects.Text;
  private _answer!: number;
  private _answers: number[] = [];
  private _answerContainers: Phaser.GameObjects.Text[] = [];
  private _x_position: number = 500;
  private _heart!: Phaser.GameObjects.Group;
  private _scoreText!: Phaser.GameObjects.Text;
  private _score: number = 0;
  private _gameOver: boolean = false;

  constructor() {
    super({ key: 'SkieGame' });
  }

  preload() {
    this.loadImages();
  }
  
  create() {
    this.SetImages();
    this.configPlayer();
    this.createSumObject(this.cameras.main.centerX, 150, this.generateSumText());
    this.generateAnswers();

    // score
    this._scoreText = this.add.text(20, 16, "score:" + this._score.toString(), {
      fontSize: "62px",
      backgroundColor: "#ffffff",
      color: "#000000",	
      padding: { x: 40, y: 15 },
      align: "center",
    });
    
    // Enable physics debugging to see physics bodies
    this.physics.world.createDebugGraphic();
    // Add collider between player and each answer
    this.physics.add.collider(
      this._player, 
      this._answerContainers,
      (player, answerContainer) => {
        const answerText = answerContainer as AnswerText;
        if (answerText.isCorrect) {
          this._score += 10;
          this._scoreText.setText("score:" + this._score.toString());
          this.resetSum();
        } else { 
            if (this._heart.getLength() === 0) {
            // Game over als er geen hartjes meer zijn
            this.physics.pause();
            this._player.setTint(0xff0000);
            this._gameOver = true;
          } else {
            // remove 1 heart if the answer is wrong
            let heartObject = this._heart.getChildren()[0];
            heartObject.destroy();
            this.resetSum();
          }
        }
      },
    );
   
    this._heart = this.add.group({
      key: "heart",
      repeat: 2,
      setXY: { x: innerWidth - 280, y: 75, stepX: 100 },
    });

    // this.physics.add.collider(this._player, this.generateAnswers());
    this._cursors = this.input!.keyboard!.createCursorKeys();
  }

  update(deltime: any) {
    this.playermovement(deltime);
  }

  private loadImages() {
    this.load.image("ground", "../../public/assets/ground.png");
    this.load.image("jump-left", "../../public/assets/left_jump.png");
    this.load.image("jump-middle", "../../public/assets/middle_jump.png");
    this.load.image("jump-right", "../../public/assets/right_jump.png");
    this.load.image("border-right", "../../public/assets/border_right.png");
    this.load.image("border-left", "../../public/assets/border_left.png");
    this.load.image("character", "../../public/assets/skie-character-min.png");
    this.load.image("heart", "../../public/assets/heart-solid.svg");
  }

  private SetImages(): void {
    // let ground = this.physics.add.staticGroup();
    // ground.create(1050, 1200, "ground");
    // let border_left = this.physics.add.staticGroup();
    // border_left.create(100, 980, "border-left");
    // let border_right = this.physics.add.staticGroup();
    // border_right.create(2015, 980, "border-right");
    // let left_jump = this.physics.add.staticGroup();
    // left_jump.create(350, 900, "jump-left");
    // let middle_jump = this.physics.add.staticGroup();
    // middle_jump.create(1050, 900, "jump-middle");
    // let right_jump = this.physics.add.staticGroup();
    // right_jump.create(1760, 900, "jump-right");
  }

  private configPlayer(): void {
    this._player = this.physics.add.image(this.cameras.main.centerX, 1200, "character");
    this._player.setScale(0.5);
    this._player.setCollideWorldBounds(true);
  }

  private generateSumText(): string {
    this._firstNumber = Math.round(Math.random() * 10);
    this._secondNumber = Math.round(Math.random() * 10);

    return `${this._firstNumber} x ${this._secondNumber} =  ?`;
  }

  // Function to create a sum object
  private createSumObject(x:number, y:number, text:string) {
      this._sumText = this.add.text(x, y, text, { 
          fontFamily: 'Arial', 
          fontSize: 64, 
          color: '#000000',
          padding: { x: 100, y: 15 },
          backgroundColor: '#ffffff',
      }).setOrigin(0.5, 0.5);

      return this._sumText;
  }

  private generateAnswers() {
    this._answers = []; // clear the array
    // Generate answers for the sum
    this._answer = this._firstNumber * this._secondNumber;
    // push 3 answers in the array
    this._answers.push(this._answer, this._answer + 2, this._answer - 2);
    // randomize the array
    this._answers.sort(() => Math.random() - 0.5);

    // generate 3 answers and position them in the canvas
    for (let i = 0; i < this._answers.length; i++) {
      console.log(this.createAnswerObject(this._x_position, 500, this._answers[i].toString(), this._answers[i] === this._answer));
      this._x_position = this._x_position + 1500;
    };
  }

  private createAnswerObject(x:number, y:number, text:string, isCorrect:boolean) {
    // // Add text to the object
    let answerText = this.add.text(x, y, text, { 
      fontFamily: 'Arial', 
      fontSize: 64, 
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 80, y: 15 },
    }).setOrigin(0.5, 0.5) as AnswerText;

    // add physics to the answerText
    this.physics.add.existing(answerText);

    // make the answerText immovable
    const physicsBody = answerText.body as Phaser.Physics.Arcade.Body;
    physicsBody.setImmovable(true);
    physicsBody.setAllowGravity(false);

    // add a custom property to the answerText to check if it is the correct answer
    answerText.isCorrect = isCorrect;

    // push the answerText to the answerContainers array for colliding
    this._answerContainers.push(answerText);

    return answerText;
  }

  private resetSum() { 
    // Reset the sum
    this._sumText.setText(this.generateSumText());

    // Reset the answers
    this._answerContainers.forEach(container => {
      container.destroy();
    });

    this._x_position = 500;
    this.generateAnswers();
  }


  private playermovement(deltaTime: number) {
    const velocityChange = 50;
    const jumpVelocity = -250;
    const normalizedDelta = deltaTime / 1000;

    if (this._cursors.left.isDown) {
      this._player.setVelocityX(-velocityChange * normalizedDelta);
    } else if (this._cursors.right.isDown) {
      this._player.setVelocityX(velocityChange * normalizedDelta);
    } else {
      this._player.setVelocityX(0);
    }

    if (this._cursors.up.isDown && this._player.y >= innerHeight - this._player.displayHeight / 2) {
      this._player.setVelocityY(jumpVelocity * normalizedDelta);
    }
  }
}

