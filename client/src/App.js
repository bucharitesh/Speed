import { useState, useEffect, useRef } from 'react';
import { getRequests } from './utils/apiRequests';
import { BASE_URL, GET_INTERNET_SPEED } from './utils/apiEndpoints';
import Countup from 'react-countup';

function App() {
  const [error, setError] =  useState();
  const [speed, setSpeed] =  useState(null);

  let startMethod = useRef(100);

  useEffect(()=>{
    getInternetSpeed();
},[]);

  const getInternetSpeed = async () => {
    const response = await getRequests(`${BASE_URL}${GET_INTERNET_SPEED}`);
    if(response.error){
      setError(response.error);
      return false;
    } else {
      setSpeed(response.speed);
      startMethod();
    }
  }

  return (
    <div className="app">
        <div className="speed">
            <Countup 
              start={speed ? speed - 50: 0}
              end={speed ? speed : 0} 
              duration={5}
              onEnd={()=> console.log("end")}
              onStart={()=> console.log("start")}
            >
              {({countUpRef, start}) => {
                startMethod = start;
                return (
                  <>
                  <button onClick={start}>Start</button>
                  <div className="__speed" ref={countUpRef}></div>
                  <div className="measure">Mbps</div>
                  </>
                )
              }}
            </Countup>
          </div>
        
    </div>
  );
}

function Loading() {
  return(
    <h1>
      hello
    </h1>
  );
}
export default App;
