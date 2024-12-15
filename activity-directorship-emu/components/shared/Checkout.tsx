import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { checkoutOrder } from "@/lib/actions/order.actions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  const onCheckout = async () => {
    setLoading(true); // Disable button while processing

    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    try {
      const redirectUrl = await checkoutOrder(order);

      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirect to Stripe checkout page
      } else {
        console.error("No redirect URL received from checkoutOrder.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false); // Re-enable button after the request
    }
  };

  return (
    <Button
      onClick={onCheckout}
      size="lg"
      className="button sm:w-fit"
      disabled={loading} // Disable button when processing
    >
      {loading ? "Processing..." : event.isFree ? "Get Ticket" : "Buy Ticket"}
    </Button>
  );
};

export default Checkout;
