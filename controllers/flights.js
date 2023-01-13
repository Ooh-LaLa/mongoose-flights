import { Flight } from  "../models/flight.js"
import { Meal } from "../models/meal.js"

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
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Detail', 
        flight: flight,
        meals: meals,
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect("/")
    })
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}
 
function addMeal(req, res) {
  console.log("Add meal");
  console.log("The _id of the meal we are adding to the flight is:", req.body.mealId);
  Flight.findById(req.params.id)
  .then(flight => {
   flight.meals.push(req.body.mealSelect)
   flight.save()
  .then(() => {
      res.redirect(`/flights/${flight._id}`)
  })
    .catch(err => {
      console.log(err);
      res.redirect("/")
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect("/")
  })
}

 export {
   index,
   newFlight as new,
   create,
   show,
   createTicket,
   addMeal
 }
