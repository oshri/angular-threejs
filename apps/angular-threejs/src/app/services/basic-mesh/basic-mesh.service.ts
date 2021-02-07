import * as THREE from 'three';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BaseEngineService } from '../base-engine/base-engine.service';

@Injectable({ providedIn: 'root' })
export class EngineBasicService extends BaseEngineService implements OnDestroy {
  

  constructor(ngZone: NgZone) {
    super(ngZone);
  }


  _renderScene() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 'red'
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }

  
}
