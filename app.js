const list = {
    "./images/animals/img1.png": "bear", 
    "./images/animals/img2.png": "polar bear", 
    "./images/animals/img3.png": "elephant", 
    "./images/animals/img4.png": "tiger", 
    "./images/animals/img5.png": "lion", 
    "./images/animals/img6.png": "zebra", 
    "./images/animals/img7.png": "gorilla", 
    "./images/animals/img8.png": "monkey", 
    "./images/animals/img9.png": "horse", 
    "./images/animals/img10.png": "camel", 
    "./images/animals/img11.png": "cow", 
    "./images/animals/img12.png": "sheep", 
    "./images/animals/img13.png": "pig", 
    "./images/animals/img14.png": "panda", 
    "./images/animals/img15.png": "koala", 
    "./images/animals/img16.png": "penguin", 
    "./images/animals/img17.png": "dog", 
    "./images/animals/img18.png": "cat", 
    "./images/animals/img19.png": "rabbit", 
    "./images/animals/img20.png": "mouse", 
    "./images/animals/img21.png": "snake", 
    "./images/animals/img22.png": "frog", 
    "./images/animals/img23.png": "bird", 
    "./images/animals/img24.png": "eagle", 
}

const timeObj = {
    "30s": 30,
    "1m": 60,
    "2m": 120,
    "3m": 180
}

const allImage = Object.keys(list)
const allText = Object.values(list)

const imageBox = document.querySelector(".image-box")
const textBox = document.querySelector(".text-box")

const startButtonTemplate = `
    <div class="start-button-box">
        <div class="start-button">
            <span>START</span>
        </div>
    </div>
    `
const controlPanelTemplate = `
    <div class="control-panel">
        <div class="game-select-box">
            <div class="game-select-text">Set Game</div>
            <div class="game-select"><span>FREE</span></div>
        </div>
        <div class="time-select-box">
            <div class="time-select-text">Set Time</div>
            <div class="time-select"><span>1m</span></div>
        </div>
        <div class="back-button-box">
            <button class="back-button">BACK</button>
        </div>
    </div>
    `
const readyBoxTemplate = `
    <div class="ready-box">
        <div class="ready-text"><span>READY</span></div>
        <div class="ready-timer">3</div>
    </div>
    `

let gameActive = false
let answer = []
let previousAnswers = []
let typeCount = 0
let stop = false
let game = "free"
let time = "1m"
let gameTime
let score = 0
let countDownTime = 3
let mistakes = 0
let start = true
let trial = false

function setImage() {
    let getRandom = Math.floor( Math.random()*allImage.length )
    let quizImage = allImage[getRandom]
    if ( previousAnswers.includes(quizImage) ) {
        setImage()
    } else {
        previousAnswers.push(quizImage)
        let quizText = list[quizImage]
        imageBox.innerHTML = `<img src="${quizImage}">`
        textBox.textContent = quizText
        answer = quizText.split("")
        textBox.innerHTML = ""
        for ( let i = 0; i < answer.length; i++) {
            if ( answer.length < 14 ) {
                textBox.innerHTML += `<div class="letter-box">${answer[i]}</div>`
            } else if ( answer.length < 21) {
                textBox.innerHTML += `<div class="letter-box small">${answer[i]}</div>`
            } else {
                textBox.innerHTML += `<div class="letter-box vsmall">${answer[i]}</div>`
            }
        }
    }
}

buildStartButton()
buildControlPanel()

function buildStartButton() {
    textBox.innerHTML = startButtonTemplate
    const startButton = document.querySelector(".start-button")
    startButton.addEventListener("click",()=>{
        if ( start ) {
            startButton.innerHTML = `<span>STOP</span>`
            startButton.classList.add("stop-button")
            start = false
            setReady()
        } else {
            startButton.innerHTML = `<span>START</span>`
            startButton.classList.remove("stop-button")
            start = true
        }
    })
}

function buildControlPanel() {
    imageBox.innerHTML = controlPanelTemplate
    let setGame = document.querySelector(".game-select")
    setGame.addEventListener("click",changeGameSetting)
    let setTime = document.querySelector(".time-select")
    setTime.addEventListener("click",changeTimeSetting)
}

function changeGameSetting() {
    let setGame = document.querySelector(".game-select")
    if ( game === "free" ) {
        game = "time"
        trial = false
        setGame.innerHTML = `<span>TIME</span>`
    } else if ( game === "time" ) {
        game = "trial"
        trial = true
        setGame.innerHTML = `<span>TRIAL</span>`
    } else {
        game = "free"
        trial = false
        setGame.innerHTML = `<span>Free</span>`
    }
}
function changeTimeSetting() {
    let setTime = document.querySelector(".time-select")
    if ( time === "1m" && !trial ) {
        time = "2m"
        setTime.innerHTML = `<span>2m</span>`
    } else if ( time === "2m" && !trial ) {
        time = "3m"
        setTime.innerHTML = `<span>3m</span>`
    } else if ( time === "3m" && !trial ) {
        time = "30s"
        setTime.innerHTML = `<span>30s</span>`
    } else {
        time = "1m"
        setTime.innerHTML = `<span>1m</span>`
    }
}

function setReady() {
    imageBox.innerHTML = readyBoxTemplate
    if ( game != "free" ) {
        document.querySelector(".timer-box").innerHTML = `<span>${timeObj[time]}</span>`
    }
    document.querySelector(".score-box").innerHTML = `<span>${score}</span>`
    countDownStart()
}

function countDownStart() {
    let timer = document.querySelector(".ready-timer")
    const countDown = setInterval( ()=>{
        timer.textContent = countDownTime-1
        countDownTime--
        if ( countDownTime === 0 ) {
            clearInterval(countDown)
            console.log("go game")
            setImage()
            gameActive = true
            if ( game != "free" ) {
                gameTime = timeObj[time]
                gameTimer()
            }
        }
    },1000)
}

window.addEventListener("keydown",(x)=>{
    if ( gameActive ) {
        if ( x.key === answer[typeCount]) {
            textBox.children[typeCount].classList.add("go-red")
            typeCount++
        } else {
            mistakes += 1
            if ( trial ) {
                gameTime--
                document.querySelector(".timer-box").innerHTML = `<span>${gameTime}</span>`
            }
        }
        if ( typeCount === answer.length) {
            changeWord()
            score++
            if (trial ) {
                gameTime++
                document.querySelector(".timer-box").innerHTML = `<span>${gameTime}</span>`
            }
            showScore()
        }
    }
})

function changeWord() {
    let finishedWord = document.querySelectorAll(".go-red")
    finishedWord.forEach( (x)=>{
        x.classList.remove("go-red")
        x.classList.add("go-green")
    })
    console.log(previousAnswers.length)
    typeCount = 0
    if ( previousAnswers.length != allImage.length) {
        setTimeout( ()=>{
            setImage()
        },500)
    } else {
        console.log("game over")
        stop = true
        gameActive = false
    }
}

function gameTimer() {
    let timerBox = document.querySelector(".timer-box")
    const newTimer = setInterval( ()=> {
        gameTime -= 1
        timerBox.innerHTML = `<span>${gameTime}</span>`
        if ( gameTime <= 0 || stop ) {
            clearInterval(newTimer)
            console.log("game over")
            gameActive = false
            stop = true
            gameTime = 0
        }
    },1000)
}




function showScore() {
    document.querySelector(".score-box").innerHTML = `<span>${score}</span>`
}