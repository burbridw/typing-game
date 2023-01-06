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

const allImage = Object.keys(list)
const allText = Object.values(list)

const imageBox = document.querySelector(".image-box")
const textBox = document.querySelector(".text-box")

let answer = []
let previousAnswers = []
let typeCount = 0
let stop = false

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
            textBox.innerHTML += `<div class="letter-box">${answer[i]}</div>`
        }
    }
}
setImage()
let time = 60;
let mistakes = 0
timerDown()

window.addEventListener("keydown",(x)=>{
    if ( x.key === answer[typeCount]) {
        textBox.children[typeCount].classList.add("go-red")
        typeCount++
    } else {
        if ( goingDown ) {
            time -= 1
        } else {
            time += 1
        }
        mistakes += 1
    }
    if ( typeCount === answer.length) {
        changeWord()
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
    }
}

function timerUp() {
    if ( !stop ) {
        setTimeout( ()=>{
            time += 0.1
            timerUp()
        },90)
    } else {
        console.log("You finish in "+time.toFixed(1)+" seconds")
    }
}
function timerDown() {
    goingDown = true
    if ( stop ) {
        console.log("You got all "+allImage.length+" with "+time.toFixed(1)+" seconds remaining")
        console.log("You had "+mistakes+" mistakes")
    } else if ( time > 0 ) {
        setTimeout( ()=>{
            time -= 0.1
            timerDown()
        },90)
    } else {
        console.log("Time is up, you got to "+previousAnswers.length)
        console.log("You had "+mistakes+" mistakes")
    }
}