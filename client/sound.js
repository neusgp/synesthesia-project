var playButton;
var pauseButton;
var stopButton;
var song;
var mic;
var recButton;
var listening = false;
var canvas;

function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent("canvas");
    //play mp3 file

    playButton = createButton("play");
    playButton.parent("audio");
    playButton.class("play");
    song = loadSound("./public/pianoprova.mp3");
    playButton.mousePressed(playAudio);
    amplitude = new p5.Amplitude();

    //register Audio

    recButton = createButton("micro");
    recButton.parent("microphone");
    recButton.class("microphone");
    mic = new p5.AudioIn();
    recButton.mousePressed(record);

    //Pause
    pauseButton = createButton("pause");
    pauseButton.parent("pause");
    pauseButton.class("pause");
    pauseButton.mousePressed(pauseAudio);

    //Stop
    stopButton = createButton("stop");
    stopButton.parent("stop");
    stopButton.class("stop");
    stopButton.mousePressed(stopAudio);
}

function playAudio() {
    console.log("pressed play button!");
    if (!song.isPlaying()) {
        song.play();
    }
}

function pauseAudio() {
    if (song.isPlaying()) {
        song.pause();
    }
}

function stopAudio() {
    if (song.isPlaying()) {
        console.log("stop playing");
        song.stop();
        canvas.clear();
    }
}

function record() {
    console.log("pressed microphone!");
    if (listening) {
        mic.stop();
        canvas.clear();
        listening = false;
        console.log(listening);
        console.log("microphone closed");
    } else {
        mic.start();
        listening = true;
        console.log(listening);
    }
}

function draw() {
    if (song.isPlaying()) {
        clear();
        let level = amplitude.getLevel();
        console.log(level);
        background(200);
        textAlign(CENTER);
        let size = map(level, 0, 1, 0, 200);
        ellipse(width / 2, height / 2, size, size);
    }

    if (listening) {
        clear();
        let vol = mic.getLevel();
        console.log(vol);
        background(200);
        textAlign(CENTER);
        fill(127);
        stroke(0);
        let size = map(vol, 0, 1, 0, 200);
        ellipse(width / 2, height / 2, size, size);
    }
}

function touchStarted() {
    getAudioContext().resume();
}

// Draw an ellipse with height based on volume
/*  let h = map(vol, 0, 1, height, 0);
    ellipse(width / 2, h - 25, 50, 50);
    let vol = mic.getLevel(); */
/* console.log(vol); */
