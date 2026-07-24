import { useRef } from 'react';
import { useState } from 'react';


function MainContent({selected}){


const recorderRef = useRef(null);
const streamRef = useRef(null);
const audioChunksRef = useRef([]);
const [isRecording, setIsRecording] = useState(false);

async function startRecording() {
        audioChunksRef.current = [];

        const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
        streamRef.current=stream;

        const recorder = new MediaRecorder(stream, 
                    {
                mimeType: "audio/webm;codecs=opus",
                audioBitsPerSecond: 64000
                });
        recorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        recorder.onstop = async () => {
           const audioBlob = new Blob(audioChunksRef.current,{
                type:"audio/webm"
            });

            const formData = new FormData();
            formData.append("audio", audioBlob, "recording.webm");

            const token = localStorage.getItem("token");

            const response = await fetch("http://127.0.0.1:8000/recordings/upload", {
                method:"POST",
                headers:{
                    Authorization:`Bearer ${token}`
                },
                body: formData
            })

            const data= await response.json()
            console.log(data)

            
        };



        recorder.start();
        setIsRecording(true);

}

function stopRecording(){
    recorderRef.current.stop();
    setIsRecording(false);

    }


    if (!selected){
        return(
        <main className="flex-1 flex items-center justify-center  ">
         <h2 >No recording selected</h2>
        </main>
        )
    }

    if (selected?.isNew){
        return(
            <main className="flex flex-1 flex-col items-center justify-center">
                <div>
                    <h2>New Recording</h2>
                </div>

                <div>
                    <p>00:00</p>
                </div>
                
                <div>
                <button className='border cursor-pointer '
                onClick={()=> {
                    if(isRecording){
                        stopRecording();
                    }else{
                        startRecording();
                    }
                }}>
                    {isRecording? "Stop Recording": "Start Recording" }
                </button>
                </div>

            </main>
        )
    }

    //     if (!selected){
    //     return(
    //     <main className="flex-1 flex items-center justify-center">
    //      <h2 >No recording selected</h2>
    //     </main>
    //     )
    // }


    // return (
    //     <main className="flex-1 flex items-center justify-center">
    //         <h2>{selected.title}</h2>
    //     </main>
    // )
};

export default MainContent

