import { inngest } from 'inngest';
import Ticket from '../../models/Ticket.js';

export const createTicket = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];

    if (user.role !== "user") {
      tickets = await Ticket.find({})
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: user._id })
        .select("title description status priority createdAt")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets = [];

    if (user.role !== "user") {
      tickets = await Ticket.find({})
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: user._id })
        .select("title description status priority createdAt")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getTicket=async(req, res) => {
    try {
        const user = req.user;
        let ticket;
        if (user.role !== "user") {
            ticket = await Ticket.findById(req.params.id)
                .populate("assignedTo", ["email", "_id"])
                .sort({ createdAt: -1 });
        }else{
            Ticket.findOne({
                createdBy: user._id,
                _id:req.params.id
            }).select("title description status priority createdAt ")
        }
        if(!ticket){
            return res.status(401).json({ error: "Ticket not found" });
        }
        return res.status(200).json(ticket);
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};