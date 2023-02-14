import React,{useState} from 'react';
import modeContext from './modeContext';

const ModeState = (props) => {
    const [mode, setmode] = useState('light')
  const [color, setcolor] = useState(' Dark mode')
  const toggleMode = ()=>{
    if(mode==='light'){
      setmode('dark')
      setcolor(' Light mode')
      props.showAlert("Success: dark mode has been enabled","success")
      document.body.style.backgroundColor ='#212529';
      document.body.style.color = 'white';
    }else{
      setmode('light')
      setcolor(' Dark mode')
      props.showAlert("Success: light mode has been enabled","success")
      document.body.style.backgroundColor=  'white';
      document.body.style.color=  'black';
    }
  }
  return (<modeContext.Provider value={{mode,color,toggleMode }}>
    {props.children}
</modeContext.Provider>)
}

export default ModeState;