const express = require("express")
const {createEvent,getEvents,getEventById,updateEvent,deleteEvent,userRSVPRequest,searchAndFilterEvents, searchEventsByCategory} = require("../controllers/eventController")


// router object
const eventRouter = express.Router()

// POST create new event

eventRouter.post('/create', createEvent)

eventRouter.get('/',getEvents) 

eventRouter.get('/:id',getEventById)

eventRouter.put('/update/:id', updateEvent)

eventRouter.delete('/delete/:id', deleteEvent)

eventRouter.post('/rsvp/:id',userRSVPRequest)

eventRouter.get('/search',searchAndFilterEvents)

eventRouter.get('/api/search',searchEventsByCategory)



// GET all events






module.exports = eventRouter

