import picture from '../assets/user.png'
import './ChatMessage.css'

 export function ChatMessage({message, sender}) {
               //const message = props.message;
              // const sender = props.sender;
             // const { message, sender } = props;

               if(sender === 'bot'){
                  
                return (
                    <div className="chat-message-bot">
                     
                       <img 
                            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="chatbot" width="45" height="50" />
                           <div className="message-content">
                            {message}
                           </div>
                    </div>
                );


               }
                return (

                        <div className="chat-message-user">
                        <div className="message-content">
                            {message}
                        </div>
                            <img src={picture} alt="user" width="45" height="50" />
                        </div>
                );
            }





