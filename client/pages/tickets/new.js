const NewTicket = () => {
    return (
        <>
            <h1>Create a Ticket</h1>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default NewTicket;
