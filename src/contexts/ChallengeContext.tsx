import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    children: ReactNode;
}

export function ChallengesProvider ({ children }: ChallengesProviderProps) {
    const [ level, setLevel ] = useState(1);
    const [ currentExperience, setCurrentExperience ] = useState(0);
    const [ challengesCompleted, setChallengesCompleted ] = useState(0);
    const [ activeChallenge, setActiveChallenge ] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    },[])

    function levelUp(){
        setLevel( level + 1 );
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted'){
            new Notification("Novo Desafio", {
                body: `Valendo ${challenge.amount}xp!`

            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExpierence = currentExperience + amount;

        if (finalExpierence >= experienceToNextLevel){
            finalExpierence = finalExpierence - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExpierence);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }
    
    return(
        <ChallengeContext.Provider
            value = {{ 
                level, 
                currentExperience, 
                challengesCompleted, 
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
            }}
        >
            {children}
        </ChallengeContext.Provider>
    );
}