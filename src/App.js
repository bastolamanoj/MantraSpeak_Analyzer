
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useRef } from "react";
import { BiSolidMicrophone, BiCopy, BiPauseCircle } from 'react-icons/bi'
import { GrPowerReset } from 'react-icons/gr'

const SuccessAnimation = (props) => {
    // Add your success animation JSX here
    return (
        <div className="success-animation">
          {
            props.status ? (
                <span className="success-span">Success! Mantra matched!</span>
            ) : (
                <span className="error-span">Alert! Mantra not matched, Try again !!!! </span>
            )
            }
            <video src="/assets/animation/success.mp4"></video>
        </div>
    );


};


const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });
    const [successStaus, setSuccessStatus]= useState(false);

    const [selectedMantra, setSelectedMantra] = useState('Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Ram Hare Ram Ram Ram Hare Hare');

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isUnsuccessVisible, setIsUnsuccessVisible] = useState(false);

    const handleResetTranscript = () => {
        resetTranscript(); // This will reset the transcript value to an empty string
    };

    if (!browserSupportsSpeechRecognition) {
        return null
    }
  
    function preprocessInput(input) {
        // Remove punctuation and convert to lowercase
        return input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
      }
      
      const checkMatchingMantra = (spokenText) => {
        // return selectedMantra.includes(spokenText);
        console.log(spokenText);
        console.log(selectedMantra);
        if (preprocessInput(spokenText) === preprocessInput(selectedMantra)) {
            console.log("success");
            return true;
        } else {
            console.log("error");
            return false;
        }
    };


    const handleMatch = (spokenText) => {
        if (checkMatchingMantra(spokenText)) {
            setSuccessStatus(true);
            setIsSuccessVisible(true);
            //   playSound();
            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 3000);
        } else {
            setSuccessStatus(false);
            setIsSuccessVisible(true);
            setTimeout(() => {
                setIsSuccessVisible(false);
            }, 3000);
        }
    };



    return (
        <>
            <div className="container">
                <h2>Test Your Chanting </h2>
                <br />
                <select className="select" onChange={(e) => setSelectedMantra(e.target.value)}>
                    <option>Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Ram Hare Ram Ram Ram Hare Hare </option>
                    <option>Om Krishnaya Namaha</option>
                    <option>Aum Devkinandanaye Vidmahe Vasudevaye Dhi-Mahi Tanno Krishna Prachodayat</option>
                    <option> Om Sri Krishnah sharanam mamah </option>
                </select>

                <div className="main-content" onClick={() => setTextToCopy(transcript)}>
                    {transcript}
                </div>

                {isSuccessVisible && <SuccessAnimation status={successStaus} />}
                

                <div className="btn-style">

                    <button onClick={handleResetTranscript}> <GrPowerReset /> </button>
                    <button onClick={setCopied}>
                        <BiCopy />
                        {isCopied ? 'Copied!' : ''}
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