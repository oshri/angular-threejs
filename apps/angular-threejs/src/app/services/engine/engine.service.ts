import * as THREE from 'three';
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;

  private ambientLight: THREE.AmbientLight;
  private pointLight: THREE.PointLight;

  private objLoader: OBJLoader;
  private objLoaderMaterial: MTLLoader;
  private orbitControls: OrbitControls;

  
  private controllerObject: any;
  
  private frameId: number = null;

  public constructor(private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
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

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
