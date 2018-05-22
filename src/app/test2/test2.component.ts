import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {

  @ViewChild('stage') stage: KonvaComponent;
  @ViewChild('layer') layer: KonvaComponent;
  @ViewChild('text') text: KonvaComponent;
  @ViewChild('shape1') shape1: KonvaComponent;


  public w=20;
  public h=20;
 
  public configStage = of({
    width: 300,
    height: 200
  });
  public configItem = of({
    x: 80,
    y: 120,
    sides: 3,
    radius: 80,
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 4
  });
  public configText = of({
    x: 20,
    y: 20,
    fontFamily: 'Calibri',
    fontSize: 24,
    text: '',
    fill: 'black'
  });
 
  public writeMessage(message: string) {
    this.text.getStage().setText(message);
    this.shape1.getStage().radius(160);
    this.layer.getStage().draw();

  }
 
  public handleMouseOut() {
    this.writeMessage('Mouseout triangle');
  }
 
  public handleMouseMove() {
    const mousePos = this.stage.getStage().getPointerPosition();
    const x = mousePos.x - 190;
    const y = mousePos.y - 40;
    this.writeMessage('x: ' + x + ', y: ' + y);
  }

  ngOnInit(){}

}
