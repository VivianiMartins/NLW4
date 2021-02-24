import { useState, useEffect, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    const {startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [ hasFinished, setHasFinisihed ] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown () {
        setIsActive(true);
    }

    function resetCountdown (){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime( 0.1 * 60 );
    }

    useEffect(() => {
        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if( isActive && time == 0 ){
            console.log('Ciclo Finalizado');
            setHasFinisihed(true);
            setIsActive(false);
            startNewChallenge ();
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
 
            <div>
                { hasFinished ? (
                    <button 
                    disabled
                    className={styles.CountdownButton}
                    >
                        Ciclo Finalizado
                        <img src="check_circle.png" alt="Check" />
                    </button>
                ) : (
                    <>
                        { isActive ?
                            (
                                <button type="button" 
                                className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}
                                onClick={resetCountdown}
                                >
                                    Abandonar Ciclo
                                    <img src="icons/close.svg" alt="Close" />
                                </button>
                            ) : (
                                <button type="button" 
                                className={styles.CountdownButton}
                                onClick={startCountdown}
                                >
                                    Iniciar Ciclo
                            </button>
                            )
                        } 
                    </>   
                )}            
            </div>
        </div>

    );
}