import { Publisher, OrderCancelledEvent, Subjects } from "@ticket-marketplace/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}
