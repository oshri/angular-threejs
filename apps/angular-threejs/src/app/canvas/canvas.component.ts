import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Object3dModelEngineService } from '../services/3d-model-engine/3d-model-engine.service';
import { EngineBasicService } from '../services/basic-mesh/basic-mesh.service';
@Component({
  selector: 'threejs-canvas',
  templateUrl: './canvas.component.html'
})
export class CanvasComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(
    private object3dModelEngineService: Object3dModelEngineService,
    private engineBasicService: EngineBasicService
  ) { }

  public ngOnInit(): void {
    // this.Creat3DModel();
    this.CreateBasicObject();
  }

  private CreateBasicObject() {
    this.engineBasicService.createScene(this.rendererCanvas);
    this.engineBasicService.animate();
  }

  private Creat3DModel() {
    this.object3dModelEngineService.createScene(this.rendererCanvas);
    this.object3dModelEngineService.animate();
  }

}
