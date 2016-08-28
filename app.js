// app

var keysPressed = {}
var keys = {
    left: 37,
    right: 39,
    bullet: 38,
}

var isAsteroidOnScreen = []
var asteroidPosition = [[0,0],[0,0],[0,0]]
var asteroids = []
for (var i=0; i<3; i++){
    asteroids.push(getNewAsteroid(i))
}
console.log("VERY TOP", asteroidPosition)

var bulletPosition = [320, 320]
var bulletFired = false
var bulletDirectionSet = false

function set360ToZero(){
    if ( gunAimDirection > 360 ) {
        gunAimDirection -= 360
    }
    if ( gunAimDirection < 0 ) {
        gunAimDirection += 360
    }
}

function checkBulletOutOfBounds(){
    if ( bulletPosition[0] < -1 || bulletPosition[0] > 640 || bulletPosition[1] < -1 || bulletPosition[1] > 640 ) {
        bulletFired = false
        bulletPosition = [320, 320]
        bulletDirectionSet = false
    }
}

function bulletDirection(){
    var xy = [0,0]

    if ( gunAimDirection >= 0 && gunAimDirection <= 90 ){
        xy[0] = gunAimDirection / 45
        xy[1] = -1
        console.log('i am here 0', xy)
        bulletDirectionSet = true
        return xy
    }

    if ( gunAimDirection > 90 && gunAimDirection <= 180 ){
        xy[0] = (gunAimDirection-90) / 45
        xy[1] = 1
        console.log('i am here 90', xy)
        bulletDirectionSet = true
        return xy
    }
    if ( gunAimDirection > 180 && gunAimDirection <= 270 ){
        xy[0] = (-(gunAimDirection-180) / 45)
        xy[1] = 1
        console.log('i am here 180', xy)
        bulletDirectionSet = true
        return xy
    }
    if ( gunAimDirection > 270 && gunAimDirection < 360 ){
        xy[0] = (-(gunAimDirection-270) / 45)
        xy[1] = -1
        console.log('i am here 270', xy)
        bulletDirectionSet = true
        return xy
    }
}

function calcBulletPosition(){
    if ( bulletDirectionSet == false ) {
        increment = [0,0]
        increment = bulletDirection()
    }
    bulletPosition[0] += increment[0]
    bulletPosition[1] += increment[1]
    checkBulletOutOfBounds()
}

function determineRotationDirection(){
    var totalRotation = 0
    if (keysPressed[keys.left]){
        totalRotation -= 2
        gunAimDirection -= 2
        set360ToZero()
    }
    if (keysPressed[keys.right]){
        totalRotation += 2
        gunAimDirection += 2
        set360ToZero()
    }
    if (keysPressed[keys.bullet]){
            bulletFired = true
    }
    rotationAmount = totalRotation
}

window.addEventListener('keydown', function(e) {
    keysPressed[e.keyCode] = true
})

window.addEventListener('keyup', function(e) {
    delete keysPressed[e.keyCode]
})

// =============================================

var canvas=document.getElementById("canvas");
var context = canvas.getContext('2d'); // this is the context object
var rotationAmount = 0
var gunAimDirection = 0

var imagedata = context.createImageData(1, 1)
imagedata.data[0] = 255;     // Red
imagedata.data[1] = 255; // Green
imagedata.data[2] = 255;  // Blue
imagedata.data[3] = 255;   // Alpha

function rotateGun(){
    if ( bulletFired == true ) {
        calcBulletPosition()
        showBullet() }
    context.save()
    context.translate(320,320)    //(x + width / 2, y + height / 2);
    context.rotate(rotationAmount*Math.PI/180);
    context.translate(-320,-320)    //(x + width / 2, y + height / 2);
    context.beginPath(320,320);
    context.lineWidth="4";
    context.strokeStyle="white";
    context.moveTo(305,345);
    context.lineTo(320,295);
    context.lineTo(335,345);
    context.closePath();
    context.stroke();

    console.log(gunAimDirection, bulletFired, keysPressed)
}

function showBullet(){
    context.putImageData(imagedata, bulletPosition[0], bulletPosition[1]);
    context.putImageData(imagedata, bulletPosition[0]+1, bulletPosition[1]);
    context.putImageData(imagedata, bulletPosition[0]-1, bulletPosition[1]+1);
    context.putImageData(imagedata, bulletPosition[0], bulletPosition[1]+1);
    context.putImageData(imagedata, bulletPosition[0]+1, bulletPosition[1]+1);
    context.putImageData(imagedata, bulletPosition[0]+2, bulletPosition[1]+1);
    context.putImageData(imagedata, bulletPosition[0], bulletPosition[1]+2);
    context.putImageData(imagedata, bulletPosition[0]+1, bulletPosition[1]+2);
}

function clear(){
    context.clearRect(0,0,canvas.width, canvas.height)
    showAsteroids()
}

function checkIfAsteroidIsOffScreen(i){
    if ( asteroidPosition[i][0] > 670 || asteroidPosition[i][0] < -30 ) { isAsteroidOnScreen[i] = false }
    if ( asteroidPosition[i][1] > 670 || asteroidPosition[i][1] < -30 ) { isAsteroidOnScreen[i] = false }
}

function getNewAsteroid(whichAstr) {
    var asteroid = new Asteroid()
    isAsteroidOnScreen[whichAstr] = true
    asteroidPosition[whichAstr][0] = asteroid.startingPosition.stPosX
    asteroidPosition[whichAstr][1] = asteroid.startingPosition.stPosY

    return asteroid
}

function updateAsteroidPosition() {
    for ( var i=0; i<3; i++){
        asteroidPosition[i][0] += asteroids[i].trajectory.trajX
        asteroidPosition[i][1] += asteroids[i].trajectory.trajY
        checkIfAsteroidIsOffScreen(i)
        }
}

function showAsteroids(){
    for ( var i=0; i<3; i++){
    context.lineWidth="1";
    context.strokeStyle="white";
    context.beginPath();
    context.arc(asteroidPosition[i][0],asteroidPosition[i][1],asteroids[i].size,0,360);
    context.stroke();
    console.log("I printed an asteroid",asteroidPosition, asteroids)
    }
}

function tick(){
    determineRotationDirection()
    clear()
    rotateGun()
    for ( var i=0; i<3; i++){
        if ( isAsteroidOnScreen[i] == false ) { getNewAsteroid(i) }
    }
    updateAsteroidPosition()
    requestAnimationFrame(tick)
}

tick()
