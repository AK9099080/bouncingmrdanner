let speed = 20;
let scale = 0.17;
let canvas;
let ctx;

// Array of image paths
let images = [
    'img1.png',
    'img2.png',
    'img3.png',
    'img4.png'
];

let dvd = {
    x: 300,
    y: 300,
    xspeed: 2,
    yspeed: 2,
    img: new Image()
};

(function main(){
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");

    // Set initial image
    pickImage();

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    update();
})();

function update() {
    setTimeout(() => {
        // Clear screen
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw image
        ctx.drawImage(
            dvd.img,
            dvd.x,
            dvd.y,
            dvd.img.width * scale,
            dvd.img.height * scale
        );

        // Move
        dvd.x += dvd.xspeed;
        dvd.y += dvd.yspeed;

        // Check collisions
        checkHitBox();

        update();
    }, speed);
}

function checkHitBox(){
    let hit = false;

    if (dvd.x + dvd.img.width * scale >= canvas.width || dvd.x <= 0){
        dvd.xspeed *= -1;
        hit = true;
    }

    if (dvd.y + dvd.img.height * scale >= canvas.height || dvd.y <= 0){
        dvd.yspeed *= -1;
        hit = true;
    }

    // Change image only if bounced
    if (hit) pickImage();
}

// Pick a random image
function pickImage(){
    let randIndex = Math.floor(Math.random() * images.length);
    dvd.img.src = images[randIndex];
}
