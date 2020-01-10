

import MM from "./math.js"

const GetMousePosition = (e,canvas) => {
    let rect = canvas.getBoundingClientRect();
    let x = Math.round(e.clientX - rect.left);
    let y = Math.round(e.clientY - rect.top);
    return {x:x,y:y};
}


class Node {
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

export default class Paint{
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext('2d');
        this.dragging = false;
        this.useBrush = false;
        this.canvas.addEventListener("mousedown", e => {
            this.dragging = true;
            this.saveImageData = this.ctx.getImageData(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
            this.mouseDown=GetMousePosition(e,this.canvas);
            if(this.currentTool === "pencil" || this.currentTool === "brush"){
             this.ctx.strokeStyle = this.color;
             this.useBrush = true;
             this.ctx.beginPath();
             this.ctx.moveTo(this.mouseDown.x,this.mouseDown.y);
            }
            else if(this.currentTool === "paint-bucket"){
                let transition_string = this.color.replace("rgba(","").replace(")","").split(",");
                let replacementColor =  []
                let targetColor = this.getPixel(this.mouseDown);
                transition_string.forEach(item =>replacementColor.push(parseInt(item,10)));
                this.queue = [];
                this.paintBucketFill(this.mouseDown,targetColor,replacementColor);
            }
            else if (this.currentTool == "eraser"){
                this.useBrush = true;
                this.ctx.strokeStyle = "white";
                this.ctx.beginPath();
                this.ctx.moveTo(this.mouseDown.x,this.mouseDown.y);
            }
        });
        this.canvas.addEventListener("touchstart", e => {
            this.dragging = true;
            this.saveImageData = this.ctx.getImageData(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
            this.mouseDown=GetMousePosition(e,this.canvas);
            if(this.currentTool === "pencil" || this.currentTool === "brush"){
             this.useBrush = true;
             this.ctx.beginPath();
             this.ctx.moveTo(this.mouseDown.x,this.mouseDown.y);
            }
            else if(this.currentTool === "paint-bucket"){
                let transition_string = this.color.replace("rgba(","").replace(")","").split(",");
                let replacementColor =  []
                let targetColor = this.getPixel(this.mouseDown);
                transition_string.forEach(item =>replacementColor.push(parseInt(item,10)));
                this.queue = [];
                this.paintBucketFill(this.mouseDown,targetColor,replacementColor);
            }
            else if (this.currentTool == "eraser"){
                this.useBrush = true;
                this.ctx.strokeStyle = "white"
                this.ctx.beginPath();
                this.ctx.moveTo(this.mouseDown.x,this.mouseDown.y);
            }
        });
        this.canvas.addEventListener("mousemove",e=>{
            if(this.dragging){
                this.currentPos=GetMousePosition(e,this.canvas);
                if(!this.useBrush){
                    this.drawingShape(this.currentTool);
                }
                else{
                    this.ctx.lineWidth = this.currentLineWidth;
                    this.ctx.lineTo(this.currentPos.x,this.currentPos.y);
                    this.ctx.stroke();
                }
            }
        });
        this.canvas.addEventListener("touchmove",e=>{
            if(this.dragging){
                this.currentPos=GetMousePosition(e,this.canvas);
                if(!this.useBrush){
                    this.drawingShape(this.currentTool);
                }
                else{
                    this.ctx.lineWidth = this.currentLineWidth;
                    this.ctx.lineTo(this.currentPos.x,this.currentPos.y);
                    this.ctx.stroke();
                }
            }
        });
        this.canvas.addEventListener("mouseup",e =>{
            this.dragging=false;
            this.useBrush = false;
        });
        this.canvas.addEventListener("touchend",e =>{
            this.dragging=false;
            this.useBrush = false;
        });
    }

    set selectedTool(tool){
        this.currentTool = tool;
    }
    set selectedLineWidth(line_width){
        this.currentLineWidth = line_width;
    }
    set selectedColor(color){
        this.color = color;
        this.ctx.strokeStyle = this.color;
    }
    drawingShape(tool){

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.currentLineWidth;
        this.ctx.putImageData(this.saveImageData,0,0);
        this.ctx.beginPath();

        switch(tool){
            case "line":
                this.ctx.moveTo(this.mouseDown.x,this.mouseDown.y);
                this.ctx.lineTo(this.currentPos.x,this.currentPos.y);
                break;
            case "rectangle":
                this.ctx.rect(this.mouseDown.x,this.mouseDown.y,this.currentPos.x -this.mouseDown.x,this.currentPos.y - this.mouseDown.y);
                break;
            case "circle":
                let distance = MM.distance(this.mouseDown.x,this.mouseDown.y,this.currentPos.x,this.currentPos.y);
                this.ctx.arc(this.mouseDown.x,this.mouseDown.y,distance,0,2* Math.PI);
                break;
            case "triangle":
                this.ctx.moveTo(this.mouseDown.x,this.mouseDown.y);
                this.ctx.lineTo(this.mouseDown.x,this.currentPos.y);
                this.ctx.lineTo(this.currentPos.x ,this.currentPos.y);
                this.ctx.closePath();
            default:
                break
        }
        this.ctx.stroke();
    }

    paintBucketFill(node,targetColor,replacementColor){
        if(this.equalColor(targetColor,replacementColor)) return;
        this.queue.push(new Node(node.x,node.y));
        while(this.queue.length != 0){
            let currentNode = this.queue.shift();
            let colorCurrentNode = this.getPixel(currentNode);
            if(this.equalColor(colorCurrentNode,targetColor)){
                let w = new Node(currentNode.x,currentNode.y);
                let e = new Node(currentNode.x,currentNode.y);
                let colorWest = this.getPixel(w);
                let colorEst = this.getPixel(e);
                while(this.equalColor(colorWest,targetColor)){
                    w.x = w.x - 1;
                    colorWest = this.getPixel(w);
                }
                while(this.equalColor(colorEst,targetColor)){
                    e.x = e.x + 1;
                    colorEst = this.getPixel(e);
                }
                let westEstStack = [];
                for(let i= w.x;i<e.x;i++){
                    westEstStack.push(new Node(i,w.y));
                }
                westEstStack.forEach(el =>{
                    this.setPixel(el,replacementColor);
                    let n = new Node(el.x,el.y+1);
                    let s = new Node(el.x,el.y-1);
                    let northColor = this.getPixel(n);
                    let southColor = this.getPixel(s);
                    if(this.equalColor(northColor,targetColor)){
                        this.queue.push(new Node(el.x,el.y+1));
                    }
                    if(this.equalColor(southColor,targetColor)){
                        this.queue.push(new Node(el.x,el.y-1));
                    }
                });
                this.ctx.putImageData(this.saveImageData,0,0);
            }
        }
    }
    equalColor(color1,color2){
        return(color1[0]===color2[0]&&color1[1]===color2[1]&&color1[2]===color2[2]&&color1[3]===color2[3])
    }
    getPixel(point){
        return [
            this.saveImageData.data[(point.y * this.saveImageData.width + point.x)*4+0],
            this.saveImageData.data[(point.y * this.saveImageData.width + point.x)*4+1],
            this.saveImageData.data[(point.y * this.saveImageData.width + point.x)*4+2],
            this.saveImageData.data[(point.y * this.saveImageData.width + point.x)*4+3]
        ];
    }
    setPixel(point,fillColor){
        this.saveImageData.data[(point.y * this.saveImageData.width + point.x)*4+0]= fillColor[0];
        this.saveImageData.data[(point.y * this.saveImageData.width + point.x)*4+1]= fillColor[1];
        this.saveImageData.data[(point.y * this.saveImageData.width + point.x)*4+2]= fillColor[2];
        this.saveImageData.data[(point.y * this.saveImageData.width + point.x)*4+3]= fillColor[3];
    }



}