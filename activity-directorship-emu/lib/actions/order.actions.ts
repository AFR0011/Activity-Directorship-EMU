"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams } from "@/types" //I created this in the buttom of types
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import { getEventsByUser } from './event.actions';



export const checkoutOrder = async (order: CheckoutOrderParams) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const price = order.isFree ? 0 : Number(order.price) * 100; //Because I think stripe takes the price in cents
    try {
        
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                    currency: 'usd',
                    unit_amount: price,
                    product_data: {
                        name: order.eventTitle
                    }
                },
                quantity: 1
              },
            ],
            metadata: {
                eventId: order.eventId,
                buyerId: order.buyerId,
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
          });

          redirect(session.url!);
    } catch(e) {
        throw e;
    }
}

export const createOrder = async (order: CreateOrderParam) => {
    try {
        await connectToDatabase();
        
        const newOrder = await order.create({
            ...order,
            event: order.eventId,
            buyer: buyer.buyerId
        });

        return JSON.parse(JSON.stringify(newOrder))


    } catch (e) {
        handleError(e);
    }
}