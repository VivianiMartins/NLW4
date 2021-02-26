import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChalengeBox.module.css';

export function ChalengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.chalengeBoxContainer}>

            { activeChallenge ? (
                <div className={styles.chalengeActive}>
                    <header>Ganhe {activeChallenge.amount}</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>
                        {activeChallenge.description}
                        </p>
                    </main>
                    <footer>
                        <button 
                        type="button" 
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>

                        <button 
                        type="button" 
                        className={styles.challengeSuccededButton}
                        onClick={handleChallengeSucceded}
                        
                        >
                            Completei
                        </button>
                    </footer>
                </div>

            ) : (
                <div className={styles.chalengeNotActive}>
                <strong>Complete um ciclo para receber desafios</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de nível completando desafios.
                </p>
            </div>
            )}

        </div>
    );
}