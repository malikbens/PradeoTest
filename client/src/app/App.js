import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../components/Navbar'
import Apps from '../components/Apps';

function App() {

  const [backendData, setBackendData] = useState([{}]);
  
  useEffect(() => {
    fetch("/api/apps").then(
      response => response.json()
    ).then(data => {
        setBackendData(data);
      }
    )
  }, [])

  if(backendData){
    return (
      <>
      <Navbar />
      <div>
      {backendData.map(data => (
        <Apps key={data.id} name={data.name} status={data.status} description={data.description}/>
      ))}
      </div>
      </>
    )
  }

}

export default App