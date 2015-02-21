var Constants = {
    STAR_COLOR       : 'random',
    BACKGROUND_COLOR : '#000',
    MAX_ACCELERATION : 800,
    MIN_ACCELERATION : 600,
    MAX_VELOCITY     : 1000,
    SPAWN_INTERVAL   : 5,
    STAR_LIFESPAN    : 5000,
    STAR_SIZE        : 1,
    EXPANSION_RATE   : 10
};

var $gameCanvas = document.getElementById('gameCanvas');
var $width = window.innerWidth;
var $height = window.innerHeight;
var $ctx = $gameCanvas.getContext('2d');
var $parameters = document.getElementById('parameters');
var $parametersTable = $parameters.getElementsByTagName('table')[0];

for (var key in Constants) {
    var row = document.createElement('tr');
    var labelCol = document.createElement('td');
    var inputCol = document.createElement('td');
    var label = document.createElement('label');
    label.innerHTML = key;
    labelCol.appendChild(label);
    var input = document.createElement('input');
    input.onchange = (function(key) {
        return function(e) {
            Constants[key] = e.currentTarget.value;
        };
    })(key);
    input.setAttribute('type', 'text');
    input.value = Constants[key];
    inputCol.appendChild(input);
    row.appendChild(labelCol);
    row.appendChild(inputCol);
    $parametersTable.appendChild(row);
}


function resizeGame() {
    $width = window.innerWidth;
    $height = window.innerHeight;

    $gameCanvas.width = $width;
    $gameCanvas.height = $height;
}

window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);

resizeGame();

// initialize the mouse to the center of the screen
var $mouse = {x: $width/2, y: $height/2};

document.addEventListener('mousemove', function(e) {
    $mouse.x = e.clientX || e.pageX;
    $mouse.y = e.clientY || e.pageY;
});

document.addEventListener("touchstart", function(e) {
    var touches = e.changedTouches;
    for (var i = 0; i < touches.length; ++i) {
        $mouse = {id: touches[i].identifier, x: touches[i].pageX, y: touches[i].pageY};
    }
}, false);

function Star(pos, acc, color) {
    this.color = color;
    this.pos = pos
    this.acc = acc;
    this.vel = {x: 0, y: 0};
    this.size = Constants.STAR_SIZE;
    this.id = Math.random();
}

Star.prototype.tick = function(elapsed) {
    this.vel.x = this.vel.x + (this.acc.x * elapsed);
    this.vel.y = this.vel.y + (this.acc.y * elapsed);
    this.vel = constrainVector(this.vel, Constants.MAX_VELOCITY);
    this.pos.x += this.vel.x * elapsed;
    this.pos.y += this.vel.y * elapsed;
    this.size += elapsed * Constants.EXPANSION_RATE;
};

Star.prototype.draw = function(context) {
    context.fillStyle = this.color;
    context.fillRect(this.pos.x, this.pos.y, Math.floor(this.size), Math.floor(this.size));
};

function createStar() {
    var position = {x: $mouse.x, y: $mouse.y};
    var acceleration = getRandomVector();
    var color = (Constants.STAR_COLOR === 'random') ? getRandomColor() : Constants.STAR_COLOR;
    return new Star(position, acceleration, color);
}

(function main() {
    var startTime = getTime();
    var prevTime = startTime;
    var stars = {};

    setInterval(function() {
        star = createStar();
        stars[star.id] = star;
        setTimeout((function(star) {
            return function() {
                delete stars[star.id];
            };
        })(star), Constants.STAR_LIFESPAN);
    }, Constants.SPAWN_INTERVAL);

    function mainLoop() {
        var time = getTime();
        var elapsedTime = (time - prevTime) / 1000;
        prevTime = time;
        clearCanvas($gameCanvas);
        for (var id in stars) {
            var star = stars[id];
            star.tick(elapsedTime);
            star.draw($ctx);
        }
        window.requestAnimationFrame(mainLoop);
    }

    window.requestAnimationFrame(mainLoop);
})();



// Utility Functions

function clearCanvas(canvas) {
    context = canvas.getContext('2d');
    context.fillStyle = Constants.BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function calculateDistance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

function constrainVector(vector, max, min) {
    var magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    var amplifier = magnitude > max ? max : min && magnitue < min ? min : magnitude;
    return {
        x: (vector.x / magnitude) * amplifier,
        y: (vector.y / magnitude) * amplifier
    }
}

function getTime() {
    return new Date().getTime();
}

function drawLine(context, startX, startY, endX, endY) {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}

function getRandomScreenPosition() {
    return {x: Math.floor(Math.random() * $width), y: Math.floor(Math.random() * $height)};
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomVector() {
    var vector = constrainVector({
        x: (Math.random() * Constants.MAX_ACCELERATION * 2) - Constants.MAX_ACCELERATION, 
        y: (Math.random() * Constants.MAX_ACCELERATION * 2) - Constants.MAX_ACCELERATION
    }, Constants.MAX_ACCELERATION);
    vector.x = Math.floor(vector.x);
    vector.y = Math.floor(vector.y);
    return vector;
}

