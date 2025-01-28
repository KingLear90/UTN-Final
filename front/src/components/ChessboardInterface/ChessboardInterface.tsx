import { Chessboard } from 'react-chessboard';
import { ChessboardProps } from '../../types/interfaces';
import { useState, useEffect } from 'react';
const ChessboardInterface: React.FC<ChessboardProps> = ({ fen, onDrop, boardOrientation }) => {
  const [pieceSquare, setPieceSquare] = useState<string | null>(null);

  // Resetea pieceSquare cuando cambia el FEN
  useEffect(() => {
    setPieceSquare(null);
  }, [fen]);

  // La propiedad onSquareClick permite para manejar el evento de clic en un cuadrado del tablero.
  // Esto permite mover las piezas haciendo clic en ellas y luego en la casilla de destino.
  const onSquareClick = (square: string) => {
    if (pieceSquare === null) {
      setPieceSquare(square);
    } else {
      const moveSuccess = onDrop(pieceSquare, square);
      setPieceSquare(null);
      if (!moveSuccess) {
        setPieceSquare(null);
      }
    }
  };

  return (
    <div>
      <div id="chessboard-container">
        <Chessboard
          position={fen} 
          onPieceDrop={onDrop}     
          onSquareClick={onSquareClick}
          boardWidth={370}  
          customBoardStyle={{
            border: '2px solid #000',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          customDarkSquareStyle={{ backgroundColor: '#f78214' }}
          customLightSquareStyle={{ backgroundColor: '#eefabb' }}
          boardOrientation={boardOrientation}
        />
      </div>
    </div>
  );
};

export default ChessboardInterface;