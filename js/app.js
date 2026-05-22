let speed = 20;
let scale = 0.3; // make bigger so it's obvious

let canvas = document.getElementById("tv-screen");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ✅ TEMP: use a guaranteed working image
let dvdImg = new Image();
dvdImg.src = "https://upload.wikimedia.org/wikipedia/commons/9/9b/DVD_logo.svg";

// Your background images
let bgImages = [
    'https://raw.githubusercontent.com/AK9099080/bouncingmrdanner/93317cf49cc9b8ff35e8806f1dcb3ac661011ea8/1.jpg',
    'https://raw.githubusercontent.com/AK9099080/bouncingmrdanner/93317cf49cc9b8ff35e8806f1dcb3ac661011ea8/2.webp',
    'https://raw.githubusercontent.com/AK9099080/bouncingmrdanner/93317cf49cc9b8ff35e8806f1dcb3ac661011ea8/battleofneworleans.webp'
];

let bgImg = new Image();

let dvd = {
    x: 200,
    y: 200,
    xspeed: 3,
    yspeed: 3
};

// ✅ Pick background safely
function pickBackground(){
    let index = Math.floor(Math.random() * bgImages.length);
    let img = new Image();
    img.src = bgImages[index];

    img.onload = () => {
        bgImg = img;
    };
}

// ✅ MAIN START
dvdImg.onload = () => {
    pickBackground();
    update();
};

function update() {
    setTimeout(() => {

        // clear screen
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let w = dvdImg.width * scale;
        let h = dvdImg.height * scale;

        // ✅ ALWAYS draw something (debug fallback)
        if (bgImg.complete && bgImg.naturalWidth !== 0) {
            ctx.drawImage(bgImg, dvd.x, dvd.y, w, h);
        } else {
            ctx.fillStyle = "red"; // fallback so you SEE something
            ctx.fillRect(dvd.x, dvd.y, w, h);
        }

        ctx.drawImage(dvdImg, dvd.x, dvd.y, w, h);

        dvd.x += dvd.xspeed;
        dvd.y += dvd.yspeed;

        // bounce detection
        if (dvd.x + w >= canvas.width || dvd.x <= 0) {
            dvd.xspeed *= -1;
            pickBackground();
        }

        if (dvd.y + h >= canvas.height || dvd.y <= 0) {
            dvd.yspeed *= -1;
            pickBackground();
        }

        update();

    }, speed);
}
