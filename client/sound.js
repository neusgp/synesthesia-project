/* import { setKandinsky, setEllington } from "./palettes.js"; */

var playButton;
var pauseButton;
var stopButton;
var song;
var mic;
var recButton;
var listening = false;
var canvas;
let kandinsky = false;
let ellington = true;

//colorpickers
let a;
let b;
let c;
let d;
let e;
let f;
let g;
let aSharp;
let cSharp;
let dSharp;
let fSharp;
let gSharp;

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
    pauseButton.mousePressed(/* pauseAudio */);
    //Stop
    stopButton = createButton("stop");
    stopButton.parent("stop");
    stopButton.class("stop");
    stopButton.mousePressed(stopAudio);

    //colors x note logic

    //Change the colorMode to HSB

    //Define the color palette
    setPalette();

    console.log(colors);

    a = createColorPicker(colors[9]);
    a.parent("notes");
    a.style("background-color", "white");
    a.style("border", "0");
    a.class("a");
    a.html("A");

    b = createColorPicker(colors[11]);
    b.parent("notes");
    b.style("background-color", "white");
    b.style("border", "0");
    b.class("b");
    b.html("B");

    c = createColorPicker(colors[0]);
    c.parent("notes");
    c.style("background-color", "white");
    c.style("border", "0");
    c.class("c");
    c.html("C");

    d = createColorPicker(colors[2]);
    d.parent("notes");
    d.style("background-color", "white");
    d.style("border", "0");
    d.class("d");
    d.html("D");

    e = createColorPicker(colors[4]);
    e.parent("notes");
    e.style("background-color", "white");
    e.style("border", "0");
    e.class("e");
    e.html("E");

    f = createColorPicker(colors[5]);
    f.parent("notes");
    f.style("background-color", "white");
    f.style("border", "0");
    f.class("f");
    f.html("F");

    g = createColorPicker(colors[7]);
    g.parent("notes");
    g.style("background-color", "white");
    g.style("border", "0");
    g.class("g");
    g.html("G");

    aSharp = createColorPicker(colors[10]);
    aSharp.parent("notes");
    aSharp.style("background-color", "white");
    aSharp.style("border", "0");
    aSharp.class("aSharp");
    aSharp.html("a#");

    cSharp = createColorPicker(colors[1]);
    cSharp.parent("notes");
    cSharp.style("background-color", "white");
    cSharp.style("border", "0");
    cSharp.class("cSharp");
    cSharp.html("c#");

    dSharp = createColorPicker(colors[3]);
    dSharp.parent("notes");
    dSharp.style("background-color", "white");
    dSharp.style("border", "0");
    dSharp.class("dSharp");
    dSharp.html("d#");

    fSharp = createColorPicker(colors[6]);
    fSharp.parent("notes");
    fSharp.style("background-color", "white");
    fSharp.style("border", "0");
    fSharp.class("fSharp");
    fSharp.html("f#");

    gSharp = createColorPicker(colors[8]);
    gSharp.parent("notes");
    gSharp.style("background-color", "white");
    gSharp.style("border", "0");
    gSharp.class("gSharp");
    gSharp.html("g#");

    //buiding selection bar (palettes)
    palettes = createSelect();
    palettes.parent("palettes");
    palettes.option("Choose a palette...");
    palettes.option("Kandinsky");
    palettes.option("Ellington");
    palettes.disable("Choose a palette...");
    /* palettes.changed(changePalette); */
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
    colors = [
        c.color(),
        cSharp.color(),
        d.color(),
        dSharp.color(),
        e.color(),
        f.color(),
        fSharp.color(),
        g.color(),
        gSharp.color(),
        a.color(),
        aSharp.color(),
        b.color(),
    ];

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
                /* console.log("note", currentNote, "volume", nf(vol, 1, 2)); */
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
        canvas.clear();
        listening = false;
    }

    /* if (song.isPlaying()) {
        console.log("stop playing");
        song.stop();
        canvas.clear();
    } */
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

function setEllington() {
    return [
        color(27, 103, 254, 150),
        color(107, 157, 255, 150),
        color(213, 227, 252, 150),
        color(169, 121, 0, 150),
        color(255, 207, 168, 150),
        color(21, 18, 69, 150),
        color(109, 107, 152, 150),
        color(9, 0, 207, 150),
        color(87, 49, 20, 150),
        color(138, 109, 86, 150),
        color(230, 229, 254, 150),
        color(137, 137, 137, 150),
    ];
}

function setKandinsky() {
    return [
        color(167, 27, 19, 150),
        color(0, 0, 0, 150),
        color(252, 213, 17, 150),
        color(179, 104, 0, 150),
        color(207, 241, 255, 150),
        color(28, 39, 107, 150),
        color(91, 148, 102, 150),
        color(125, 72, 175, 150),
        color(150, 61, 98, 150),
        color(253, 169, 224, 150),
        color(182, 233, 192, 150),
        color(137, 137, 137, 150),
    ];
}

function setPalette() {
    if (kandinsky) {
        colors = setKandinsky();
    }

    if (ellington) {
        colors = setEllington();
    }

    for (let i = 0; i < noteScale.length; i++) {
        let newColor = color(random(255), random(255), random(255), 150);
        colors.push(newColor);
    }

    /* colors = [
        c.color(),
        cSharp.color(),
        d.color(),
        dSharp.color(),
        e.color(),
        f.color(),
        fSharp.color(),
        g.color(),
        gSharp.color(),
        a.color(),
        aSharp.color(),
        b.color(),
    ]; */
}
