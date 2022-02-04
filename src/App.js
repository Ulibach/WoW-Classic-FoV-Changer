import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {useDebounce} from '@react-hook/debounce'

const style = {
  fontFamily:"-apple-system, 'Helvetica Neue', sans-serif",
  fontWeight: 900,
  fontSize: 16,
  letterSpacing:'-.04em'
}

const degtorad = d => d * (Math.PI / 180)

function App () {
  const [fov, setFOV] = useDebounce(50, 10)
  const [config, setConfig] = useState();
  const CameraBaseRef = useRef(null);
  const CameraOffsetRef = useRef(null);
  const [prc, setPrc] = useState(false);
  const [settings, toggleSettings] = useState(false)
  useEffect(() => {

    if (prc) {
      window.api.send("change_fov", degtorad(fov));
    }

  }, [fov])

  useEffect(() => {

    if (fov != 50) {
      window.api.send("change_fov", degtorad(fov));
    }

  }, [prc])


  useEffect(() => {
    if (config) {
    console.log("config", config)
    }
  }, [config])
  useEffect(() => {
    if (window.api) {
      window.api.receive("handle", (data) => {
        setConfig(data.message != 'error' ? data.message : null)
        console.log(data)
      })    

      window.api.receive("search", data => setPrc(data))
      window.api.send("get_config");
    }
  }, [window])
  return (
    <div style={{ margin: '0 auto', textAlign: 'center'}}>
      <h3 style={style}>WoW Classic FoV Changer</h3>
      <div>Select fov:</div>
      <div>
      1<input onChange={e => setFOV(+e.target.value)} step={1} type="range" defaultValue={fov} max={180} min={1}/>180
      </div>
      <div>
      {fov && fov.toFixed(2)}
      </div>

    {prc ? 
  <div>
    <b style={{
      color: 'green',
      fontStyle: 'Roboto'
    }} color="green">✅ WoW Proccess Found ✅</b>
  </div>
  :
  <div>
  <b
  style={{
    color: 'grey',
    fontStyle: 'Roboto'
  }}
  >💀 WoW proccess not found 💀</b>
  </div>
  }

      <br/>

      <div>

      </div>

        {settings ?
        <a href="" onClick={e => {
          e.preventDefault()
          toggleSettings(!settings)
        }}>hide settings</a>
        :
        <a href="" onClick={e => {
          e.preventDefault()
          toggleSettings(!settings)
        }}> show settings</a>
        }

{settings && 
        
        <div>

<div>
        Camera base value: <input ref={CameraBaseRef} onChange={e => setConfig({...config, CameraBase: e.target.value})} type="text" defaultValue={config && config.CameraBase} />
        </div>
        <div>
        Camera offset value: <input ref={CameraOffsetRef} type="text" onChange={e => setConfig({...config, CameraOffset: e.target.value})} defaultValue={config && config.CameraOffset} />
        </div>


        <div>
        <button onClick={() => {
            window.api.send("write", (config))
        }}>Save changes</button>
        <button onClick={() => {
          setConfig({
            CameraBase: "0x32B9548",
            CameraOffset: "0x38E0",
            FOVOffset: "0x40"
          })
          CameraBaseRef.current.value = '0x32B9548'
          CameraOffsetRef.current.value = '0x38E0'
          window.api.send("revert")
        }}>Revert to defaults</button>
      </div>

        </div>

        }


      <div>
        <br/>
        Note: This tool is made for TBC Classic Build 42083.
        To manually update the tool get your version's offset dump from <a target="_blank" href="https://www.ownedcore.com/forums/world-of-warcraft/world-of-warcraft-bots-programs/wow-memory-editing/">here</a> and update the values above.
      </div>
    </div>
  )
}

ReactDOM.render(<App />,  document.getElementById('root'));