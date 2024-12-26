import {Color3, MeshBuilder, Scalar, Vector3} from "@babylonjs/core";
import {AliensController} from "./AliensController";

export class Alien extends AliensController {

  constructor(scene, mesh = null, x = 0, y = 0, gameManager) {
    super();
    this.sourceMesh = mesh;
    this.x = x;
    this.y = y;
    this.z = 0;
    this.scene = scene;
    this.gameManager = gameManager;
    this.lives = 1;  // Ensure aliens only have 1 life
    this.initAlien();
  }

  initAlien() {
    if (this.x === 0 && this.y === 0) {
      this.x = Math.random() * 40 - 20;  // Adjusted to match formation bounds
      this.y = Math.random() * 30 + 5;   // Adjusted for better visibility
    }
    this.randomiser = [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100)
    ];
    let id = Math.floor(Math.random() * 100000).toString(16);
    if (!this.sourceMesh) {
      this.mesh = new MeshBuilder.CreateBox("alien-" + id, {
        width: 4,
        height: 3,
        depth: 2,
      }, this.scene);
    } else {
      this.mesh = this.sourceMesh.clone("alien-" + id);
      // Ensure scale is preserved from source mesh
      if (this.sourceMesh.scaling) {
        this.mesh.scaling = this.sourceMesh.scaling.clone();
      }
    }
    this.mesh.name = "alien-" + id;
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;
    
    // Enable collisions
    this.mesh.checkCollisions = true;
    this.mesh.collisionGroup = 2;    // 00010
    this.mesh.collisionMask = 4 | 1;  // 00100 | 00001 - Collide with player bullets and player
    this.mesh.isPickable = true;
    this.mesh.ellipsoid = new Vector3(2, 1.5, 1);
    this.mesh.ellipsoidOffset = new Vector3(0, 0, 0);
    this.mesh.computeWorldMatrix(true);
    
    // Detailed metadata
    this.mesh.metadata = {
      type: "alien",
      scoreValue: 10
    };
    
    console.log('Initialized alien:', {
      name: this.mesh.name,
      collisionGroup: this.mesh.collisionGroup,
      collisionMask: this.mesh.collisionMask,
      checkCollisions: this.mesh.checkCollisions,
      isPickable: this.mesh.isPickable
    });

    // Add dispose handler
    this.mesh.onDispose = () => {
      if (!this.mesh.metadata.silentDispose) {
        console.log('Alien disposed:', this.mesh.name);
        new Explosion(this.mesh, 20, 1.5, this.scene);
        State.score += this.mesh.metadata.scoreValue;
      }
    };
  }

  updateMeshPosition(v = 0.05) {
    let currentPosition = this.mesh.position;
    let newPosition = {
      x: this.formation.x + this.x,
      y: this.formation.y + this.y
    }
    //this.mesh.position.x = Scalar.Lerp(currentPosition.x, newPosition.x, v);
    //this.mesh.position.y = Scalar.Lerp(currentPosition.y, newPosition.y, v);
    let newX = Scalar.Lerp(currentPosition.x, newPosition.x, v);
    let newY = Scalar.Lerp(currentPosition.y, newPosition.y, v);
    let scalarX = newX - currentPosition.x;
    let scalarY = newY - currentPosition.y;
    this.mesh.moveWithCollisions(new Vector3(scalarX, scalarY, currentPosition.z));
    if (this.mesh.collider.collidedMesh) {
      this.handleCollision();
    }

    return newPosition;
  }

  handleCollision() {
    let collidedWithType = (this.mesh.collider.collidedMesh.metadata).type;
    if (collidedWithType === "player") {
      this.mesh.collider.collidedMesh.dispose(); // perform action with player meshes onDispose event.
      this.onHit();
    }
    if (collidedWithType === "barrier") {
      this.mesh.collider.collidedMesh.dispose(); // perform action with meshes onDispose event.
    }
  }

  onHit() {
    this.lives--;
    if (this.lives <= 0) {
      this.destroy();
    }
  }

  destroy() {
    // Remove the mesh from the scene
    if (this.mesh) {
      this.mesh.dispose();
    }
    // Notify game manager or perform any additional cleanup
    if (this.gameManager) {
      this.gameManager.onAlienDestroyed(this);
    }
  }
}
