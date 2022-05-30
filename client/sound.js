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
let noteScale = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];
let currentNote = "";
var colors = [];

/* const model_url =
    "https://cdn.jsdelivr.net/gh/ml15js/ml5-data-and-models/models/pitch-detection/crepe/";
 */
function setup() {
    canvas = createCanvas(1200, 600);
    canvas.parent("canvas");
    console.log("colors", colors);

    //play mp3 file

    /*  playButton = createButton("play");
    playButton.parent("audio");
    playButton.class("play");
    song = loadSound("./public/pianoprova.mp3");
    playButton.mousePressed(playAudio); */
    /* amplitude = new p5.Amplitude(); */
    /* fft = new p5.FFT(0, 256); */

    //register Audio

    recButton = createButton("micro");
    recButton.parent("microphone");
    recButton.class("microphone");
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

    //colors x note logic

    //Change the colorMode to HSB

    //Define the color palette
    for (let i = 0; i < noteScale.length; i++) {
        let newColor = color(random(255), random(255), random(255), 150);
        colors.push(newColor);
    }
    console.log(colors);

    const a = createDiv();
    a.parent("notes");
    a.style("background-color", colors[9]);
    a.class("a");
    a.html("A");

    const b = createDiv();
    b.parent("notes");
    b.style("background-color", colors[11]);
    b.class("b");
    b.html("B");

    const c = createDiv();
    c.parent("notes");
    c.style("background-color", colors[0]);
    c.class("c");
    c.html("C");

    const d = createDiv();
    d.parent("notes");
    d.style("background-color", colors[2]);
    d.class("d");
    d.html("D");

    const e = createDiv();
    e.parent("notes");
    e.style("background-color", colors[4]);
    e.class("e");
    e.html("E");

    const f = createDiv();
    f.parent("notes");
    f.style("background-color", colors[5]);
    f.class("f");
    f.html("F");

    const g = createDiv();
    g.parent("notes");
    g.style("background-color", colors[7]);
    g.class("g");
    g.html("G");

    const aSharp = createDiv();
    aSharp.parent("notes");
    aSharp.style("background-color", colors[10]);
    aSharp.class("aSharp");
    aSharp.html("a#");

    const cSharp = createDiv();
    cSharp.parent("notes");
    cSharp.style("background-color", colors[1]);
    cSharp.class("cSharp");
    cSharp.html("c#");

    const dSharp = createDiv();
    dSharp.parent("notes");
    dSharp.style("background-color", colors[3]);
    dSharp.class("dSharp");
    dSharp.html("d#");

    const fSharp = createDiv();
    fSharp.parent("notes");
    fSharp.style("background-color", colors[6]);
    fSharp.class("fSharp");
    fSharp.html("f#");

    const gSharp = createDiv();
    gSharp.parent("notes");
    gSharp.style("background-color", colors[8]);
    gSharp.class("gSharp");
    gSharp.html("g#");
}

function startPitch() {
    console.log("loading model");
    pitch = ml5.pitchDetection(
        "./crepe",
        audioContext,
        mic.stream,
        modelLoaded
    );
}

function getPitch() {
    pitch
        .getPitch()
        .then((frequency) => {
            console.log("getting pitch!", frequency);
            if (frequency) {
                let midiNum = freqToMidi(frequency);
                currentNote = noteScale[midiNum % 12];
                fill(colors[midiNum % 12]);
                vol = mic.getLevel();
                console.log(vol);
                console.log("note", currentNote, "volume", nf(vol, 1, 2));
            }
            getPitch();
        })

        .catch((err) => {
            console.log(err);
        });
}

function modelLoaded() {
    console.log("getting pitch");
    /* select("#initial-display").html("Model Loaded"); */
    getPitch();
}

/* function touchStarted() {
    getAudioContext().resume();
} */

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
    if (listening) {
        mic.stop();
    }

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
        userStartAudio();
        audioContext = getAudioContext();
        mic = new p5.AudioIn();
        mic.start(startPitch);

        listening = true;
        console.log(listening);
    }
}

function draw() {
    /*  if (song.isPlaying()) {
        clear();
        background(0);
        var spectrum = fft.analyze();
        console.log(spectrum);
        stroke(255);
        noFill();
        
        let level = amplitude.getLevel();
        console.log(level);
        background(200);
        textAlign(CENTER);
        let size = map(level, 0, 1, 0, 200);
        ellipse(width / 2, height / 2, size, size);
    } */
    if (listening) {
        console.log("I am listening!");
        /*  vol = mic.getLevel();
        console.log(vol); */
    }

    if (vol > 0.03) {
        noStroke();
        ellipse(
            /* random(1200) */ mouseX,
            /* random(600) */ mouseY,
            vol * 1000
        );
        translate(width / 2, height / 2);
    }
}
