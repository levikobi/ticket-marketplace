import { ExpirationCompleteEvent, Publisher, Subjects } from "@ticket-marketplace/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}
