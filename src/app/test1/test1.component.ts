import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { Observable, of, fromEvent, interval, Subscription} from 'rxjs';
import { KonvaComponent } from 'ng2-konva';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {
  @ViewChild('rect1') rect1: KonvaComponent;
  @ViewChild('layer') layer: KonvaComponent;
  @ViewChild('stage') stage: KonvaComponent;

  private mouseX;
  private mouseY;
  private startX;
  private startY;
  private endX;
  private endY;
  private isDrawing:boolean = false;
  private timer: Subscription;
  public configStage = of({
      width: 800,
      height: 400
    });

   public configRect = of({
      x: 20,
      y: 20,
      width: 150,
      height: 100,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 1
    }); 

  constructor() { }

  drawingOn(){
    let rect = this.rect1.getStage();

    this.startX = this.mouseX;
    this.startY = this.mouseY;

    rect.x(this.startX);
    rect.y(this.startY);
     this.timer = interval(10).subscribe(x => {
      this.dragging();
      this.layer.getStage().draw();
      // console.log("test");
      });
  }

  dragging() {
    let rect = this.rect1.getStage();
    rect.width(this.mouseX - this.startX);
    rect.height(this.mouseY- this.startY);
  }

  drawingOff(){
    console.log("drawing is off");
    this.timer.unsubscribe();
    this.endX = this.mouseX;
    this.endY = this.mouseY;
    this.redrawShape();
    this.layer.getStage().draw();
  }

  redrawShape(){
    let rect = this.rect1.getStage();
    rect.x(this.startX);
    rect.y(this.startY);
    rect.width(this.endX - this.startX);
    rect.height(this.endY - this.startY);
  }

  // public handleClick(component) {
  //   console.log('Hello Circle', component);
  // }

   


  ngOnInit() {
  	const el = document.getElementById('canvas');
  	const mouseMoves = fromEvent(el, 'mousemove');
  	const subscription = mouseMoves.subscribe((evt: MouseEvent) => {
  	  this.mouseX = `${evt.clientX}`;
  	  this.mouseY = `${evt.clientY}`;

  	  // When the mouse is over the upper-left of the screen,
  	  // unsubscribe to stop listening for mouse movements
  	  // if (evt.clientX < 40 && evt.clientY < 40) {
  	  //   subscription.unsubscribe();
  	  // }
  	});

    

	 }
}
