import { Chessboard } from 'react-chessboard';
import { ChessboardProps } from '../../types/interfaces';
const ChessboardInterface: React.FC<ChessboardProps> = ({ fen, onDrop, boardOrientation }) => {
  return (
    <div>
      <div id="chessboard-container">
        <Chessboard
          position={fen} 
          onPieceDrop={onDrop}     
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