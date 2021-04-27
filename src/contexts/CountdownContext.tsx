import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData)

interface CountdownProviderProps {
  children: ReactNode;
}

export function CountdownProvider({ children}: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60); //usando função useState e no parametro pegando os segundos do minuto especificado, atribuindo parametro na array[time], e criando o acionador ou modificador do mesmo array[setTime]
  const [isActive, setisActive] = useState(false);
  const [hasFinished, sethasFinished] = useState(false);

  const minutes = Math.floor(time / 60); //arredonda o numero quebrado para baixo ex: 24.5 = 24
  const seconds = time % 60;

  let countdownTimeout: NodeJS.Timeout;

  function startCountdown() {
    setisActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setisActive(false);
    setTime(0.1 * 60)
    sethasFinished(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if(isActive && time === 0) {
      sethasFinished(true)
      setisActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  );
}