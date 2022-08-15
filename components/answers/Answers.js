import React, { useState, useEffect } from 'react';
import SingleAnswer from './SingleAnswer';


function Answers({ numberOfQuestions, firstQuestion, numberOfAnswers, engLetters, correctAnswers, userAnswers }) {
	const [answers, setAnswers] = useState({})
	
	useEffect(() => {
		if (Object.keys(answers).length) {
			localStorage.setItem("answers", JSON.stringify(answers));
		}
	}, [answers])
	
	
	function saveAnswers(singleAnswer) {
		setAnswers({...answers, ...singleAnswer})
	}
	

	const alphabet = engLetters ? ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'] : ['', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж']
	const answerElements = alphabet.slice(0, numberOfAnswers+1).map((letter, ind) => {
		return <span className={`answer-${ind}`}>{letter}</span>
	})
	let nQue = parseInt(numberOfQuestions) + 6
	const numberRows = Math.ceil(nQue / 6)
	let items = []
	let i = 1
	let j = 1
	while (i <= nQue) {
		const col = parseInt((i - 1) / numberRows)
		const row = (i - 1) % numberRows
		const parentSingleBlock = []
		if (row === 0) {
			items.push(
				<div className={`answers column-${col} row-${row}`}>
					{answerElements}
				</div>
			)
		} else {
			items.push(
				<SingleAnswer
					number={firstQuestion + j - 1}
					col={col}
					row={row}
					numberOfAnswers={numberOfAnswers}
					saveAnswers={saveAnswers}
					correctAnswer={correctAnswers?.[j]}
					userAnswer={userAnswers?.[firstQuestion + j - 1]}
				/>
			)
			// items.push([<div className='parentSingleBlock'>{parentSingleBlock}</div>])
			j += 1
		}
		i += 1
	}

	return (
		<div className="answers-parent">
			{items}
		</div>
	)
}

export default Answers;
