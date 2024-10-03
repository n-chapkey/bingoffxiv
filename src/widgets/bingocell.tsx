import React from 'react';
import useFitText from 'use-fit-text';

interface BingoCellProps {
    taskName: string;
}

const BingoCell: React.FC<BingoCellProps> = ({ taskName }) => {
    const { fontSize, ref } = useFitText();

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
                overflow: 'hidden' // Ensures text stays within the box
            }}>
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