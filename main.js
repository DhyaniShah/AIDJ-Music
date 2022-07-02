song1 = "";
song2 = "";
LeftWristX = 0;
LeftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1Status = "";
song2Status = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
        
        console.log(results);
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY"+ rightWristY);
    } 
}

function modelLoaded() {
    console.log('PoseNet Is Intialized');
}


function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Hunter X Hunter Theme Song"

        }
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(LeftWristX, LeftWristY, 20);
        song1.stop();
        
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Your Lie In April Theme Song"
            
        }
    }
}

