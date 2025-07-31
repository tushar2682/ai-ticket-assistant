import { InngestClient } from 'inngest/client';
import { UserActivation } from '../models/UserActivation.js'; // Adjust path as needed
import { NonRetriableError } from '../errors/NonRetriableError.js'; // Adjust path as needed
import { sendEmail } from '../utils/sendEmail.js'; // Adjust path as needed

const inngest = new InngestClient();

export const onSignUp = inngest.createFunction(
  { id: "on-sign-up", retries: 2 },
  { event: "user.signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      const userobject = await step.run("get-user-email", async () => {
        const user = await UserActivation.findOne({ email });
        if (!user) {
          throw new NonRetriableError("User no longer found in database");
        }
        return user;
      });

      await step.run("send-welcome-email", async () => {
        const subject = "Welcome to Inngest Ticketing System";
        const text = `Hi, welcome to our ticketing system! We are excited to have you on board. If you have any questions or need assistance, feel free to reach out.
Best regards`;
        return await sendEmail(email, subject, text);
      });

      return { success: true };
    } catch (error) {
      // Handle error or rethrow
      throw error;
    }
  }
);