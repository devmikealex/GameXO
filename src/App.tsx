import { useState } from 'react'

type CellState = '' | 'X' | 'O'

const initState: CellState[] = Array(9).fill('')

const userToString = (user: boolean): CellState => (user ? 'X' : 'O')

export default function App() {
    const [game, setGame] = useState<CellState[]>([...initState])
    const [user, setUser] = useState(true)

    function funcSetState(id: number) {
        if (!game[id]) {
            game[id] = userToString(user)
            setGame([...game])
            setUser(!user)
        }
    }

    function reset() {
        setGame([...initState])
        setUser(true)
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
            <h2>
                current user:<span className='cur-user'>{userToString(user)}</span>
            </h2>
            <button onClick={reset} style={{ display: 'block', margin: '0 auto' }}>
                Reset
            </button>
        </>
    )
}

function Cell({
    state,
    funcSetState,
}: {
    state: CellState
    funcSetState: React.MouseEventHandler
}) {
    return (
        <div className='cell' onClick={funcSetState}>
            {state}
        </div>
    )
}
