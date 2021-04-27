import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css'; //importando o css do componente

export function CompletedChallenges() { //criando função
  const { challengesCompleted } = useContext(ChallengesContext);

  return ( 
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}

//className atribui uma classe ao componente, esta atribuindo o import do styles