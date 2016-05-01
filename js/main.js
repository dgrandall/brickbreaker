// consts for brick stuff
const widthDivisor = 10;
const heightDivisor = 20;
const numOfRows = 5;

class Platform{
    constructor(locX, size, ctx){
        this.x = locX;
        this.size = size;
        this.y = ctx.canvas.height - (ctx.canvas.height / 10);
        this.boxHeight = window.innerHeight / 25;
    }

    draw(ctx){
      ctx.fillStyle = "#000000";
      ctx.fillRect(this.x, this.y, this.size, this.boxHeight);
    }

    update(ctx, mouseX){
      // update mouse location
      // document.onmousemove = function(e){
      //   this.x = e.clientX;
      // }

      this.x = mouseX;

      if(this.x > ctx.canvas.width - (this.size / 2)) {
          this.x = ctx.canvas.width - (this.size / 2);
      }
      else if(this.x < this.size / 2) {
          this.x = this.size / 2;
      }

      this.x = this.x - (ctx.canvas.width / 5) / 2;

      ctx.fillStyle = "#000000";
      ctx.fillRect(this.x, this.y, this.size, this.boxHeight);
    }

}

function init() {
    // class variables
    var bricks = [];

    var canvas = document.getElementById('game'),
        ctx = canvas.getContext('2d');

    //set default mouse position
    var mouseX = ctx.canvas.width / 2;

    // autosize canvas to window size
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // draw all the bricks
      for (y = 0; y < numOfRows; y++) {
          for (x = 0; x < widthDivisor; x++) {
              var b = new Brick(1, x * (ctx.canvas.width / widthDivisor), (ctx.canvas.height / widthDivisor) + (y * (ctx.canvas.height / heightDivisor)), ctx);
              b.draw(ctx);
              bricks.push(b);
          }
      }

    //create new platform and draw it
    var platform = new Platform(mouseX - (ctx.canvas.width / 5) / 2, ctx.canvas.width / 5, ctx);
    platform.draw(ctx);

    setInterval( function() {
      document.onmousemove = function(e){
        mouseX = e.clientX;
      }
      update(canvas, ctx, mouseX, platform, bricks)
    }, 80);
}

function update(canvas, ctx, mouseX, platform, bricks){
      //clear the canvas
      ctx.clearRect(0,0,canvas.width, canvas.height);

      //update the platform location
      platform.update(ctx, mouseX);

      // update bricks
      for (var b of bricks)
          b.update(ctx);
}

function Brick(health, x, y, ctx) {
    this.health = health;
    this.xPosition = x;
    this.yPosition = y;
    this.color = 'hsl(' + 360 * Math.random() + ', 75%, 60%)'; // random color, same saturation and intensity

    // constant for all bricks
    this.width = ctx.canvas.width / widthDivisor;
    this.height = ctx.canvas.height / heightDivisor;

    //functions
    this.draw = function (ctx){
        // fill with color
        ctx.rect(this.xPosition, this.yPosition, this.width, this.height)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPosition, this.yPosition, this.width, this.height);
        // add stroke
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    this.update = function(ctx){

        // create brick, fill it with its color
        ctx.rect(this.xPosition, this.yPosition, this.width, this.height)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPosition, this.yPosition, this.width, this.height);
        // add stroke
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}

document.addEventListener("DOMContentLoaded", init, false);
