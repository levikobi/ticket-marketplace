import { Publisher, Subjects, TicketUpdatedEvent } from "@ticket-marketplace/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
