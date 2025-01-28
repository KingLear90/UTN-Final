import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessboardInterface from '../ChessboardInterface/ChessboardInterface';
import ConfettiExplosion from 'react-confetti-explosion';
import { problems } from '../../data/problems';

const MatePractice = () => {
  
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState<string>(chess.fen()); // FEN inicial del primer problema
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [currentMove, setCurrentMove] = useState(0); // Mueve el marcador en el problema
  const [isGameOver, setIsGameOver] = useState(false); // Estado para controlar si el juego ha terminado
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    chess.load(problems[currentMove].fen); // Cargar el FEN del problema en Chess.js
    setFen(chess.fen()); // Actualizar el estado de FEN para reflejar la nueva posición
    setCurrentSolutionIndex(0); // Reiniciar el índice de la solución
    setIsGameOver(false); // Reiniciar el estado de fin de juego
  }, [currentMove]);

  // Manejar el evento de mover una pieza
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    // Validar el movimiento usando la lógica de Chess.js
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Promover a Reina
    });

    if (move === null) {
      return false; // Movimiento inválido
    }
    // Actualizar el estado de FEN (tablero)
    setFen(chess.fen());

    // Verificar si el movimiento corresponde al siguiente movimiento de la solución
    const currentSolution = problems[currentMove].solution[currentSolutionIndex];
    const moveStr = sourceSquare + targetSquare;

    if (moveStr === currentSolution) {
      // Si el movimiento es correcto, aumentar el índice de la solución
      setCurrentSolutionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Si el movimiento no es correcto, restablecer el juego
      alert('Movimiento incorrecto, intenta de nuevo');
      chess.undo();
      setFen(chess.fen());
      return false;
    }

    // Verificar si hemos completado todos los movimientos correctos
    if (currentSolutionIndex + 1 === problems[currentMove].moves) {
      setIsExploding(true);
      // Si la respuesta es correcta, cambiar al siguiente problema
      setTimeout(() => setIsExploding(false), 1000);
      setTimeout(() => nextProblem(), 1500);
      setIsGameOver(true); // Indicar que el juego ha terminado
    }
    
    return true;
  };

  // Reiniciar el tablero con un nuevo problema
  const nextProblem = () => {
    // Cambiar al siguiente problema
    setCurrentMove((prevMove) => (prevMove + 1) % problems.length); // Cicla entre problemas
    chess.reset(); // Resetear el tablero
  };


  return (
    <div className="mate-practice">
      <h1>Ejercicios de Jaque Mate</h1>
      <h6>Mejora tu cálculo y visión resolviendo problemas</h6>
      <div id='chessboard-container'>
        <ChessboardInterface fen={fen} onDrop={onDrop} boardOrientation={problems[currentMove].side === 'w' ? 'white' : 'black'} />
      </div>
        {isExploding && <ConfettiExplosion 
        particleCount={130} 
        particleSize={20}
        width={1100} 
        height={600}
        duration={4000}
        style={{
          display: 'flex',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}  />}
        <button onClick={nextProblem}>
          {isGameOver ? '¡Siguiente Problema!' : '¡Siguiente Problema!'}
        </button>
      </div>
  );
};

export default MatePractice;