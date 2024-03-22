import './app.css'
import logo from './assets/sql-server.png'
import {useState} from 'react'

function App() {
  const [prompt, setPrompt] = useState('')
  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log('Form submited with request', prompt)
    
    // sendPromptToServer(prompt)
  }
  return (
    <main className='body'>
      <img src={logo} alt='logo' className='icon'/>
      <h3>Don&#39;t know SQL? Well, you don&#39;t have to!</h3>

      <form onSubmit={handleOnSubmit}>
        <input type='text' name='query-description' placeholder='Describe your query' 
               onChange={(e) => setPrompt(e.target.value)}/>
        <input type='submit' value='Get SQL query'/>
      </form>
    </main>
  )
}

export default App
