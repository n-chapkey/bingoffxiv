import React, { useEffect, useState } from 'react';
import useFitText from 'use-fit-text';

interface BingoCellProps {
    taskName: string;
    completed: boolean;
    completedBy: string;
}

const BingoCell: React.FC<BingoCellProps> = ({ taskName, completed:initialCompleted, completedBy:initialCompletedBy }) => {
    const { fontSize, ref } = useFitText();
    const [currColor, setCurrColor] = useState('white');
    const [completed, setCompleted] = useState(initialCompleted);
    const [completedBy, setCompletedBy] = useState(initialCompletedBy);

    useEffect(() => {
        setCurrColor(completedBy === 'none' ? 'white' : 'red');
    }, [completed, completedBy]);

    function handleClick() {
        // eslint-disable-next-line no-alert
        setCompletedBy('desp')
        setCompleted(true)
        //alert(`Task: ${taskName}\nCompleted By: Team ${completedBy}`);

    }

    return (
        <div 
            style={{
                border: '3px solid black',
                padding: '5px',
                width: '100px', // Fixed width
                height: '100px', // Fixed height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                wordWrap: 'break-word',
                boxSizing: 'border-box', // Include border in the element's total width and height
                overflow: 'hidden', // Ensures text stays within the box
                backgroundColor: currColor,
                cursor: 'pointer',
                
            }}
            onClick={handleClick}>
            <div 
                ref={ref} 
                style={{ 
                    fontSize,
                    width: '100%', 
                    height: '100%', 
                    lineHeight: 'normal' // Prevents excessive line height stretching
                }}>
                {taskName}
            </div>
        </div>
    );
};

export default BingoCell;