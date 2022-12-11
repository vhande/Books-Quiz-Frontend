import React from 'react'
import { decode } from 'html-entities';
import { useState, useEffect } from 'react'
import { Button, Form, Card, Container } from 'react-bootstrap'

function Quiz() {
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [questions, setQuestions] = useState("")
  const [singleAnswer, setSingleAnswer] = useState("")
  const [answerList, setAnswerList] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [info, setInfo] = useState([])


  const [checkId, setCheckId] = useState("")
  const checkChange = e => {
    setCheckId(e.target.name)
    setSingleAnswer(e.target.name)
   
  }

  const clickEvent = () => {
    if (singleAnswer !== "") {
      setCount(count + 1)
    } else {
      alert("Please give an answer.")
    }
  }


  const scoreEvent = (e) => {
    if (singleAnswer === correctAnswer) {
      setScore(score + 1)
    }
  }
  

  // an alternative to for loop to show questions, correct answers and user answers
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  // to fetch data
  const getData = async () => {
    let res = await fetch('https://opentdb.com/api.php?amount=10&category=10&type=multiple')
    let data = await res.json()
  
    setInfo(data.results)
    setCorrectAnswer(data.results[count].correct_answer)
    setAnswers([...data.results[count].incorrect_answers, data.results[count].correct_answer].sort())
    setQuestions(data.results[count].question)
  }

  // to show different questions 
  const setThings = () => {
    setCorrectAnswer(info[count].correct_answer)
    setAnswers([...info[count].incorrect_answers, info[count].correct_answer].sort())
    setQuestions(info[count].question)

  }

  // to save user answers
  const answerListFunc = () => {
    setAnswerList([...answerList, singleAnswer])
  }

 

  useEffect(() => {
    if (info.length == []) {
      getData();
    }
    else if (count < 10) {
      setThings();
      setSingleAnswer("")
      answerListFunc()
    } else if (count == 10) {
      answerListFunc()
    }
  }, [count])



  return (

    <Container fluid className="d-flex flex-column justify-content-center align-items-center" >
      {(questions !== []) && (count < 10) ?
      <div className= "d-flex flex-column align-items-center justify-content-center w-100">
       <p className="lead">Are you a real bookworm?</p>
        <Card id="card" className="quiz-card d-flex flex-column justify-content-center align-items-center rounded-0 m-1 mb-5 mt-3 p-2 w-75 text-dark "> 
          <p className="lead text-center mt-3 px-3">{`${count+1}) ${decode(questions)}`}</p>
          <Form className="d-flex flex-column justify-items-center px-3">
            {answers.length > 0 ? answers.map((item, index) =>

              <Form.Check
                key={item}
                className="mb-3"
                type={'radio'}
                id={decode(item)}
                name={decode(item)}
                label={decode(item)}
                onClick={(e) => { checkChange(e) }}
                checked={checkId === decode(item)}
                onChange={() => { }}
              />
            ) : ""
            }
            <Button className="mb-3 btn-secondary mx-auto" onClick={(e) => { clickEvent(); scoreEvent(e); }}>{count !== 9 ? "Next" : "Finish quiz"}</Button>
          </Form>
        </Card>
        </div>
      
        :
        <div className="quiz pb-5 d-flex flex-column align-items-center">
          <p className="lead">Your score is <strong>{score}</strong>.</p>
          {info !== undefined ?
            arr.map((x) =>
              <Card className="quiz-card d-flex flex-column justify-content-center align-item-center w-75 rounded-0 m-1 p-2 ">
                <>
                  <p key={x}>Question {[x + 1]}: {decode(info[x].question)}</p>
                  <p key={x + 1} style={decode(answerList[x] !== decode(info[x].correct_answer)) ? { color: '#3D0000' } : { color: '#285430' }}>Your answer: {decode(answerList[x])}</p>
                  <p key={x + 2}>Correct answer: {decode(info[x].correct_answer)}</p>
                </>
              </Card>)
            
           
         
            : ""}
            <Button className="mb-2 mt-3 btn-secondary mx-auto" onClick={()=>{setCount(0); setScore(0); setInfo([]); setAnswerList([]); setSingleAnswer("")}}>Restart</Button>
       
        </div>



      }

    </Container>
  )
}

export default Quiz