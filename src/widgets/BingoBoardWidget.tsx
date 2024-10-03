import BingoBoard from '../components/bingoboard';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

interface Task {
  id: string;
  completed: boolean;
}

const BingoBoardWidget = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tasks, setTasks] = useState<Task[]>([]);
  const socket = socketIOClient();

  useEffect(() => {
    socket.emit('joinMatch', 'match-id');
    
    socket.on('taskComplete', (taskId: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    });

    return () => {
      socket.off('taskComplete');
    };
  }, [socket]);

//   const handleTaskComplete = (taskId: string) => {
//     socket.emit('taskComplete', taskId);
//   };

  return (
    <div>
      <BingoBoard  />
    </div>
  );
};

export default BingoBoardWidget;
