import { useState } from 'react'

type CellState = 0 | 1 | 2

function App() {
    const [game, setGame] = useState<CellState[]>([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [user, setUser] = useState(true)

    function funcSetState(id: number) {
        if (!game[id]) {
            game[id] = user ? 1 : 2
            setGame(game)
            setUser(!user)
        }
    }

    return (
        <>
            <h1>XO:Game</h1>
            <div className='wrap'>
                {game.map((cell, i) => {
                    return (
                        <Cell key={i} state={cell} funcSetState={() => funcSetState(i)} />
                    )
                })}
            </div>
            <h2>current user: {user ? 'X' : 'O'}</h2>
        </>
    )
}

export default App

function Cell({
    state,
    funcSetState,
}: {
    state: CellState
    funcSetState: React.MouseEventHandler
}) {
    let t = ''
    if (state == 1) {
        t = 'X'
    } else if (state == 2) {
        t = 'O'
    }

    return (
        <div className='cell' onClick={funcSetState}>
            {t}
        </div>
    )
}
