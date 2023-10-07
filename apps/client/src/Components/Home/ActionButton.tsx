import { Container, Button, Link, lightColors, darkColors, Ic } from 'react-floating-action-button'
import {useNavigate} from 'react-router-dom';

export default function FAB(){
const navigate = useNavigate();

  return (
    <Container>
        <Button
        icon="fas fa-plus"
        rotate={true}
        onClick={() => {navigate("/report", {replace: true})}} 
        tooltip="Report a fire"
        styles={{backgroundColor: darkColors.lighterRed, color: lightColors.white}}    
        />
    </Container>
  )
}