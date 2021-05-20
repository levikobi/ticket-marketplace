import { useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/use-request";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/users/register", { email, password });
            console.log(response.data);
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Register</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>
            {/* {errors.length > 0 && (

            )} */}
            <button className="btn btn-primary">Register</button>
        </form>
    );
}
