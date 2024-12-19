import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {deleteCustomer} from "../service/CustomerClient.ts";
import {PATHS} from "../constants/routes.ts";

function Header(props: Readonly<{ id: number }>) {
    const navigate = useNavigate();
    return (
        <header>
            <Link to='/' className="logoContainer">
                <img className="logo" src="/logo.png" alt=""/>
                <h1>Customer Management System</h1>
            </Link>
            {!props.id ?
                <Button type='submit' variant="contained" color='success'><Link
                    to='/create-customer'>Create</Link></Button>
                :
                <Button variant="contained" color='error' onClick={async () => {
                    const yes = window.confirm("Do you want delete this customer?")
                    if (yes) {
                        await deleteCustomer(props.id)
                        navigate(PATHS.HOME)
                    }
                }}>Delete</Button>
            }
        </header>
    );
}

export default Header;
