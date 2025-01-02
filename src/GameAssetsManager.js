import {AssetContainer, AssetsManager, SceneLoader, Sound, Vector3} from "@babylonjs/core";
import "@babylonjs/loaders";
import spaceinvadersConfig from "../spaceinvaders.config";

export class GameAssetsManager {

  sounds = {};

  constructor(scene) {
    this.isComplete = false;
    this.scene = scene;
    this.assetContainer = new AssetContainer(this.scene);
    this.totalAssetsToLoad = 5 + 14; // Updated to include alt models
    this.assetsLoaded = 0;

    this.loadSounds();
    this.loadModels();
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
    this.checkComplete();
  }

  loadModels() {
    // Load original models
    this.loadAsset("Alien_1.glb").then((assets) => {
      console.log("Processing Alien_1.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "Alien_1_root";
      modelMesh.name = "Alien_1";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded Alien_1.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading Alien_1.glb:", error);
    });

    this.loadAsset("Alien_2.glb").then((assets) => {
      console.log("Processing Alien_2.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "Alien_2_root";
      modelMesh.name = "Alien_2";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded Alien_2.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading Alien_2.glb:", error);
    });

    this.loadAsset("Alien_3.glb").then((assets) => {
      console.log("Processing Alien_3.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "Alien_3_root";
      modelMesh.name = "Alien_3";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded Alien_3.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading Alien_3.glb:", error);
    });

    this.loadAsset("Player_1.glb").then((assets) => {
      console.log("Processing Player_1.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "Player_1_root";
      modelMesh.name = "Player_1";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded Player_1.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading Player_1.glb:", error);
    });

    this.loadAsset("MotherShip.glb").then((assets) => {
      console.log("Processing MotherShip.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "MotherShip_root";
      modelMesh.name = "MotherShip";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded MotherShip.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading MotherShip.glb:", error);
    });

    // Load alternative models for Holgi Modus
    this.loadAsset("Alien_1_Alt.glb").then((assets) => {
      console.log("Processing Alien_1_Alt.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "Alien_1_Alt_root";
      modelMesh.name = "Alien_1_Alt";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      const scaling = spaceinvadersConfig.holgiModus.alienScaling.alien1;
      modelMesh.scaling = new Vector3(scaling.x, scaling.y, scaling.z);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded Alien_1_Alt.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading Alien_1_Alt.glb:", error);
    });

    this.loadAsset("Alien_2_Alt.glb").then((assets) => {
      console.log("Processing Alien_2_Alt.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "Alien_2_Alt_root";
      modelMesh.name = "Alien_2_Alt";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      const scaling = spaceinvadersConfig.holgiModus.alienScaling.alien2;
      modelMesh.scaling = new Vector3(scaling.x, scaling.y, scaling.z);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded Alien_2_Alt.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading Alien_2_Alt.glb:", error);
    });

    this.loadAsset("Alien_3_Alt.glb").then((assets) => {
      console.log("Processing Alien_3_Alt.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "Alien_3_Alt_root";
      modelMesh.name = "Alien_3_Alt";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      const scaling = spaceinvadersConfig.holgiModus.alienScaling.alien3;
      modelMesh.scaling = new Vector3(scaling.x, scaling.y, scaling.z);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded Alien_3_Alt.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading Alien_3_Alt.glb:", error);
    });

    this.loadAsset("MotherShip_Alt.glb").then((assets) => {
      console.log("Processing MotherShip_Alt.glb:", assets.meshes.map(m => m.name).join(", "));
      const rootMesh = assets.meshes[0];
      const modelMesh = assets.meshes[1];
      rootMesh.name = "MotherShip_Alt_root";
      modelMesh.name = "MotherShip_Alt";
      rootMesh.rotation = new Vector3(0, 0, 0);
      modelMesh.position = new Vector3(0, -2000, -2000);
      const scaling = spaceinvadersConfig.holgiModus.alienScaling.motherShip;
      modelMesh.scaling = new Vector3(scaling.x, scaling.y, scaling.z);
      this.pushToAssetsContainer(modelMesh);
      this.assetsLoaded++;
      this.checkComplete();
      console.log("Successfully loaded MotherShip_Alt.glb with model mesh name:", modelMesh.name);
    }).catch(error => {
      console.error("Error loading MotherShip_Alt.glb:", error);
    });
  }

  async loadAsset(file) {
    console.log(`Attempting to load asset: ${file}`);
    try {
      let assets = await SceneLoader.ImportMeshAsync("", "/assets/models/", file, this.scene);
      console.log(`Successfully imported ${file}:`, assets.meshes.map(m => m.name).join(", "));
      return assets;
    } catch (error) {
      console.error(`Error loading asset ${file}:`, error);
      throw error;
    }
  }

  clone(meshName) {
    try {
      const isAltModel = meshName.includes("_Alt");
      const baseMeshName = isAltModel ? meshName.replace("_Alt", "") : meshName;
      const searchMeshName = spaceinvadersConfig.useAltModels && baseMeshName !== "Player_1" 
        ? `${baseMeshName}_Alt` 
        : baseMeshName;
      
      console.log(`Attempting to clone mesh: ${searchMeshName}`);
      console.log(`Available meshes:`, this.assetContainer.meshes.map(m => m.name).join(", "));
      
      const sourceMesh = this.assetContainer.meshes.find(mesh => mesh.name === searchMeshName);
      
      if (!sourceMesh) {
        console.error(`Mesh not found: ${searchMeshName}`);
        console.error(`Available meshes:`, this.assetContainer.meshes.map(m => m.name).join(", "));
        return null;
      }

      const clonedMesh = sourceMesh.clone(`${searchMeshName}_${Math.random()}`);
      clonedMesh.position = new Vector3(0, 0, 0);
      
      // Preserve scaling from source mesh
      clonedMesh.scaling = sourceMesh.scaling.clone();
      
      console.log(`Successfully cloned mesh ${searchMeshName} -> ${clonedMesh.name}`);
      return clonedMesh;
    } catch (error) {
      console.error("Error cloning mesh:", error);
      return null;
    }
  }

  pushToAssetsContainer(mesh) {
    console.log(`Adding mesh to container: ${mesh.name}`);
    this.assetContainer.meshes.push(mesh);
  }

  checkComplete() {
    if (this.assetsLoaded > this.totalAssetsToLoad - 1) {
      // Must call removeAllFromScene on next tick for some reason
      setTimeout(() => {
        this.assetContainer.removeAllFromScene();
        this.isComplete = true;
      }, 1);
    }
  }

  hideTemplateMeshes() {
    // Hide template meshes by setting visibility to 0 instead of removing them
    this.assetContainer.meshes.forEach(mesh => {
      mesh.visibility = 0;
    });
  }
}
