var button;
var song;
function setup() {
    console.log("icreatedabutton");
    button = createButton("play");
    button.class("play");
    song = loadSound("./public/pianoprova.mp3");
    button.mousePressed(playAudio);
}

function playAudio() {
    if (song.isPlaying()) {
        // .isPlaying() returns a boolean
        song.stop();
    } else {
        song.play();
    }
}
