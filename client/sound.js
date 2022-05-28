var playButton;
var pauseButton;
var stopButton;
var song;
var mic;
var recButton;
var listening = false;
var canvas;

//getting notes out of frequency
let vol = 0.0;
let pitch;

let keyRatio = 0.58;

let noteScale = ["C", "D", "E", "F", "G", "A", "B"];
let currentNote = "";
var colors = [];

const model_url =
    "https://cdn.jsdelivr.net/gh/ml15js/ml5-data-and-models/models/pitch-detection/crepe/";

function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent("canvas");
    //play mp3 file
    console.log("colors", colors);

    playButton = createButton("play");
    playButton.parent("audio");
    playButton.class("play");
    song = loadSound("./public/pianoprova.mp3");
    playButton.mousePressed(playAudio);
    /* amplitude = new p5.Amplitude(); */
    /* fft = new p5.FFT(0, 256); */

    //register Audio

    recButton = createButton("micro");
    recButton.parent("microphone");
    recButton.class("microphone");
    recButton.mousePressed(record);

    mic = new p5.AudioIn();

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

    //colors x note logic

    //Change the colorMode to HSB
    colorMode(HSB);

    //Define the color pallet
    for (let i = 0; i < noteScale.length; i++) {
        let newColor = color((i * 360) / noteScale.length, 60, 100, 1);
        colors.push(newColor);
    }
    console.log(colors);

    const a = createDiv();
    a.parent("notes");
    a.style("background-color", colors[5]);
    a.class("a");

    const b = createDiv();
    b.parent("notes");
    b.style("background-color", colors[6]);
    b.class("b");

    const c = createDiv();
    c.parent("notes");
    c.style("background-color", colors[0]);
    c.class("c");

    const d = createDiv();
    d.parent("notes");
    d.style("background-color", colors[1]);
    d.class("d");

    const e = createDiv();
    e.parent("notes");
    e.style("background-color", colors[2]);
    e.class("e");

    const f = createDiv();
    f.parent("notes");
    f.style("background-color", colors[3]);
    f.class("f");

    const g = createDiv();
    g.parent("notes");
    g.style("background-color", colors[4]);
    g.class("g");
}

function touchStarted() {
    getAudioContext().resume();
}

function startPitch() {
    console.log("loading model");
    pitch = ml5.pitchDetection(
        model_url,
        audioContext,
        mic.stream,
        modelLoaded
    );
}

function modelLoaded() {
    select("#status").html("Model Loaded");
    getPitch();
    console.log("getting pitch");
}

function getPitch() {
    pitch.getPitch(function (err, frequency) {
        console.log("getting pitch!");
        if (frequency) {
            let midiNum = freqToMidi(frequency);
            currentNote = noteScale[midiNum % 7];
            stroke(color([midiNum % 7]));
            console.log("note", currentNote, "volume", nf(vol, 1, 2));
        }
        getPitch();
    });
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
    /* if (song.isPlaying()) {
        clear();
        background(0);
        var spectrum = fft.analyze();
        console.log(spectrum);
        stroke(255);
        noFill();
        //
        let level = amplitude.getLevel();
        console.log(level);
        background(200);
        textAlign(CENTER);
        let size = map(level, 0, 1, 0, 200);
        ellipse(width / 2, height / 2, size, size);
    } */
    if (listening) {
        console.log("I am listening!");
        clear();
        vol = mic.getLevel();
        console.log(vol);

        if (vol > 0.01) {
            ellipse(mouseX, mouseY, vol * 500);
            translate(width / 2, height / 2);
        }
    }
}

// Draw an ellipse with height based on volume
/*  let h = map(vol, 0, 1, height, 0);
    ellipse(width / 2, h - 25, 50, 50);
    let vol = mic.getLevel(); */
/* console.log(vol); */
