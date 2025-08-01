import {express} from 'express';
import {authenticate} from '../middlewares/auth.js';
import {getTickets, createTicket, updateTicket} from '../controllers/ticketController.js';
const router = express.Router();


router.get('/tickets', authenticate, getTickets);
router.get('/tickets/:id', authenticate, getTickets);
router.post("/tickets", authenticate, createTicket);
