song_1 = "";
song_2 = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
song1_status = "";
song2_status = "";

function preload(){
    song_1 = loadSound('music.mp3');
    song_2 = loadSound('spectre.mp3');
}
function setup(){
    canvas = createCanvas(750, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 750, 500);
    song1_status = song_1.isPlaying();
    song2_status = song_2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if (score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song_2.stop();
        if (song1_status == false){
            song_1.play();
            document.getElementById('song').innerHTML = "Playing song 1";
        }
    }
    if (score_rightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song_1.stop();
        if (song2_status == false){
            song_2.play();
            document.getElementById('song').innerHTML = "Playing song 2";
        }
    }
}
function modelLoaded(){
    console.log("Model loaded!");
}
function gotPoses(results){
    if (results.length > 0)
{
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Left wrist X and Y coordinates are = " + leftWristX + " " + leftWristY);
    console.log("Right wrist X and Y coordinates are = " + rightWristX + " " + rightWristY);
    score_leftWrist = results[0].pose.keypoints[9].score;
    score_rightWrist = results[0].pose.keypoints[10].score;
    console.log("Score of left wrist = " + score_leftWrist);
    console.log("Score of right wrist = " + score_rightWrist);
}}