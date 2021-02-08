import * as THREE from 'three';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BaseEngineService } from '../base-engine/base-engine.service';

export interface IRedCube {
  dimensions: {
    x: number;
    y: number;
    z: number;
  },
  position: {
   x: number;
   y: number;
   z: number;
  },
  scale: {
   x: number;
   y: number;
   z: number;
  }
 }

@Injectable({ providedIn: 'root' })
export class EngineBasicService extends BaseEngineService implements OnDestroy {
  

  constructor(ngZone: NgZone) {
    super(ngZone);
  }


  _renderScene() {
    /** Add AxesHelper To our scene */
    this.renderAxesHelper();

    /** RePosition camera to show X axes */
    this.camera.position.set(1, 1, 3);

    const cubeGroup = new THREE.Group();
    this.scene.add(cubeGroup);
  
    const meshCube1 = this.createRedCube({
      dimensions: {
        x: 0.6,
        y: 0.6,
        z: 0.6
      },
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      scale: {
       x: 1,
       y: 1,
       z: 1
      }
    });

    const meshCube2 = this.createRedCube({
      dimensions: {
        x: 0.8,
        y: 0.8,
        z: 0.8
      },
      position: {
       x: 1.2,
       y: 1.2,
       z: 1.2
      },
      scale: {
       x: 1,
       y: 1,
       z: 1
      }
    });

    const meshCube3 = this.createRedCube({
      dimensions: {
        x: 1,
        y: 1,
        z: 1
      },
      position: {
       x: 1,
       y: 1,
       z: 1
      },
      scale: {
       x: 1,
       y: 1,
       z: 1
      }
    });
  

    meshCube1.rotation.y = Math.PI * 0.2;
    meshCube1.rotation.x = Math.PI * 0.2;
    meshCube1.rotation.z = Math.PI * 0.2;
    
    cubeGroup.add(meshCube1);
    cubeGroup.add(meshCube2);
    cubeGroup.add(meshCube3);

    /** Distance between mesh object to camera */
    console.log(meshCube1.position.distanceTo(this.camera.position));

    /** normalize position of the mesh */
    meshCube1.position.normalize();
    console.log(meshCube1.position.length())
  }

  createRedCube(config: IRedCube): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(config.dimensions.x, config.dimensions.y, config.dimensions.z);
    const material = new THREE.MeshBasicMaterial({
      color: 'red'
    });

    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(config.position.x, config.position.y, config.position.z);
    mesh.scale.set(config.scale.x, config.scale.y, config.scale.z);

    return mesh;
  }

  
}
