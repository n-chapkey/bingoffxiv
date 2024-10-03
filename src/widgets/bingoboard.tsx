"use client";

import { Task } from '@/types';
import React, { useEffect, useState } from 'react';
import sampleBingo from '@/data/sampleBingo.json';

const BingoBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Limit the tasks to 25 for a 5x5 grid
                setTasks(sampleBingo.slice(0, 25));
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
        <div>
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
                    <div key={index} 
                    style={{
                        border: '3px solid black',
                        padding: '10px',
                        width: '100px', // Fixed width
                        height: '100px', // Fixed height
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        textAlign: 'center',
                        wordWrap: 'break-word',
                        boxSizing: 'border-box' // Include border in the element's total width and height
                    }}>
                        {task.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BingoBoard;
