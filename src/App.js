
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState, useRef } from "react";
import {BiSolidMicrophone, BiCopy, BiPauseCircle} from 'react-icons/bi'
import {GrPowerReset } from 'react-icons/gr'
// import Audio from "./Audio";

const Audio = ({ src }) => {
    const audioRef = useRef(null);
  
    const playSound = () => {
      audioRef.current.play();
    };
  
    return (
      <audio ref={audioRef}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  };
  
  const SuccessAnimation = () => {
    // Add your success animation JSX here
    return (
      <div className="success-animation">
        Success! Mantra matched!
      </div>
    );
  };
  

const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    const [selectedMantra, setSelectedMantra] = useState('Hare Krishna Hare Krishna Krishna Krishna Hare Hare');

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition, resetTranscript  } = useSpeechRecognition();
    const [isSuccessVisible, setIsSuccessVisible] = useState(false)

    const handleResetTranscript = () => {
        resetTranscript(); // This will reset the transcript value to an empty string
      };

    if (!browserSupportsSpeechRecognition) {
        return null
    }
    const checkMatchingMantra = (spokenText) => {
        return selectedMantra.includes(spokenText);
      };


     const handleMatch = (spokenText) => {
         if (checkMatchingMantra(spokenText)) {
            alert(spokenText);
          setIsSuccessVisible(true);
        //   playSound();
          setTimeout(() => {
            setIsSuccessVisible(false);
          }, 3000); // 3 seconds
        }
      };
    


    return (
        <>
            <div className="container">
                <h2>Test Your Chanting </h2> 
                <br/>
                <select className="select" onChange={(e)=> setSelectedMantra(e.target.value)}>
                    <option>Hare Krishna Hare Krishna Krishna Krishna Hare Hare </option>
                    <option>Om Krishnaya Namah</option>
                    <option>Aum Devkinandanaye Vidmahe Vasudevaye Dhi-Mahi Tanno Krishna Prachodayat</option>
                    <option> Om Sri Krishnah sharanam mamah </option>
                </select>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                {isSuccessVisible && <SuccessAnimation />}
               <Audio src="/path-to-success-sound.mp3" />

                <div className="btn-style">

                    <button onClick={handleResetTranscript}> <GrPowerReset/> </button>
                    <button onClick={setCopied}>
                        <BiCopy />
                        {isCopied ? 'Copied!' :'' }
                    </button>
                    <button onClick={startListening}> <BiSolidMicrophone /> </button>
                    <button onClick={SpeechRecognition.stopListening}> <BiPauseCircle /></button>
                    <button onClick={() => handleMatch(transcript)}> check </button>
                    
                </div>

            </div>

        </>
    );
};

export default App;