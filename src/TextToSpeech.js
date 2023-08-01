import React from "react";
import { useEffect, useState } from "react";

function TextToSpeech() {
  const textToBeRead = `In a world where vehicle pollutants pose significant threats to our environment and health, it’s crucial that we take immediate action. The detrimental effects of air pollution, climate change, and ecological disruption cannot be ignored. However, there is hope.

    
    Through the development of cleaner technologies, widespread adoption of electric vehicles, and implementation of stringent regulations, we can mitigate the impact of vehicle pollutants. By making conscious choices as individuals, supporting sustainable transportation alternatives, and demanding collective action, we can pave the way for a cleaner and more sustainable future. The time for change is now, and together, we can make a difference.`;
  const [startedReading, setStartedReading] = useState(false);

  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState();

  const synth = window.speechSynthesis;

  useEffect(() => {
    let _voices = synth.getVoices();
    setVoices(_voices);
    setSelectedVoice(_voices[0]);
  }, []);

  const handleStartReading = () => {
    const utterThis = new SpeechSynthesisUtterance(textToBeRead);

    let voiceObj = voices.find((i) => i.name === selectedVoice);
    utterThis.voice = voiceObj;

    utterThis.volume = 5;
    console.log("read", utterThis);
    synth.speak(utterThis);

    setStartedReading(true);
  };

  const changeHandler = (e) => {
    setSelectedVoice(e);
  };

  const pauseReading = () => {
    synth.pause();
  };

  const resumeReading = () => {
    synth.resume();
  };

  //stops the reading
  const cancelReading = () => {
    synth.cancel();
    setStartedReading(false);
  };

  console.log(synth);
  return (
    <div>
      <div style={{ margin: "50px" }}>{textToBeRead}</div>
      {!startedReading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button onClick={handleStartReading}>Read for me</button>
        </div>
      ) : (
        <div style={{ padding: "10px" , display:'flex', justifyContent:'center', columnGap:'20px'}}>
          <button onClick={pauseReading}>Pause</button>
          <button onClick={resumeReading}>Resume</button>
          <button onClick={cancelReading}>Stop</button>
        </div>
      )}

      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        <div className="row">
          <div className="col-4">Select Voice:</div>
          <div className="col-6">
            <select disabled={startedReading===true? true : false}
              onChange={(e) => changeHandler(e.target.value)}
              value={selectedVoice}
            >
              {voices.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToSpeech;
