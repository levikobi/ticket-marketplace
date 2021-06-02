import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async (done) => {
    const ticket = Ticket.build({
        title: "concert",
        price: 5,
        userId: global.generateId(),
    });
    await ticket.save();

    const instance1 = await Ticket.findById(ticket.id);
    const instance2 = await Ticket.findById(ticket.id);

    instance1!.set({ price: 10 });
    instance2!.set({ price: 15 });

    await instance1!.save();
    try {
        await instance2!.save();
    } catch (err) {
        return done();
    }

    throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
    const ticket = Ticket.build({
        title: "concert",
        price: 5,
        userId: global.generateId(),
    });
    await ticket.save();
    expect(ticket.version).toEqual(0);

    await ticket.save();
    expect(ticket.version).toEqual(1);

    await ticket.save();
    expect(ticket.version).toEqual(2);
});
