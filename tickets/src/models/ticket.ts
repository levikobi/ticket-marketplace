import mongoose from "mongoose";

interface TicketAttributes {
    title: string;
    price: number;
    userId: string;
}

interface TicketDocument extends TicketAttributes, mongoose.Document {}

interface TicketModel extends mongoose.Model<TicketDocument> {
    build(attributes: TicketAttributes): TicketModel;
}
