import { useState } from 'react';
import ReactDOM from "react-dom/client";
function RegistrationForm(){
    const [inputs, setInputs] = useState({});

    const handleChange=(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handelSubmit =(event)=>{
        event.preventDefault();
        alert(inputs);
    }

    return(
        <form onSubmit={handelSubmit}>
            <label>Username:
                <input
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Password:
                <input
                    type="text"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Contact No :
                <input
                    type="text"
                    name="contactno"
                    value={inputs.contactno || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Name:
                <input
                    type="text"
                    name="name"
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
            </label>
            <input type="submit"/>
        </form>
    )
}
const root= ReactDOM.createRoot(document.getElementById('root'));
root.render(<RegistrationForm/>);