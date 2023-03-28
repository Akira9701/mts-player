import React, { forwardRef, useRef } from "react";

interface IProgressBar {
    handleProgress: (time: string) => void;
    ref: HTMLDivElement | null;
}

const ProgressBar: React.FC<IProgressBar> = forwardRef(({ handleProgress }, ref) => {
    const progressRef = useRef(null);

    const changeProgress = (e) => {
        const line: HTMLDivElement | null = progressRef.current;
        if (line !== null) {
            const parentBlock = line.parentElement.parentElement.parentElement.parentElement;
            const time = (e.pageX - (parentBlock.offsetLeft + (parentBlock.offsetWidth * 0.025))) / parentBlock.offsetWidth * 100;
            console.log(time);
            // console.log(line.parentElement.parentElement.parentElement.parentElement.offsetWidth);
            handleProgress(time);
            line.style.width = String(time) + "%";
        }

    }


    return (
        <div ref={ref} onClick={(e) => changeProgress(e)} className="progress-container">
            <div className="progress-line" ref={progressRef}>

            </div>

        </div>
    );
})

export default ProgressBar;