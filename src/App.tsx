import { useState } from 'react'

const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function checkForWin(gameState: CellState[], id: number) {
    const linesForCheck = winLines.filter((line) => line.includes(id))
    for (let index = 0; index < linesForCheck.length; index++) {
        const line = linesForCheck[index]
        const lineState = gameState[line[0]] + gameState[line[1]] + gameState[line[2]]
        if (lineState == 'XXX' || lineState == 'OOO') {
            return line
        }
    }
}

type CellState = '' | 'X' | 'O'

const initState: CellState[] = Array(9).fill('')

const userToString = (user: boolean): CellState => (user ? 'X' : 'O')

export default function App() {
    const [game, setGame] = useState<CellState[]>([...initState])
    const [user, setUser] = useState(true)
    const [winLine, setWinLine] = useState<number[] | undefined>(undefined)

    function funcSetState(id: number) {
        if (!game[id] && !winLine) {
            game[id] = userToString(user)
            setGame([...game])
            setUser(!user)
            setWinLine(checkForWin(game, id))
        }
    }

    function reset() {
        setGame([...initState])
        setUser(true)
        setWinLine(undefined)
    }

    let subsH2
    if (winLine) {
        subsH2 = <h2>GAME OVER!</h2>
    } else {
        subsH2 = (
            <h2>
                current user:<span className='cur-user'>{userToString(user)}</span>
            </h2>
        )
    }

    return (
        <>
            <h1>XO:Game</h1>
            <div className={'wrap' + (winLine ? ' no-hover' : '')}>
                {game.map((cell, i) => {
                    let winColor = false
                    if (winLine) winColor = winLine.includes(i)
                    return (
                        <Cell
                            key={i}
                            state={cell}
                            winColor={winColor}
                            funcSetState={() => funcSetState(i)}
                        />
                    )
                })}
            </div>
            {subsH2}
            <button onClick={reset} style={{ display: 'block', margin: '0 auto' }}>
                Reset
            </button>
        </>
    )
}

function Cell({
    state,
    funcSetState,
    winColor,
}: {
    state: CellState
    funcSetState: React.MouseEventHandler
    winColor: boolean
}) {
    return (
        <div
            className={
                'cell' + (winColor ? ' wincolor' : '') + (state ? ' no-hover' : '')
            }
            onClick={funcSetState}
        >
            {state}
        </div>
    )
}
