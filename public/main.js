//image
const video = document.getElementById('video');
const photo = document.getElementById('photo');

let width = 400;
let height = 0;

getMedia()

async function getMedia() {
    if (navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            video.srcObject = mediaStream;
    }
    streaming = true;
    video.addEventListener('canplay', function(ev){
        if (streaming) {
          height = video.videoHeight / (video.videoWidth/width);
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          photo.setAttribute('width', width);
          photo.setAttribute('height', height);
          streaming = false;
        }
    }, false)
}

//submit data
document.getElementById('submit').addEventListener('click', async () => {
    const moodData = document.getElementById('mood');
    const mood = moodData.value;
    let image = null;
    takePicture()
    function takePicture() {
        photo.getContext('2d').drawImage(video, 0, 0, width, height);
        image = photo.toDataURL('image/png')
            photo.setAttribute('src', image)
    }
    const data = {mood, image }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch('/api', options);
    const json = await response.json();

    console.log(json);
})