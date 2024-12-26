import {Axis, Color3, MeshBuilder, Scalar, Space, Vector3} from "@babylonjs/core";
import spaceinvadersConfig from "../spaceinvaders.config";
import {Explosion} from "./Explosion";
import State from "./State";

export class PlayerBullet {

  constructor(gameAssets, scene, playerMesh, gameManager) {
    this.scene = scene;
    this.gameAssets = gameAssets;
    this.gameManager = gameManager;
    this.maxY = 120;
    if (spaceinvadersConfig.actionCam) {
      this.maxY = 400;
    }
    this.offset = 2;
    this.bulletSpeed = 1.25;
    this.bullet = new MeshBuilder.CreateBox("bullet", {
      width: 0.5,
      height: 4,
      depth: 1
    }, this.scene);
    this.bullet.position = new Vector3(
      playerMesh.position.x,
      playerMesh.position.y + this.offset,
      playerMesh.position.z
    );
    
    // Collision setup similar to Barrier
    this.initBullet();
    
    this.startBulletLoop();
  }

  initBullet() {
    this.bullet.metadata = {"type": "playerbullet"};
    this.bullet.collisionGroup = 4;   // 00100
    this.bullet.collisionMask = 2;    // 00010 - Should collide with aliens
    this.bullet.checkCollisions = true;
    this.bullet.collisionResponse = true;  // Allow response
    this.bullet.collisionRetryCount = 10;
    this.bullet.ellipsoid = new Vector3(0.5, 2, 1);
    this.bullet.ellipsoidOffset = new Vector3(0, 0, 0);
    this.bullet.computeWorldMatrix(true);
  }

  startBulletLoop() {
    this.bulletObserver = this.scene.onBeforeRenderObservable.add(() => {
      this.bullet.moveWithCollisions(new Vector3(0, this.bulletSpeed * State.delta, 0))
      if (this.bullet.position.y > this.maxY) {
        this.destroyBullet();
      }
      if (this.bullet.collider && this.bullet.collider.collidedMesh) {
        console.log('Bullet collision detected:', {
          colliderType: this.bullet.collider.collidedMesh.metadata?.type,
          colliderName: this.bullet.collider.collidedMesh.name,
          colliderGroup: this.bullet.collider.collidedMesh.collisionGroup,
          bulletGroup: this.bullet.collisionGroup,
          bulletMask: this.bullet.collisionMask
        });
        this.onCollision(this.bullet.collider.collidedMesh);
      }
      this.bullet.checkCollisions = true;
    });
  }

  onCollision(collidedMesh) {
    // Check if the collided mesh is an alien
    if (collidedMesh.metadata && collidedMesh.metadata.type === 'alien') {
      // Attempt to call onHit method if it exists
      const alienObject = this.findAlienObject(collidedMesh);
      if (alienObject && typeof alienObject.onHit === 'function') {
        alienObject.onHit();
      }
      
      // Dispose of the bullet
      this.destroyBullet();
    }
  }

  // Helper method to find the Alien object associated with the mesh
  findAlienObject(mesh) {
    // This assumes there's a way to track Alien instances
    // You might need to implement a global tracking mechanism in your game manager
    return this.gameManager ? this.gameManager.getAlienByMesh(mesh) : null;
  }

  destroyBullet() {
    this.scene.onBeforeRenderObservable.remove(this.bulletObserver);
    this.bullet.dispose();
    this.disposed = true; // Tells our game loop to destroy this instance.
  }
}
