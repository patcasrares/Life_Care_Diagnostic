import React from 'react';
import axios from 'axios'

import { useEffect, useState } from 'react';
import SidebarCategory from '../components/sidebarCategory';

const faceapi = require('../utils/face-api.min.js')

const BASE_URL = "http://localhost:5000/face"

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1224;
  canvas.height = 768;
  canvas.style.zIndex = 8;
  canvas.style.position = "absolute";
  canvas.style.border = "1px solid";
  return canvas;
};

const drawImageToCanvas = (canvas, image) => {
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
};

const getImageBase64 = (canvas) => {
  return canvas.toDataURL().replace(/^data:image\/png;base64,/, "");
};

const createBlob = (base64String) => {
  const blobBin = atob(base64String);
  const array = new Uint8Array(blobBin.length);
  for (let i = 0; i < blobBin.length; i++) {
    array[i] = blobBin.charCodeAt(i);
  }
  return new Blob([array], { type: 'image/png' });
};

const createFormData = (file) => {
  const formData = new FormData();
  formData.append('face', file);
  formData.append('from', 'frontend');
  return formData;
};


function App() {
 
  const [verdict, setVerdict] = useState('')

  var vd=null;
  const [play, setPlay] = useState(false)


  var drawnFace = null;

  const takePhoto = () => {
    const video = document.getElementById('video');
    if (!video) return;
  
    const canvas = createCanvas();
    drawImageToCanvas(canvas, video);
    const image_base64 = getImageBase64(canvas);
    const file = createBlob(image_base64);
    const formData = createFormData(file);
  
    axios.post(BASE_URL, formData).then(response => {
      setVerdict(response.data)
    }).catch(error => {
      console.log(error)
    });
  };

  useEffect(()=>{
    if (play == false)
      return;
    const video = document.getElementById('video')

    function startVideo() {
      navigator.getUserMedia(
        { video: {} },
        stream => {video.srcObject = stream;vd=stream; },
        err => console.error(err)
      )

      setInterval(() => {
        takePhoto();
      }, 1400);
      //video.play();
    }

    video.addEventListener('play', () => {
      if (!document.getElementById('video')      )
        return;
      try {
        const canvas = faceapi.createCanvasFromMedia(video)
        canvas.style.position = 'absolute !important'
        canvas.style.left = '430px'
        canvas.style.top = '100px'
        document.body.append(canvas)
        drawnFace = canvas;
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
          if (document.getElementById('video') == undefined)
            return;
          try{
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
          }
          catch(error){}
          
        }, 1000)
      }
      catch(error) {}
    })
    Promise.all([
      faceapi.nets.tinyFaceDetector.load('/models'),
      faceapi.nets.faceLandmark68Net.load('/models'),
      faceapi.nets.faceRecognitionNet.load('/models'),
      faceapi.nets.faceExpressionNet.load('/models')
    ]).then(startVideo)

    setInterval(() => {
      //startVideo();
      takePhoto();
    }, 100);
    
    return ()=>{
      try {
        //video.stop()
        
        vd.getTracks().forEach(function(track) {
          track.stop();
        });
        document.body.remove(drawnFace)
      }
      catch(error){

      }
    }
  },[play])

  const makePlay = () => {
    if (play == false) {
      setPlay(true);
      return;
    }
    window.location.reload();
  }

  return (
    
    <div class="bg-blue-300 overflow-hidden flex flex-row min-h-screen bg-gray-100 text-gray-800">
      {!play &&
        <aside
          class="sidebar w-80 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-800"
        >
          <div class="sidebar-header flex items-center justify-center py-4">
            <div class="inline-flex">
              <a href="#" class="text-green-500 inline-flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
              </svg>
                <span class="leading-10 text-green-500 text-2xl font-bold ml-1 uppercase">Life Care Diagnostic</span>
              </a>
            </div>
          </div>
          <div class="sidebar-content px-3 py-6">
            <ul class="flex flex-col w-full">
              <li class="my-px">
                <span class="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Medical Diagnostics</span>
              </li>
              <SidebarCategory title="Breast Cancer Diagnostic" page="/"/>
              <SidebarCategory title="Skin Cancer Diagnostic" page="/skin"/>
              <SidebarCategory title="Survival Chances" page="/survival"/>
              <SidebarCategory title="Covid" page="/covid"/>
              <SidebarCategory title="Face Diagnostic" page="/video"/>
              <SidebarCategory title="Model Statistics" page="/statistics"/>
            </ul>
          </div>
        </aside>
      }
      <main class="bg-blue-300 text-center items-center justify-center main h-screen overflow-hidden flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <button className="bg-purple-500 mb-2 h-10 w-40 text-white border-30 border-solid border-2 border-indigo-600 rounded-md" onClick={()=>{makePlay()}}>{!play? "Play" : "Stop Playing"}</button>
      {verdict == '1' && 
        <div className="text-red-500 text-lg">Signs of Disease</div>
      }
      {verdict == '0' && 
        <div className="text-green-500 text-lg">No Signs of Disease</div>
      }
      <video id="video" width="750" height="500" controls autoPlay muted>
        <source id="vd" autoplay />
     </video>
      </main>
    </div>
  );
}

export default App;
