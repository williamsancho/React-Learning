 import {Chatbot} from 'supersimpledev'
 import {useState} from 'react'
 import './ChatInput.css'
          
           
           
           
           
      export  function ChatInput({chatMessages, setChatMessages}) {
                    const [inputText, setInputText] = useState('');

                    function saveInputText(event) {
                        setInputText(event.target.value);
                    
                    }

                function sendMessage() {

                    const newChatMessages = [
                            ...chatMessages,
                            {
                                message: inputText,
                                sender: 'user',
                                id: crypto.randomUUID()
                            }
                        ];
                        setChatMessages(newChatMessages);

                        const response = Chatbot.getResponse(inputText);
                        setChatMessages([
                            ...newChatMessages,
                            {
                                message: response,
                                sender: 'bot',
                                id: crypto.randomUUID()
                            }
                        ]);

                        setInputText(''); // Clear the input field after sending the message

                    }

                    return(
                        <div className="chat-input-container">
                        <input
                        placeholder="Type your message here..."
                        size ="30"
                        onChange={saveInputText}
                        className="chat-input"
                        value={inputText}
                        />
                        <button 
                        className="send-button" 
                        onClick={sendMessage}>Send
                        </button>
                        </div>
                    )

                }


