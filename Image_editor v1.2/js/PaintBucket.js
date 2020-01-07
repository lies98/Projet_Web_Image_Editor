
class Node {
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

export default class PaintBucket{
    constructor(canvas,point,color){
        this.ctx = canvas.getContext('2d');
        this.imageData = this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        let transition_string = color.replace("rgba(","").replace(")","").split(",");
        let replacementColor =  []
        let targetColor = this.getPixel(point);
        transition_string.forEach(item =>replacementColor.push(parseInt(item,10)));
        this.queue = [];
        this.paintBucketFill(point,targetColor,replacementColor);
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
                this.ctx.putImageData(this.imageData,0,0);
            }
        }
    }
    equalColor(color1,color2){
        return(color1[0]===color2[0]&&color1[1]===color2[1]&&color1[2]===color2[2]&&color1[3]===color2[3])
    }
    getPixel(point){
        return [
            this.imageData.data[(point.y * this.imageData.width + point.x)*4+0],
            this.imageData.data[(point.y * this.imageData.width + point.x)*4+1],
            this.imageData.data[(point.y * this.imageData.width + point.x)*4+2],
            this.imageData.data[(point.y * this.imageData.width + point.x)*4+3]
        ];
    }
    setPixel(point,fillColor){
        this.imageData.data[(point.y * this.imageData.width + point.x)*4+0]= fillColor[0];
        this.imageData.data[(point.y * this.imageData.width + point.x)*4+1]= fillColor[1];
        this.imageData.data[(point.y * this.imageData.width + point.x)*4+2]= fillColor[2];
        this.imageData.data[(point.y * this.imageData.width + point.x)*4+3]= fillColor[3];
    }
}