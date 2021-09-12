
//this would be the object shape for storing the questions  
const questions = [
    {
        question: "Do you often wish for more energy to get through the day with ease?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionA"
    },

    {
        question: "Do you often feel foggy or have problems concentrating?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you get cravings for certain foods such as sweet or salty snacks?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you have problems staying awake during the day?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you have problems with mood swings or depression?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you often feel stressed without good reason?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you often get indigestion (heart burn)?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you struggle with your weight – not able to lose or keep off weight permanently?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you suffer from stiff and aching joints?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you have a dry skin and nails that break easily?",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

    {
        question: "Do you get headaches more than once a month?  ",
        optionA: "Yes",
        optionB: "Sometimes",
        optionC: "No",
        correctOption: "optionC"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    //app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index];
    document.getElementById("question-number").innerHTML = questionNumber;
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    // document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false ) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            // document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            // document.getElementById(wrongLabelId).style.backgroundColor = "red"
            // document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}


// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = " Oops!!🙁 You seem to have some problems that hampers your daily performance at your job as well as at home. Maybe you are not even aware of your shortfalls. Do yourself a favor by giving your health the attention it needs, now - before you get serious warnings. "
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Your health can be vibrant!!🙂 Just by filling out these questions, you must have noticed that your health needs some attention."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Great!!😃 It seems like you are in touch with your body and responsive to its needs. "
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board

    document.getElementById('remarks').innerHTML = remark;
    document.getElementById('remarks').style.color = remarkColor;
    document.getElementById('grade-percentage').innerHTML = playerGrade;
    document.getElementById('score-modal').style.display = "flex";


}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}



//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}