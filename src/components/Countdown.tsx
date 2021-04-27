import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //padStart verifica se a string possui 2 caracteres se nao, adiciona um zero a esquerda para que fique 2 caracteres na string, split quebra a string, como nao foi passado aprametro ira quebrar cada caractere
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

      { hasFinished ? ( 
        <button 
        disabled
        className={styles.countdownButton}
        >
          Ciclo encerrado 
        </button>
      ) : (
        <>
          { isActive ? ( //VERIFICANDO SE ESTA ATIVO OU NAO E MOSTRANDO TEXTO DESEJADO
            <button 
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
            onClick={resetCountdown}>
              Abadonar ciclo
            </button>
          ) : (
            <button 
            type="button" 
            className={styles.countdownButton} 
            onClick={startCountdown}>
            Iniciar um ciclo
          </button>
          )} 
        </>
      )}   
    </div>
  );
}