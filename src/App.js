import { useState } from 'react';
import './App.css';

function App() {
  let originalGrid = Array.from({length: 3}, ()=>
    Array.from({length: 3}, ()=> '')
  );
  const [Grid, setGrid] = useState(originalGrid);
  const [Chance, setChance] = useState(true);

  const [Winner, setWinner] = useState(null);

  const handleClick = (rowInd, colInd) => {
    if (Winner)
      return;

    if (Grid[rowInd][colInd] === '') {
      if (Chance === true) {
        setGrid(prev => {
          let t = [...prev];
          t[rowInd][colInd] = 'x';
          handleWinner(t)
          return t;
        })
      } else if (Chance === false) {
        setGrid(prev => {
          let t = [...prev];
          t[rowInd][colInd] = 'o';
          handleWinner(t)
          return t;
        })
      }
      setChance(p => !p);
    }
  }

  const handleWinner = (gridTmp) => {
    const winnerScene = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]], [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[2, 0], [2, 1], [2, 2]], [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]];

    winnerScene.some((scene) => {
      let [a, b, c] = [...scene]
      if (gridTmp[a[0]][a[1]] && gridTmp[a[0]][a[1]] === gridTmp[b[0]][b[1]] && gridTmp[a[0]][a[1]] === gridTmp[c[0]][c[1]]) {
        setWinner(gridTmp[a[0]][a[1]] === 'x' ? "1st Player" : 'second Player')
        return true;
      }

    })
  }

  const handleReset = () => {
    setGrid(originalGrid);
    setWinner(null);
  }

  return (
    <div className="App">
      <h4>
        1st player: x
      </h4>
      <h4>
        2nd player: o
      </h4>
      {
        Grid.map((row, rowInd) => (
          <div className='row' key={rowInd}>
            {
              row.map((col, colInd) => (
                <div className='col' key={colInd} onClick={() => handleClick(rowInd, colInd)}>
                  {col}
                </div>
              ))
            }
          </div>
        ))
      }

      <button onClick={handleReset} className='resetBtn'>
        Reset
      </button>
      {Winner && <div>Winner:
        <span> </span>
        {Winner}
      </div>}
    </div>
  );
}

export default App;
