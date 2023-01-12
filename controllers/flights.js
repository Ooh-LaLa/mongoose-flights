import { Flight } from  "../models/flight.js"

function index(req, res) {
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
    title: "Add Flight",
  })
 }


 function create(req, res) {
  console.log("REQ.BODY", req.body)
  for (let key in req.body) { 
    if (req.body[key] === '') delete req.body[key]
  }
  console.log("REQ.BODY", req.body)
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    res.redirect('/flights')
  })
}
 
function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
  res.render("flights/show", {
    title: "Flight Details",
    flight: flight
  })
  })
//   .catch(err => {
//     res.redirect('/flights')
//   })
}

 

 export {
   index,
   newFlight as new,
   create,
   show,
 }
