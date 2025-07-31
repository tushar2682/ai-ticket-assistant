import { InngestClient } from 'inngest/client';
import Ticket from '../models/ticket.js';
import { NonRetriableError } from '../errors/NonRetriableError.js';
import { sendEmail } from '../utils/sendEmail.js';
import analyzeTicket from '../utils/analyzeTicket.js';
import user from '../../models/user.js'; // Assuming lowercase name is intended
import UserActivation from '../../models/userActivation.js'; // You referred to this in fallback

export const onTicketCreated = inngest.createFunction(
  { id: "on-sign-up", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      const ticket = await step.run("fetch-ticket", async () => {
        const ticketObject = await Ticket.findById(ticketId);
        if (!ticketObject) {
          throw new NonRetriableError("Ticket no longer found in database");
        }
        return ticketObject;
      });

      const relatedSkills = await step.run("update-ticket-email", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, {
          status: "TODO"
        });

        const aiResponse = await analyzeTicket(ticket);

        let skills = [];
        if (aiResponse) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: ["low", "medium", "high"].includes(aiResponse.Priority)
              ? aiResponse.Priority
              : "medium",
            helpfulNotes: aiResponse["Helpful Notes"],
            relatedSkills: aiResponse["Related Skills"]
          });
          skills = aiResponse["Related Skills"];
        }

        return skills;
      });

      const moderator = await step.run("assign-moderator", async () => {
        let moderatorUser = await user.findOne({
          role: "moderator",
          skills: {
            $elemMatch: {
              $regex: relatedSkills.join("|"),
              $options: "i",
            },
          },
        });

        if (!moderatorUser) {
          moderatorUser = await UserActivation.findOne({
            role: "admin",
          });
        }

        await Ticket.findByIdAndUpdate(ticket._id, {
          assignedTo: moderatorUser ? moderatorUser._id : null,
        });

        return moderatorUser;
      });

      await step.run("send-ticket-email-notification", async () => {
        if (moderator) {
          await sendEmail(
            moderator.email,
            "New Ticket Assigned",
            `A new ticket has been assigned to you. Ticket ID: ${ticket._id}. Please check the system for details.`
          );
        }
      });

      return { success: true };

    } catch (error) {
      console.error("Error processing ticket:", error);
      throw error;
    }
  }
);
