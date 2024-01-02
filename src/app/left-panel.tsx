'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { type Socket, io } from 'socket.io-client';

interface ServerToClientEvents {
  message: (data: string) => void;
}

interface ClientToServerEvents {
  message: (data: string) => void;
  ping: () => void;
  joinRoom: (roomCode: string) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:8080'
);

export function LeftPanel() {
  const [roomCode, setRoomCode] = useState('ASD123');
  const [messageHistory, setMessageHistory] = useState<
    {
      receivedAt: string;
      message: string;
    }[]
  >([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onConnect() {
      console.log('connected');
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    const onMessage = (data: string) => {
      console.log(data);
      setMessageHistory(prev => [
        ...prev,
        {
          // format the receivedAt like "23:34:22"
          receivedAt: new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          }),
          message: data
        }
      ]);
    };

    socket.on('connect', onConnect);
    socket.on('message', onMessage);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('message', onMessage);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className='flex flex-col max-h-screen bg-black'>
      <div className='flex items-center justify-between w-full bg-zinc-950 px-2 gap-3'>
        <input
          value={roomCode}
          onChange={e => setRoomCode(e.target.value)}
          className='pl-2 h-[40px] text-zinc-100 text-sm bg-transparent w-full border-0 focus:outline-none'
        />
        <span
          className={cn(
            'h-3 w-3 rounded-full aspect-square',
            isConnected ? 'bg-green-500' : 'bg-red-500'
          )}
        />
        <Button
          size='sm'
          onClick={() => {
            console.log('joining room', roomCode);
            socket.emit('joinRoom', roomCode);
          }}
        >
          Conectar
        </Button>
      </div>
      <div className='flex flex-col text-zinc-100 h-screen w-full font-mono overflow-auto p-4'>
        {messageHistory.map((msg, i) => (
          <pre key={i}>
            <code>
              {msg.receivedAt} - {JSON.stringify(msg.message, null, 2)}
            </code>
          </pre>
        ))}
      </div>
    </div>
  );
}
