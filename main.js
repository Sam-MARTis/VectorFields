let canvas;
let ctx;
let flowfield;
let flowfieldanimation;
let mouseX = window.width / 2;;
let mouseY = window.height / 2;
let lasttime=0;
window.onload = () => {
    canvas =document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    ctx.lineWidth=100;
    

    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowfield = new FlowFieldEffect(ctx, window.innerWidth, window.innerHeight);
    flowfield.animate();
    
};
const canvasResize = () => {
    cancelAnimationFrame(flowfieldanimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("canvasResize");
    flowfield = new FlowFieldEffect(ctx, window.innerWidth, window.innerHeight);
    
    flowfield.animate();
};
const mouseMove = (e) => {
    // console.log(e);
    mouseX=e.layerX;
    mouseY = e.layerY;
}
const mouseClick = (e) =>{
    // console.log(e);
}

addEventListener('resize', canvasResize);
addEventListener('mousemove', mouseMove);
addEventListener('click', mouseClick)



class FlowFieldEffect {
    #ctx
    #width
    #height
  
    constructor(ctx, width, height) {
        this.x = width/2;
        this.y = height/2;;
        this.angle = 0;
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.strokeStyle='#FFFFFF';
        this.cellsize = 35;
        this.scale = 0.5;
        console.log("Loaded");
        
        // this.#draw(10, 10)
    }

    #draw = (x, y, posx, posy, scale) => {
        let length = 40*scale;
        this.#ctx.beginPath();
        ctx.lineWidth = 1.5
        this.#ctx.moveTo(posx, posy);

        const delX = x-posx;
        // console.log(x);
        // console.log(posx);
        const delY = y-posy;
        const mag = (delX**2 + delY**2)**0.5;
        // console.log(mag);
        let lambda = mag/Math.max(this.#width, this.#height);
        
        lambda = lambda **0.6;
        length = length * (1-lambda)
        this.#ctx.strokeStyle = `rgb(${(1-lambda)*255}, 0, ${lambda*255})`;
        this.#ctx.lineTo(posx + length*delX/mag, posy+ length*delY/mag);
        this.#ctx.stroke();
        

    }
    #drawAngle = (angle, posx, posy, scale) => {
        const length = scale;
        this.#ctx.beginPath();
        this.#ctx.moveTo(posx, posy);

        // console.log(mag);
        this.#ctx.lineTo(posx+ length*Math.cos(angle), posy+ length*Math.sin(-angle));
        this.#ctx.stroke();

    }
    animate = () =>{
        
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        for(let i=0; i<this.#width; i+=this.cellsize){
            for(let j=0; j<this.#height; j+=this.cellsize){
                // this.#drawAngle(this.angle+(i+j)/400, i, j, 1);
                this.#draw(mouseX, mouseY, i, j, this.scale);

            }
        }
        // this.#draw(3, 3, this.#width/2 , this.#height/2);
        // this.#drawAngle(this.angle, this.#width/2, this.#height/2)
        this.angle+=0.1
        // this.x+=0.1;
        // x+=1;
        // console.log("Animating");
        flowfieldanimation =requestAnimationFrame(this.animate.bind(this));

    }
}