import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

//localhost:3000/flights

//GET localhost:3000/flights
router.get('/', flightsCtrl.index)

// GET /flights/new
router.get('/new', flightsCtrl.new)

// POST /flights
router.post('/', flightsCtrl.create)


export {
  router
}
