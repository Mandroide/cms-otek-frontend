import {Box} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {deleteCustomer} from '../service/CustomerClient';
import {CustomerResponse} from "../models/CustomerModel.ts";
import {PATHS} from "../constants/routes.ts";

// eslint-disable-next-line react/prop-types
const OutlinedCard = (props: Readonly<{ customer: CustomerResponse }>) => {
    const customer = props.customer
    const navigate = useNavigate();
    return (
        <Box sx={{minWidth: 275}}>
            <Card variant="outlined" className='card'>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {customer.phone}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {customer.first_name} {customer.last_name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {customer.email}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {customer.birth_date}
                    </Typography>
                </CardContent>

                <CardActions className='cardBtns'>
                    <Button onClick={() => {
                        navigate(`${PATHS.CUSTOMERS}/${customer.id}`)
                    }} variant="contained" color='success'>Edit Customer</Button>
                    <Button variant="contained" color='error' onClick={async () => {
                        const yes = window.confirm("Do you want delete this customer?")
                        if (yes) {
                            await deleteCustomer(customer.id)
                            navigate(PATHS.HOME)
                        }
                    }}>Delete Customer</Button>
                </CardActions>

            </Card>
        </Box>
    )

}

export default OutlinedCard

