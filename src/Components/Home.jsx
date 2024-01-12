//Home.jsx
/*
Author:Anil
what is Home.jsx?
here contextually ,Home component is used for taking author Name as input from the user 
fetching the api for the prescribed poems of  the respective author and also having a 
functionality of filters


API stages 
if Author exist API SUCCESS ==>  
get all the Poems of his name and store it in an Array and render accordingly 

else API FAILURE ==>  
the author didnot exist ,so  print 
not everyone is author in the place of Array 
like I do CONDITIONAL RENDERING  and  set the apiStatus to  FAILURE and achieve the above functionality

if Author exist API SUCCESS==>
give me the total poem line count 
like what is say is just sum up all the objects linecount and give as the total number of lines 
Give the titles of all the poems which have minimum count 

else API Failure:
render Zero for the replacement of total line count 
render Dash for the replacement of Titles


----!  How will you know if the api has a failure status ?
it responds with 404  OR you can go whether the datastructure is array or Not 



Handliing all the API stages 
1.isLoading Phase
2.isSuccess Phase 
3.isZero Phase 
4.isFailure phase


1.As soon as user clicks submit button the function gets triggered 
so we need to show something to the user so we can use a Loader Spinner to show like 
the data is loading this is called isLoading  Phase we do this by setting isLoading state as true 

2.isSuccess Phase like if the data fetched properly and array.Length is greater than Zero 
and response status code  is 200 then we have appropriate success Phase so 
we can render the array of Objects Mapping  code .

Using this we can solve this errors
---! the fetched data is not array 
----! undefined has no Length 
---! undefined has no speciic object property like title 

3.isZero phase is something where the status is 200 but there is no data to view so we need to show a No results found 
here in the context No Authors Found .

---! it will help to handle view ,where random inputs from user are given

4.isFailure Phase is like we couldnot fetch the data properly 
using this we can solve the errors 
---! backend url connection error 
---! we show Error Found view like as in this phase we show something to user like OOPs You lost Connection
---! helps to avoid the undefined errors



*/



import React, { Component } from 'react'
import './Home.css'
import './poem.css'


import { v4 as uuidv4 } from 'uuid'
/*
Necessary Assumption
For rendering the array of authors we need each object having a unique value 
but the object doesnt have any unique values so i have used this package for 
Virutal Dom Key purpose

*/

class TextInputForm extends Component {

	/* Initialize state with an empty textInput
	1.textinput for author Name
	2.poemAuthorList for listing out the author poems 
	3.filteredTitles for the respective titles which have minimum Line count
	4.apiStatusFailure for the No author Found section
   */ 

	/*
	what is state? it is used for mutable changes like we need to store the changes, actions done by the user
	and achieve the necessary change in the view 
	Instagram App uses sound as state ,as user clicks mute in one video it is set for all the videos so 
	the state is set in Context ===>These are like Global variables in React
	Noting down ,tracking the changes and updating the UI 
	rendering Components automatically done by react as soon as the state changes
	state  only present in the class components 
	*/
	state = {
		textInput: '',
		poemAuthorList: [],
		filteredTitles: [],
		TotalLineCount: '',
		apiStatusFailure: false
	}
	// Event is object consists of another object having target has value
	//setState is used for the setting values to state 
	handleInputChange = (event) => {
		this.setState({
			textInput: event.target.value
		})
	}

	// Event handler for form submission

	//if the button is clicked  do a fetch to the PoetryDB API so call the getPoemAuthors function 
	//event.preventDefault is used for the preventing default action of Form 
	//usually we see question mark in url when we dont handle this action
	handleSubmit = (event) => {
		event.preventDefault()
		this.getPoemAuthors()	
	}

	/*asynchronus functions are used for not blocking the running it can move if the desired action is taking 
	more time ,as java script is a interpretered Langauge,it executes line by line .unitll unless we finish 
	some x line we cant go for x+1 line so we use async programming for it 

	1.For import Data like data from backend need to be fetched and should be ready in frontend Array
	till then we cant go ahead so to complete the action we use await ,
	usually all the api calls use async and await for fetching 

	in Simple  Terms if we use await we move if and only if the required action is successfully happened 
	it may be Failure or Success

	fetch is used for the fetching get requests for the API's
	if response status is 200 then we have a response 
	or else we have a error in response there is a issue with the backend connection 

	*/
	getPoemAuthors = async () => {
		const { textInput } = this.state
		//string InterPolation this is the base url we have given the input to the url
		const apiUrl = `https://poetrydb.org/author/${textInput}`
		const response = await fetch(apiUrl)

		if (response.status === 200) {
			try {
				const fetchedData = await response.json()
				/*
						Here the linecount is a string in the object so parsing to Int is required for 
						necessary calculations
						*/
				if (Array.isArray(fetchedData)) {
					const updatedData = fetchedData.map((poemAuthor) => ({
						title: poemAuthor.title,
						poem: poemAuthor.lines,
						lineCount: parseInt(poemAuthor.linecount, 10),
						authorName: poemAuthor.author,
						id: uuidv4()
					}))
					/*
					The mapping is done to follow the standard camelCase convention 
					like However u store the lineCount in BackEnd {line-count ,linecount,LineCount}
					To avoid ambiguity we map things into camelCase like 
					we do searching and Debugging in oneGO
					*/

					this.setState({
						poemAuthorList: updatedData
					})
				} else {
					console.error('Fetched data is not an array:', fetchedData)
					// Handle the non-array case as needed ,we render the falure status 
					this.setState({
						apiStatusFailure: true
					})
				}
			} catch (error) {
				console.error('Error parsing JSON:', error)

			}
		}
	}

	handleFilter = () => {
		const { poemAuthorList } = this.state

		// Find the minimum line count using reduce method 
		/*
		we use redue method 
		when you have an array of values and you want to transform those values into a single result 
		 It iterates over each element of the array, 
		 applies a function that you provide, and accumulates a final result
		*/

		const totalLineCount = poemAuthorList.reduce(
			(total, poem) => total + poem.lineCount,
			0
		)

		console.log(totalLineCount)

		// Get titles of poems with the minimum line count
		//we use math.min and check the each object and update the min value like we do Array Operations
		let minLineCount = poemAuthorList.reduce(
			(min, obj) => Math.min(min, obj.lineCount),
			Infinity
		)

		console.log(minLineCount)

		// Get titles of poems with the minimum line count
		//we again check the array for the objects with this minium line Count and get the objects
		let titlesWithMinLineCount = poemAuthorList.filter(
			(obj) => obj.lineCount === minLineCount
		)

		console.log(titlesWithMinLineCount)

		//Take , what you require
		//so we take only the title and id for the necessary usage
		const finalArray = titlesWithMinLineCount.map((obj) => ({
			title: obj.title,
			id: obj.id
		}))
		this.setState({
			filteredTitles: finalArray,
			TotalLineCount: totalLineCount
		})
	}

	//rendering the Filtered Titles upon clcikgin the filter button

	renderFilteredTitles = () => {
		const { filteredTitles, TotalLineCount } = this.state

		return (
			<div className="filtered-container">
				<h1 className="poem-title-heading">Filtered Titles</h1>
				<h2 className="poem-count">{TotalLineCount}</h2>
				<ul>
					{filteredTitles.map((obj) => (
						<li key={obj.id} className="poem-count">
							{obj.title}
						</li>
					))}
				</ul>
			</div>
		)
	}

	render() {
		const { textInput, poemAuthorList, filteredTitles, apiStatusFailure } =
			this.state
		return (
			<div className="home-container">
				<form
					onSubmit={this.handleSubmit}
					className="author-name-form-element"
				>
				<label className="author-name-label-element">
					Text Input:
					{/* Input element for text input  Controlled Input*/}
					<input
						type="text"
						value={textInput}
						onChange={this.handleInputChange}
						placeholder="Enter text here"
						className="author-name-input-element"
					/>
				</label>

				{/* Button to submit the form */}
				<button
					type="submit"
					className="author-name-button-element"
				>
					Submit
				</button>

				<button
					onClick={this.handleFilter}
					className="author-filter-button-element "
				>
					Filter
				</button>
				</form>
				{/*render PoemAuthor Array or no Author Found
				render the special case of zero and dash*/}
				<div className="card-container">
					<>
						{poemAuthorList.length > 0 && (
							<div>
								<h1 className="poem-heading">All Poems</h1>
								<ul>
									{poemAuthorList.map((poemDetails) => (
										<div
											className="poem-container"
											key={poemDetails.id}
										>
											<h2 className="poem-title">
												Title: {poemDetails.title}
											</h2>
											<p className="poem-content">
												Poem: {poemDetails.poem}
											</p>
											<p className="poem-author">
												Author: {poemDetails.authorName}
											</p>
											<p className="poem-line-count">
												LinesCount:{' '}
												{poemDetails.lineCount}
											</p>
										</div>
									))}
								</ul>
							</div>
						)}
						{apiStatusFailure && (
							<div className="poem-container">
								<h1 className="poem-title-heading">
									Not Everyone is Author
								</h1>
							</div>
						)}
					</>
					{filteredTitles.length > 0 && this.renderFilteredTitles()}
					{apiStatusFailure && (
						<div className="poem-container">
							<h1 className="poem-title-heading">
								Filtered Titles
							</h1>
							<ul>
								<li key="1">0</li>
								<li key="2">-</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default TextInputForm
