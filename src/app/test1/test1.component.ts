import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Observable, of, fromEvent, interval, Subscription, BehaviorSubject} from 'rxjs';
import { KonvaComponent } from 'ng2-konva';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class Test1Component implements OnInit {
  // @ViewChild('rect1') rect1: KonvaComponent;
  @ViewChild('layer') layer: KonvaComponent;
  @ViewChild('stage') stage: KonvaComponent;

  @ViewChildren('rect') rectList: QueryList<KonvaComponent>;


  private index: number=0;
  private mouseX;
  private mouseY;
  private startX;
  private startY;
  private endX;
  private endY;
  private isDrawing:boolean = false;
  private timer: Subscription;
  public layerList: Array<any> = [];
  public rectConfigList: Array<any> = [];
  public currentRect;


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

  constructor(private cd: ChangeDetectorRef) { }

  refresh() {
    this.cd.detectChanges();
  }

  drawingOn(){
    console.log(this.rectList);
    this.currentRect = this.rectList.toArray()[this.index].getStage();
    console.log(this.currentRect);

    this.startX = this.mouseX;
    this.startY = this.mouseY;

    this.currentRect.x(this.startX);
    this.currentRect.y(this.startY);
    this.timer = interval(10).subscribe(x => {
      this.dragging();
      this.layer.getStage().draw();
      // console.log("test");
    });
  }

  dragging() {
    this.currentRect.width(this.mouseX - this.startX);
    this.currentRect.height(this.mouseY- this.startY);
  }

  drawingOff(){
    console.log("drawing is off");
    this.timer.unsubscribe();
    this.endX = this.mouseX;
    this.endY = this.mouseY;
    this.redrawShape();
    this.layer.getStage().draw();
    this.index+=1;
  }

  redrawShape(){
    this.currentRect.x(this.startX);
    this.currentRect.y(this.startY);
    this.currentRect.width(this.endX - this.startX);
    this.currentRect.height(this.endY - this.startY);
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
  	});

    for(let i=0; i<50; i++) {
      this.rectConfigList.push(
        new BehaviorSubject({
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          fill: 'transparent',
          stroke: 'black',
          strokeWidth: 1
        })
      );
    }
	 }
}
