import {Scalar, Vector3} from "@babylonjs/core";
import {PlayerBullet} from "./PlayerBullet";
import {InputController} from "./InputController";
import {Explosion} from "./Explosion";
import {MobileInputs} from "./MobileInputs";

import State from "./State";

export class PlayerController {

  constructor(environment, gameAssets) {
    this.environment = environment;
    this.scene = environment.scene;
    this.gameAssets = gameAssets;
    this.movementEnabled = false;
    this.inputController = new InputController(this.scene);
    this.mobileInputs = new MobileInputs(this.scene);
    this.bullets = [];
    this.maxBullets = 50;
    this.momentum = 0;
    this.isInvincible = false;
  }

  initPlayer() {
    this.playerMesh = this.gameAssets.clone("Player_1");
    this.playerMesh.position = new Vector3(0, 0, 0);
    
    // Collision setup similar to Barrier
    this.playerMesh.checkCollisions = false;
    this.playerMesh.collisionGroup = 1;  // 00001
    this.playerMesh.collisionMask = 10;  // 01010 - Should collide with aliens and alien bullets
    this.playerMesh.metadata = {
      type: "player",
      lives: 3
    }
    this.playerMesh.onDispose = (mesh) => {
      if (State.state === "GAMELOOP" || State.state === "ALIENSWIN") {
        this.playerHit(mesh);
        this.scene.onBeforeRenderObservable.remove(this.playerObserver);
      }
    };
    // Critical: Set up collision ellipsoid
    this.playerMesh.ellipsoid = new Vector3(2, 2, 2);
    this.playerMesh.ellipsoidOffset = new Vector3(0, 0, 0);
    this.playerMesh.computeWorldMatrix(true);
    this.setInvicibility(true, 3000);
    this.enableMovement();
    this.playerObserver = this.scene.onBeforeRenderObservable.add(()=>{
      this.playerMove();
    });
  }

  actionCam(x = -1) {
    if (x === -1) x = this.playerMesh.position.x;
    this.environment.actionCam(x);
  }

  enableMovement() {
    this.momentum = 0;
    this.movementEnabled = true;
    this.inputObserver = this.scene.onBeforeRenderObservable.add(() => {
      this.playerActions();
      this.cleanupBullets();
    });
    //this.mobileInputs.enable();
  }

  disableMovement() {
    //this.mobileInputs.disable();
    this.movementEnabled = false;
    this.disableCollisions();
    this.scene.onBeforeRenderObservable.remove(this.inputObserver);
  }

  disableCollisions() {
    this.playerMesh.checkCollisions = false;
  }

  enableCollisions() {
    this.playerMesh.checkCollisions = true;
    // Add this line to ensure collision state is up to date
    this.playerMesh.computeWorldMatrix(true);
  }

  playerHit(bulletMesh) {
    // Reduce player lives
    if (this.playerMesh.metadata.lives > 0) {
      this.playerMesh.metadata.lives--;
      
      // Optional: Add visual or sound effect for player hit
      if (this.gameAssets && this.gameAssets.sounds) {
        this.gameAssets.sounds.playerExplosion.play();
      }
      
      // Dispose of the bullet that hit the player
      if (bulletMesh) {
        bulletMesh.dispose();
      }
      
      // Check if player is out of lives
      if (this.playerMesh.metadata.lives <= 0) {
        this.gameOver();
      }
    }
  }

  gameOver() {
    // Implement game over logic
    if (State) {
      State.state = "GAMEOVER";
    }
    
    // Dispose of player mesh
    if (this.playerMesh) {
      this.playerMesh.dispose();
    }
  }

  disableBulletCollisions() {
    for (let bullet of this.bullets) {
      bullet.bullet.checkCollisions = false;
      bullet.bullet.collisionMask = 0;
    }
  }

  setInvicibility(invincible = true, howLongFor = 3000) {
    this.isInvincible = invincible;
    this.disableCollisions();

    // Become vulnerable again after howLongFor
    setTimeout(() => {
      this.isInvincible = false;
      this.enableCollisions();
      this.playerMesh.visibility = 1;
    }, howLongFor);
  }

  cleanupBullets() {
    let i = 0;
    for (let bullet of this.bullets) {
      if (bullet.disposed) {
        this.bullets.splice(i, 1);
      }
      i++;
    }
  }

  hidePlayer() {
    this.playerMesh.visibility = 0;
  }

  moveOffScreen() {
    let playerY = this.playerMesh.position.y;
    if (playerY > -100) {
      this.playerMesh.position.y = Scalar.Lerp(playerY, -150, 0.003);
      return true;
    }
    return false;
  }

  destroyPlayer() {
    this.playerMesh.dispose();
  }

  playerActions() {
    //Flash if invincible
    if (this.isInvincible) {
      if (Date.now() % 200 > 100) {
        this.playerMesh.visibility = 0;
      } else {
        this.playerMesh.visibility = 1;
      }
    }
    let input = this.inputController.inputMap;
    if (this.movementEnabled) {
      if (input.arrowleft || input.a || this.mobileInputs.left) {
        this.playerMoveLeft(State.delta);
      }
      if (input.arrowright || input.d || this.mobileInputs.right) {
        this.playerMoveRight(State.delta);
      }
    }
    if (input.shift || input.enter || input.space || this.mobileInputs.fire) {
      if (!this.fireKeyDown && this.bullets.length < this.maxBullets && this.movementEnabled) {
        this.bullets.push(new PlayerBullet(this.gameAssets, this.scene, this.playerMesh));
        this.gameAssets.sounds.lazer.play();
        this.fireKeyDown = true;
      }
    } else {
      this.fireKeyDown = false;
    }
    this.playerMove();
  }

  playerMoveLeft() {
    this.momentum -= .2 * State.delta;
  }

  playerMoveRight() {
    this.momentum += .2 * State.delta;
  }

  // @todo: Player movement is faster at lower framerates!!!
  //  Approx 30% fast at 24FPS than at 60.
  //  Need to work on delta calculations.
  playerMove() {
    this.playerMesh.position.x += this.momentum * (State.delta);
    this.momentum /= Math.pow(1.4, State.delta);
    this.playerMesh.rotation = new Vector3(0, this.momentum, this.momentum / 4);
  }
}
