"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { connectSocket } from '../../socket/index';
import BingoBoard from '@/components/bingoboard';

const MatchPage = () => {
  interface Task {
    id: string;
    name: string;
    completed: boolean;
  }
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const searchParams = useSearchParams();
  const matchId = searchParams ? searchParams.get('matchId') : null; // Get matchId from URL
  const socket = connectSocket();

  useEffect(() => {
    if (!socket || !matchId) return;

    // Join the match room
    socket.emit('joinMatch', matchId);

    // Listen for task completion events
    socket.on('taskComplete', (taskId: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    });

    // Cleanup on unmount
    return () => {
      socket.off('taskComplete');
    };
  }, [socket, matchId]);

  return (
    <div>
      <h1>Match {matchId}</h1>
      <ul>
        <BingoBoard />
      </ul>
    </div>
  );
};

export default MatchPage;