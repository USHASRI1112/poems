//App.jsx
/*Author:Anil 
FAQ
1.what is App.jsx ?
it is the starting point of react app where we import all the components and create routes 
basically Home, Products, Cart, Orders .I usally call this module as import section.In React Context 
this will be the Provider and all the consumers who are attached to it will get changed on the change of state

2.what is react-router-dom?
it is the react package which has all the routing components Router Switch Route BrowserRouter UseHistory 
this will help us implement routes.Our job is to use them 
CAUTION:react got updated, most of us are not working and removed in newest version vite APP*/

// Import necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
/* The Router component is a fundamental part of react-router-dom. 
It provides the routing context for your application. */
import Home from './Components/Home'
// Home Component is imported from Components directory which is there in src Directory at same level 
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				{/*The Route component is responsible for rendering UI when a location matches the route's path. 
				It takes two props: path and element.
				path ===> the pathname that the route matches. 
				element ===> the component to render when the route matches. 
				*****what if user enters a route /anil or /techAtCore we have to use Redirect  Component 
				and whatever the route he enters other than list of mentioned ......
				we redirect to that NotFoundRoute*/}
			</Routes>
		</Router>
	)
}
export default App
//Here i have used default exports there are two types of exports 
//1.named exports
//2.default exports