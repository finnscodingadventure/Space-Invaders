import {AssetContainer, AssetsManager, SceneLoader, Sound, Vector3} from "@babylonjs/core";
import "@babylonjs/loaders";

export class GameAssetsManager {

  sounds = {};
  models = {};

  constructor(scene) {
    this.isComplete = false;
    this.scene = scene;
    this.assetContainer = new AssetContainer(this.scene);
    this.totalAssetsToLoad = 9 + 10; // 9 models + 10 sounds
    this.assetsLoaded = 0;
    this.loadErrors = [];

    this.loadSounds();
    this.loadModels();
  }

  loadModels() {
    // Load original models without scaling - these are for 2D mode
    this.loadAsset("Alien_1.glb").then((assets) => {
      console.log('Loading Alien_1:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "Alien_1";
      mainMesh.checkCollisions = true;
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.loadAsset("Alien_2.glb").then((assets) => {
      console.log('Loading Alien_2:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "Alien_2";
      mainMesh.checkCollisions = true;
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.loadAsset("Alien_3.glb").then((assets) => {
      console.log('Loading Alien_3:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "Alien_3";
      mainMesh.checkCollisions = true;
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });

    // Load alternative models with scaling for Holgi mode
    this.loadAsset("Alien_1_Alt.glb").then((assets) => {
      console.log('Loading Alien_1_Alt:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "Alien_1_Alt";
      mainMesh.scaling = new Vector3(0.04, 0.04, 0.04);
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.loadAsset("Alien_2_Alt.glb").then((assets) => {
      console.log('Loading Alien_2_Alt:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "Alien_2_Alt";
      mainMesh.scaling = new Vector3(0.05, 0.05, 0.05);  // Special scaling for Alien_2_Alt
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.loadAsset("Alien_3_Alt.glb").then((assets) => {
      console.log('Loading Alien_3_Alt:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "Alien_3_Alt";
      mainMesh.scaling = new Vector3(0.04, 0.04, 0.04);
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.loadAsset("Player_1.glb").then((assets) => {
      console.log('Loading Player_1:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "Player_1";
      mainMesh.checkCollisions = true;
      // No scaling for Player_1 as it's used in both modes
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.loadAsset("MotherShip.glb").then((assets) => {
      console.log('Loading MotherShip:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "MotherShip";
      mainMesh.checkCollisions = true;
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.loadAsset("MotherShip_Alt.glb").then((assets) => {
      console.log('Loading MotherShip_Alt:', assets.meshes.map(m => ({ name: m.name, id: m.id })));
      const mainMesh = assets.meshes[0];
      mainMesh.rotation = new Vector3(0, 0, 0);
      mainMesh.name = "MotherShip_Alt";
      mainMesh.scaling = new Vector3(0.06, 0.06, 0.06);
      this.pushToAssetsContainer(mainMesh);
      this.assetsLoaded++;
      this.checkComplete();
    });
  }

  async loadAsset(file) {
    try {
      let assets = await SceneLoader.ImportMeshAsync("", "/assets/models/", file, this.scene);
      console.log('GameAssetsManager: Successfully loaded asset:', file);
      return assets;
    } catch (error) {
      console.error('GameAssetsManager: Failed to load asset:', file, error);
      this.loadErrors.push({ file, error });
      throw error;
    }
  }

  pushToAssetsContainer(mesh) {
    this.assetContainer.meshes.push(mesh);
  }

  clone(name, newName = null) {
    if (!newName) newName = "id" + Math.floor(Math.random() * 1000000).toString(16);
    let newMesh = null;
    console.log('Attempting to clone:', name);
    console.log('Available meshes:', this.assetContainer.meshes.map(m => ({ name: m.name, id: m.id })));
    
    let sourceMesh = this.assetContainer.meshes.find((mesh) => mesh.name === name);
    
    if (sourceMesh) {
      console.log('Found source mesh:', { 
        name: sourceMesh.name, 
        id: sourceMesh.id,
        collisionGroup: sourceMesh.collisionGroup,
        collisionMask: sourceMesh.collisionMask,
        checkCollisions: sourceMesh.checkCollisions
      });
      
      newMesh = sourceMesh.clone(newName);
      newMesh.name = newName;
      
      // Preserve important mesh properties
      newMesh.checkCollisions = true;
      newMesh.isPickable = true;
      newMesh.collisionGroup = sourceMesh.collisionGroup;
      newMesh.collisionMask = sourceMesh.collisionMask;
      
      // Preserve scaling from source mesh
      if (sourceMesh.scaling) {
        newMesh.scaling = sourceMesh.scaling.clone();
      }

      console.log('Successfully cloned mesh:', { 
        name: newMesh.name, 
        id: newMesh.id,
        collisionGroup: newMesh.collisionGroup,
        collisionMask: newMesh.collisionMask,
        checkCollisions: newMesh.checkCollisions
      });
    } else {
      console.warn('No mesh found to clone for name:', name);
    }
    return newMesh;
  }

  checkComplete() {
    console.log('GameAssetsManager: Assets loaded:', this.assetsLoaded, 'of', this.totalAssetsToLoad);
    if (this.assetsLoaded >= this.totalAssetsToLoad - this.loadErrors.length) {
      setTimeout(() => {
        this.assetContainer.removeAllFromScene();
        this.isComplete = true;
        if (this.loadErrors.length > 0) {
          console.warn('GameAssetsManager: Game starting with some assets failed to load:', this.loadErrors);
        }
        console.log('GameAssetsManager: Scene ready');
      }, 1);
    }
  }

  loadSounds() {
    this.sounds.levelStart = new Sound("levelStart", "/assets/sounds/level-start-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.sounds.lazer = new Sound("Lazer", "/assets/sounds/player-bullet-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.sounds.alienMove = new Sound("alienMove", "/assets/sounds/alien-move-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.sounds.alienBullet = new Sound("alienBullet", "/assets/sounds/alien-bullet-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.sounds.clearLevel = new Sound("clearLevel", "/assets/sounds/clear-level-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.sounds.motherShipExplosion = new Sound("motherShipExplosion", "/assets/sounds/mothership-explosion-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.sounds.playerExplosion = new Sound("playerExplosion", "/assets/sounds/player-explosion-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.sounds.alienExplosion = new Sound("alienExplosion", "/assets/sounds/alien-explosion-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    })

    this.sounds.gameOver = new Sound("gameOver", "/assets/sounds/game-over-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    });

    this.sounds.motherShip = new Sound("motherShip", "/assets/sounds/mothership-sfx.wav", this.scene, () => {
      this.assetsLoaded++;
      this.checkComplete();
    }, {
      loop: true
    });
  }
}
