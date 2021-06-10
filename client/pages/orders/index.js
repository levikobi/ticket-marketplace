const OrderIndex = ({ orders }) => {
    return (
        <url>
            {orders.map((order) => (
                <li key={order.id}>
                    {order.ticket.title} - {order.status}
                </li>
            ))}
        </url>
    );
};

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get("/api/orders");

    return { orders: data };
};

export default OrderIndex;
