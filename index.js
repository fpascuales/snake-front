import {signUser, login, isLogin} from "./login.js"
import {canvaSnake} from "./snake.js"
import {getTopPlayers, getPlayersById} from "./snakeapi.js"

document.addEventListener('DOMContentLoaded', async () => {
    const topPlayers = await getTopPlayers()
    sortedTopPlayers(topPlayers)
})

const hayToken = () => {
    const tokenUser = sessionStorage.getItem('token')
    if(!tokenUser){
        const divFormulario = document.querySelector('#div-formulario')
        divFormulario.innerHTML = `    
        <input class="col form-control form-control-sm mx-1" type="text" id="user" placeholder="user">
        <input class="col form-control form-control-sm mx-1"  type="password" id="passwordRegister" placeholder="password"/>
        <button class="col btn btn-secondary btn-sm mx-1"  id="log-in">LOG IN</button>
        <button class="col btn btn-secondary btn-sm mx-1"  id="Register">REGISTER</button>
        `
        const btnLogin = document.querySelector('#log-in')
        const btnSignup = document.querySelector('#Register')

        btnLogin.addEventListener(('click'), () => {
            const username = document.querySelector('#user')
            const password = document.querySelector('#passwordRegister')
            login(username.value, password.value)
        })
        
        btnSignup.addEventListener(('click'), () => {
            const username = document.querySelector('#user')
            const password = document.querySelector('#passwordRegister')
            signUser(username.value, password.value)
        })
    }
    else{
        isLogin()
    }
}
hayToken()

canvaSnake();

const sortedTopPlayers = (topPlayers) => {
    const sortedPlayers = topPlayers.sort((a, b) => b.score - a.score)
    const topTen = sortedPlayers.slice(0, 10)
    getIdTopPlayer(topTen)
}

const getIdTopPlayer = async (topTen) => {
    for (const player of topTen) {
        const id = player.user[0]
        const playerObj = await getPlayersById(id)
        const playerName = playerObj.user
        const gameDate = player.date
        const score = player.score
        drawTopTen(playerName, gameDate, score)
    }
}
const drawTopTen = (playerName, gameDate, score) => {
    gameDate = new Date(gameDate).toLocaleDateString()
    const topName = document.querySelector('#top-name')
    const topDate = document.querySelector('#top-date')
    const topScore = document.querySelector('#top-score')

    const name = document.createElement("span")
    name.textContent = playerName
    const date = document.createElement("span")
    date.textContent = gameDate
    const scorePlayer = document.createElement("span")
    scorePlayer.textContent = score

    topName.appendChild(name)
    topDate.appendChild(date)
    topScore.appendChild(scorePlayer)
}