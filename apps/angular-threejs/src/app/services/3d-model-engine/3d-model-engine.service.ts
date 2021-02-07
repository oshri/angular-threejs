import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseEngineService } from '../base-engine/base-engine.service';

@Injectable({ providedIn: 'root' })
export class Object3dModelEngineService extends BaseEngineService implements OnDestroy {
  private ambientLight: THREE.AmbientLight;
  private pointLight: THREE.PointLight;

  private objLoader: OBJLoader;
  private objLoaderMaterial: MTLLoader;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  _renderScene() {
    // AmbientLight
    this.ambientLight = new THREE.AmbientLight(0x404040);
    this.ambientLight.position.z = 10;
    this.scene.add(this.ambientLight);

    // PointLight
    this.pointLight = new THREE.PointLight(0xffffff, 1.4, 1000);
    this.pointLight.position.set(0, 15, 15);
    this.scene.add(this.pointLight);

    this.loadControllerMaterial();
  }

  loadControllerMaterial(): void {
    this.objLoaderMaterial = new MTLLoader();
    this.objLoaderMaterial.load('/assets/controller.mtl', (materials) => {
      materials.preload();

      this.objLoader = new OBJLoader();
      this.objLoader.setMaterials(materials);

      this.objLoader.load(
        '/assets/controller.obj',
        (object) => {
          this.controllerObject = object;
          this.controllerObject.position.set(0, 0, 0);
          this.scene.add(this.controllerObject);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
          console.log('An error happened', error);
        }
      );
    });
  }

}
