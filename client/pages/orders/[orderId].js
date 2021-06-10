import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    const { doRequest, errors } = useRequest({
        url: "/api/payments",
        method: "post",
        body: {
            orderId: order.id,
        },
        onSuccess: (payment) => console.log(payment),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    return timeLeft < 0 ? (
        <div>Order Expired</div>
    ) : (
        <>
            Time left to pay: {timeLeft} seconds
            <StripeCheckout
                token={({ id }) => doRequest({ token: id })}
                stripeKey="pk_test_51IzwnUHINs3Q9xjORH6rzlRfACusTKDKaBWlYkWpPrGCRcv9I1I0ElvZQ59bw3oNU2nfSgqOc06XTEklXozIGXT500Nf1TwkNq"
                amount={order.ticket.price * 100}
                email={currentUser.email}
            />
            {errors}
        </>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};

export default OrderShow;