import { PaymentCreatedEvent, Publisher, Subjects } from "@ticket-marketplace/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}
