import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import api from './services/api';

interface IMessages {
  from: string;
  content: string | undefined;
}

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<IMessages[]>([{} as IMessages]);
  const [isRobotTurn, setIsRobotTurn] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessages([
      ...messages,
      { from: 'me', content: inputRef.current?.value },
    ]);

    setIsRobotTurn(true);
  }

  useEffect(() => {
    if (isRobotTurn) {
      api
        .get(`get?msg=${inputRef.current?.value}`)
        .then((response) =>
          setMessages([
            ...messages,
            { from: 'robot', content: response.data.irineu_bot },
          ])
        );
    }

    setIsRobotTurn(false);
  }, [isRobotTurn]);

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input
          name='message'
          placeholder='Digite aqui...'
          type='text'
          ref={inputRef}
        />
      </form>

      <ul>
        {messages &&
          messages.map((message, index) => {
            if (index === 0) {
              return <div key={index}></div>;
            } else {
              return (
                <li key={index}>
                  {message.from}: {message.content}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}

export default App;
