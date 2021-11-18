import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({ providedIn: 'root' })
export abstract class BaseEngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private axesHelper: THREE.AxesHelper;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;

  orbitControls: OrbitControls;
  controllerObject: any;

  private frameId: number = null;

  constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.canvas.getContext('webgl', {
      preserveDrawingBuffer: true,
      alpha: true,
      antialias: true,
      depth: true
    });

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;
    this.orbitControls = new OrbitControls(this.camera, this.canvas);

    this.scene.add(this.camera);
    this._renderScene();
  }

  renderAxesHelper(): void {
    this.axesHelper = new THREE.AxesHelper(2);
    this.scene.add(this.axesHelper);
  }

  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  abstract _renderScene(): void;
}
