import './App.css'
import logo from './assets/sql-server.png'
import copy from './assets/copy.png'
import {useState} from 'react'
import axios from 'axios'
import ReactSwitch from 'react-switch';
import { CopyToClipboard } from "react-copy-to-clipboard";


function App() {
  const [prompt, setPrompt] = useState('')
  const [sqlQuery, setSqlQuery] = useState(null);
  const [entered, setEntered] = useState(null);
  const [copied, setCopied] = useState(false)

  const [lightMode, setLightMode] = useState(true)
  const handleThemeToggle = () => {
    setLightMode(!lightMode);
  };
  
  const generateQuery = async () => {
    const res = await axios.post('http://localhost:3005/generate', {prompt})
    return res.data.response
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const generatedQuery = await generateQuery()
    setSqlQuery(generatedQuery)
    setEntered(prompt)
    setPrompt('')
  }

  return (
    <div className={!lightMode ? 'container' : 'container dark-div dark-text'}>
      <ReactSwitch checked={lightMode} 
                   onChange={handleThemeToggle}  
                   onColor="#5b5b5b"
                   offColor="#dcdcdc"   
                   onHandleColor="#FFFFFF"
                   offHandleColor="#000000"
                   checkedIcon=''
                   uncheckedIcon=''
                   className={lightMode ? 'switch' : 'switch dark-switch'}/>
      <div className='content'>
        <img src={logo} alt='logo' className='logo'/>
        <h1>Don&#39;t know SQL?</h1>
        <h1>Well, you don&#39;t have to!</h1>
        {!sqlQuery && <div>
          <i className='exp'>Examples:</i>
          <i>- Find 10 most expensive models from cars of year 2022 and sort by price.</i>
          <i>- Get all users older than 21 and sort by lastname.</i>
        </div>}
        
        <form onSubmit={handleOnSubmit}>
          <textarea type='text' name='prompt' maxLength={3000}
                    placeholder='Describe your query' value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value)
                      setCopied(false)
                      setSqlQuery(null)
                    }}/>
          <button className={lightMode && 'dark-button'}>Get SQL Query</button>
        </form>

      {sqlQuery && (
        <div className='results'>
          <p className='exp'>You have entered: <b>&#39;{entered}&#39;</b></p> 
            <p className='exp'>Your generated SQL Query: </p>
              <div className='generated'>
                <p className='query'>{sqlQuery}</p>
                {!copied ? 
                  <span>
                    <CopyToClipboard text={sqlQuery} className='clipboard'
                                    onCopy={() => setCopied(true)}>
                      <span><img src={copy} alt='copy-to-clipboard' className='copy'/></span>
                    </CopyToClipboard>
                  </span> : 
                  <span>Copied</span>
                }
              </div>
        </div>
      )}  

    </div> 
    </div>
  )

}

export default App
