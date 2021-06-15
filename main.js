leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
song = "";


function preload(){
    harry_porter = loadSound("music.mp3");
    peter_pan = loadSound("music2.mp3");
}

function setup(){
    canvas= createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    song =  peter_pan.isPlaying();

     if(scoreleftwrist > 0.2)
     {
         circle(leftWristX, leftWristY, 20);
         
         harry_porter.stop();
         if(status == false)
            peter_pan.play();
            document.getElementById("song_name").innerHTML = "Peter Pan";
     }
     

     if(scorerightwrist > 0.2)
     {
         circle(rightWristX, rightWristY, 20);
       
         peter_pan.stop();
         if(status == false)
            harry_porter.play();
            document.getElementById("song_name").innerHTML = "Harry Porter";
     }
}

function modelLoaded(){
    console.log("Model Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
       
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
       
        console.log("scorelLeftWrist = " + scoreleftwrist );
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
      


        console.log("scoreRightWrist = " + scorerightwrist );
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}



