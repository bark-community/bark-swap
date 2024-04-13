import React, { useState, useEffect } from 'react';

const TimerCount = () => {
    const [time, setTimeVar] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const launchDateString = "July 20, 2024 12:00:00";

        function calculateRemainingTime(targetDate) {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        }

        try {
            const targetDate = new Date(launchDateString).getTime();

            if (isNaN(targetDate)) {
                throw new Error("Invalid launch date");
            }

            setTimeVar(calculateRemainingTime(targetDate));

            const countdownInterval = setInterval(() => {
                setTimeVar(prevTime => calculateRemainingTime(targetDate));
            }, 1000);

            return () => clearInterval(countdownInterval);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }, []);

    const addLeadingZero = value => {
        return value < 10 ? `0${value}` : value;
    };

    return (
        <div id="timerDiv" className='timer-container'>
            <div className='timer-item'>
                <p>{addLeadingZero(time.days)}</p>
                <span>Days</span>
            </div>
            <div className='timer-item'>
                <p>{addLeadingZero(time.hours)}</p>
                <span>Hours</span>
            </div>
            <div className='timer-item'>
                <p>{addLeadingZero(time.minutes)}</p>
                <span>Minutes</span>
            </div>
            <div className='timer-item'>
                <p>{addLeadingZero(time.seconds)}</p>
                <span>Seconds</span>
            </div>
        </div>
    );
}

export default TimerCount;
