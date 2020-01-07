
import Paint from "./Paint.js"



let canvas = document.getElementById("canvas");
let paint = new Paint("canvas");
paint.selectedTool = "brush";
paint.selectedLineWidth = 1;
paint.selectedColor = "rgba(0,0,0,255)";

let commands = Array.from(document.getElementsByClassName("commands"));
let ctx = canvas.getContext('2d');
const render = () => {
    ctx.canvas.width = document.documentElement.clientWidth * 0.5;
    ctx.canvas.height = document.documentElement.clientHeight * 0.5;
};
window.addEventListener("resize", render);
render();

commands.forEach(item =>{
    item.addEventListener("mousedown",e=>{
        let selectedCmd = item.getAttribute("title");
        if (selectedCmd === "open"){
            document.getElementById('files').click();
            document.getElementById('files').addEventListener("change",handleFileSelect);
        }
        else if (selectedCmd === "save"){
            let a_element = document.createElement("a");
            a_element.setAttribute('download', 'image.png');
            a_element.setAttribute('href', canvas.toDataURL());
            a_element.click();
        }
    });
});
commands.forEach(item =>{
    item.addEventListener("touchstart",e=>{
        let selectedCmd = item.getAttribute("title");
        if (selectedCmd === "open"){
            document.getElementById('files').click();
            document.getElementById('files').addEventListener("change",inputFile);
        }
        else if (selectedCmd === "save"){
            let a_element = document.createElement("a");
            a_element.setAttribute('download', 'image.png');
            a_element.setAttribute('href', canvas.toDataURL());
            a_element.click();
        }
    });
});


 const inputFile = evt =>{
    let files = evt.target.files;
    for (let i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      let reader = new FileReader();
      let img = new Image();
      reader.onload = (function(theFile) {
        return function(e) {
        img.onload = function(){
          ctx.clearRect(0,0,canvas.width, canvas.height);
          ctx.drawImage(img,0,0);
        }
           img.src = e.target.result;
        };
      })(f);
      reader.readAsDataURL(f);
    }
}


let tools = Array.from(document.getElementsByClassName("tools"));

tools.forEach(tool =>{
    tool.addEventListener("click",e=>{
        let selectedTool = tool.getAttribute("title");
        paint.selectedTool = selectedTool;
    });
});

let size = Array.from(document.getElementsByClassName("line_width"));

size.forEach(item =>{

    item.addEventListener("click",e => {
        document.querySelector("[title].on").classList.toggle("on");
        item.classList.toggle("on");
        let lw = item.getAttribute("title").replace(" pixels","");
        console.log(lw);
        paint.selectedLineWidth = lw;
    });
});

let colors = Array.from(document.getElementsByClassName("color"));

colors.forEach(color =>{
    color.addEventListener("click",e => {
        let currentColor = color.getAttribute("title");
        paint.selectedColor = currentColor;
    });
});
