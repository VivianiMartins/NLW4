import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompletedChalenge.module.css';

export function CompletedChalenge() {
    const { challengesCompleted } = useContext(ChallengeContext);

    return(
        <div className={styles.CompletedChalengeContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}