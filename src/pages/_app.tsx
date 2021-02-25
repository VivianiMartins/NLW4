import '../styles/global.css';
import '../styles/pages/Home.module.css';

import { ChallengesProvider } from '../contexts/ChallengeContext';


function MyApp({ Component, pageProps }) {
  return( 
    <ChallengesProvider>
      
      <Component {...pageProps} />
      
    </ChallengesProvider>
  )
}

export default MyApp
