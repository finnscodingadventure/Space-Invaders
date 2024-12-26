import {MeshBuilder, Vector3} from "@babylonjs/core";
import State from "./State";

export class AlienBullet {

  constructor(scene, playerMesh, gameManager) {
    this.scene = scene;
    this.gameManager = gameManager;
    this.minY = -30;
    this.offset = -2;
    this.bulletSpeed = -0.5;
    this.bullet = new MeshBuilder.CreateBox("bullet", {
      width: 0.5,
      height: 3,
      depth: 1
    }, this.scene);
    this.bullet.position = new Vector3(
      playerMesh.position.x,
      playerMesh.position.y + this.offset,
      playerMesh.position.z
    );
    let bulletArc = Math.PI/6;
    this.bullet.rotate(new Vector3(0, 0, 1), (Math.random() * bulletArc) - bulletArc/2);
    this.bullet.checkCollisions = true;
    this.bullet.collisionGroup = 8;   // 01000
    this.bullet.collisionMask = 1;    // 00001 - Should collide with player
    this.bullet.collisionResponse = true;
    this.bullet.metadata = { type: "alienbullet" };

    this.startBulletLoop();
  }

  startBulletLoop() {
    this.bulletObserver = this.scene.onBeforeRenderObservable.add(() => {
      let moveVector = this.bullet.calcMovePOV(0, this.bulletSpeed * State.delta, 0);
      this.bullet.moveWithCollisions(moveVector);
      if (this.bullet.position.y < this.minY) {
        this.destroyBullet();
      }
      if (this.bullet.collider.collidedMesh) {
        this.onCollision(this.bullet.collider.collidedMesh);
      }

    });
  }

  onCollision(collidedMesh) {
    // Check if the collided mesh is the player
    if (collidedMesh.metadata && collidedMesh.metadata.type === 'player') {
      // Attempt to call playerHit method if it exists
      const playerController = this.findPlayerController(collidedMesh);
      if (playerController && typeof playerController.playerHit === 'function') {
        playerController.playerHit(this.bullet);
      }
      
      // Dispose of the bullet
      this.destroyBullet();
    }
  }

  // Helper method to find the PlayerController associated with the mesh
  findPlayerController(mesh) {
    // This assumes there's a way to track the PlayerController
    // You might need to implement a global tracking mechanism in your game manager
    return this.gameManager ? this.gameManager.getPlayerController() : null;
  }

  destroyBullet() {
    this.scene.onBeforeRenderObservable.remove(this.bulletObserver);
    this.bullet.dispose();
    this.disposed = true; // Tells our game loop to destroy this instance.
  }
}
