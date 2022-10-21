const video = document.getElementById('videoElm');

const loadFaceAPI = async() => {
   
    await faceapi.nets.faceRecognitionNet.loadFromUri('./model');
    await faceapi.nets.tinyFaceDetector.loadFromUri('./model');
    

}
function getCameraStream(){
    if (navigator.mediaDevices.getUserMedia)
    {
      navigator.mediaDevices.getUserMedia({video:{}})
     .then(stream=> {
        video.srcObject = stream;
         })
    }
}
video.addEventListener('playing',()=> {
    const canvas= faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize ={
        width: video.VideoWidth,
        height: video.VideoHeight
    }

    setInterval(async()=> {
        const detects= await faceapi.detectAllFaces(video, new faceapi.tinyFaceDetectorOptions());
        const resizedDetects = faceapi.resizeResults(detects,displaySize);
       canvas.getContext('2d').clearRect(0,0,displaySize.width, displaySize.height );
       faceapi.draw.drawDetections(canvas, resizedDetects);
    }, 300);
});
loadFaceAPI().then(getCameraStream)
getCameraStream();