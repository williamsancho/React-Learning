   import { useEffect, useRef } from 'react';
   import { ChatMessage } from './ChatMessage';
   import './ChatMessages.css';

   export function ChatMessages({chatMessages}) {
         const messagesEndRef = useRef(null);

        useEffect(() => {
         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
         }, [chatMessages]);

    return (
         <>
        {chatMessages.map((chatMessage) => {

    return (
    
        <ChatMessage 
            message={chatMessage.message} 
            sender={chatMessage.sender} 
            key={chatMessage.id}
         />
        );
    } )}
   
    </>
     
    );


  };
