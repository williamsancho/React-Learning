import { useState } from 'react'
import './App.css'
import {ChatInput} from './component/ChatInput'
import {ChatMessages} from './component/ChatMessages'

           
 


  function App() {
    const [chatMessages, setChatMessages] = useState([{
       message: "Hello, chatbot!",
       sender: "user",
       id: 'id1'
   }, {
      message: "How can I help you today?",
      sender: "bot",
      id: 'id2'
   }, {
       message: "What is the date today?",
      sender: "user",
      id: 'id3'
  }, {
      message: "Today is September 30, 2026",
      sender: "bot",
      id: 'id4'
}]);


                

  return (
  <div className="app-container">
  
    <h1>William Sancho Chatbot</h1>
    <ChatMessages 
       chatMessages={chatMessages} 
    />
    <ChatInput 
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
    />
                        
  </div>
  );

  }
      

export default App
