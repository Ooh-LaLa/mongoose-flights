import { Flight } from  "../models/flight.js"

function index(req, res) {
  console.log(req.date);
  console.log(req.time)
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: "All Flights",
    })
  })
  .catch(error => {
    console.log(error)
    // redirect to localhost:3000
    res.redirect('/')
  })
}



function newFlight(req, res) {
  res.render("flights/new", {
    airline: "Add Airline",
  })
 }


 function create(req, res) {
  // convert checkbox of nothing or "on" to boolean
  req.body.nowFlying = !!req.body.nowFlying
  // replace and split if it's not an empty string
  if (req.body.cast) {
		// Key can be "title", "releaseYear", etc.
    req.body.cast = req.body.cast.split(', ')
  }
  console.log(req.body);
  for (const key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  console.log(req.body);
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/movies`)
  })
  .catch(err => {
    res.redirect('/flights')
  })
}
 
 export {
   index,
   newFlight as new,
   create,
 }
