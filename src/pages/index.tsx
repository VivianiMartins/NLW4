import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChalenge } from "../components/CompletedChalenge";
import { Countdown } from "../components/Countdown";
import { ChalengeBox } from "../components/ChalengeBox";
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | Move.It</title>
      </Head>
      
      <ExperienceBar />
      
      <CountdownProvider>
        <section>

          <div>
            <Profile />
            <CompletedChalenge />
            <Countdown />
          </div>
          
          <div>
            <ChalengeBox />
          </div>

        </section>
      </CountdownProvider>
    </div>
  )
}
