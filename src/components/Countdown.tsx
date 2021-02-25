import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){

    const { minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown 
    } = useContext(CountdownContext);
   
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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