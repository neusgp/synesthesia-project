var playButton;
var song;
var mic;
var regButton;
var listening = false;

function setup() {
    //play mp3 file
    console.log("icreatedabutton");
    playButton = createButton("play");
    playButton.class("play");
    song = loadSound("./public/pianoprova.mp3");
    playButton.mousePressed(playAudio);
    amplitude = new p5.Amplitude();

    //register Audio
    console.log("I'm getting ready for registering your voice...");
    regButton = createButton("micro");
    regButton.class("microphone");
    mic = new p5.AudioIn();
    regButton.mousePressed(register);
}

function playAudio() {
    console.log("pressed play button!");
    if (song.isPlaying()) {
        console.log("stop playing");
        song.stop();
    } else {
        song.play();

        /* regButton.class("hide");
        playButton.class("hide"); */
    }
}

function register() {
    console.log("pressed microphone!");
    if (listening) {
        mic.stop();
        listening = false;
        console.log("microphone closed");
    } else {
        mic.start();
        listening = true;

        /* regButton.class("hide");
        playButton.class("hide"); */
    }

    /*  regButton.class("hide");
    playButton.class("hide"); */
}

function draw() {
    background(200);
    if (listening) {
        let vol = mic.getLevel();
        textAlign(CENTER);
        fill(127);
        stroke(0);
        let size = map(vol, 0, 1, 0, 200);
        ellipse(width / 2, height / 2, size, size);
        return;
    }
    let level = amplitude.getLevel();
    textAlign(CENTER);
    let size = map(level, 0, 1, 0, 200);
    ellipse(width / 2, height / 2, size, size);
}

function touchStarted() {
    getAudioContext().resume();
}

// Draw an ellipse with height based on volume
/*  let h = map(vol, 0, 1, height, 0);
    ellipse(width / 2, h - 25, 50, 50);
    let vol = mic.getLevel(); */
/* console.log(vol); */
