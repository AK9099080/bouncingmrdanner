let speed = 20;
let scale = 0.17;
let canvas;
let ctx;

// Your background images
let bgImages = [
    'https://raw.githubusercontent.com/AK9099080/bouncingmrdanner/93317cf49cc9b8ff35e8806f1dcb3ac661011ea8/1.jpg',
    'https://raw.githubusercontent.com/AK9099080/bouncingmrdanner/93317cf49cc9b8ff35e8806f1dcb3ac661011ea8/2.webp',
    'https://raw.githubusercontent.com/AK9099080/bouncingmrdanner/93317cf49cc9b8ff35e8806f1dcb3ac661011ea8/battleofneworleans.webp'
];

let bgImg = new Image();

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

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    dvd.img.src = 'dvd-logo.png';

    // ✅ WAIT for logo to load before starting
    dvd.img.onload = () => {
        pickBackground();
        update();
    };
})();

function update() {
    setTimeout(() => {

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let w = dvd.img.width * scale;
        let h = dvd.img.height * scale;

        // ✅ Only draw bg image if it's loaded
        if (bgImg.complete && bgImg.naturalWidth !== 0) {
            ctx.drawImage(bgImg, dvd.x, dvd.y, w, h);
        }

        // Draw main logo on top
        ctx.drawImage(dvd.img, dvd.x, dvd.y, w, h);

        dvd.x += dvd.xspeed;
        dvd.y += dvd.yspeed;

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

    if (hit) pickBackground();
}

function pickBackground(){
    let index = Math.floor(Math.random() * bgImages.length);

    let newImg = new Image();
    newImg.src = bgImages[index];

    // ✅ only swap when loaded (prevents blank flicker)
    newImg.onload = () => {
        bgImg = newImg;
    };
}
