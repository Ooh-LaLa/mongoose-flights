import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema



const ticketSchema = new Schema({
  seat: {
     type: String,
     match: /[A-F][1-9]\d?/},
  price: {
     type: Number, 
     min: 0,
   },
 })
 

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']},
  airport: {
    type: String, 
    default: 'DEN',
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']},
  flightNo: { 
    type: Number, 
    min: 10,
    max: 9999},
  departs: {
    type: Date,
    //   timestamps: true
  },
  tickets: [ticketSchema]},
)


const Flight = mongoose.model('Flight', flightSchema)


export {
  Flight,
}