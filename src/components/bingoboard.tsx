"use client";

import { Task } from '@/types';
import React, { useEffect, useState } from 'react';
import sampleBingo from '@/data/sampleBingo.json';
import BingoCell from '../widgets/BingoCell';

const BingoBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchData() {
            try {
                // Limit the tasks to 25 for a 5x5 grid
                const first25Tasks = sampleBingo.slice(0, 25).map((task, index) => ({
                    ...task,
                    completed: index === 0,
                    completedBy: index === 0 ? 'Player 1' : 'none',
                }));
                setTasks(first25Tasks);
            } catch (err) {
                console.error("Failed to load tasks:", err);
                setError('Failed to load tasks');
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Bingo Board</h1>
            {error && <p>{error}</p>}
            <div style={{ 
                width: '500px', // Fixed width
                display: 'grid',
                gridGap: '1px',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gridTemplateRows: 'repeat(5, 1fr)',
                gridAutoFlow: 'column',
            }}>
                {tasks.map((task, index) => (
                    <BingoCell key={index} taskName={task.name} completed={task.completed} completedBy={task.completedBy} />
                ))}
            </div>
        </div>
    );
};



export default BingoBoard;
