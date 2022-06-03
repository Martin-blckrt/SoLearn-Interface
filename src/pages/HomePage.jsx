import '../styles/HomePage.css';

import Header from "../components/header";
import { Container } from '@mui/material';

function HomePage() {
    return (
        <div>
            <Header/>
            <Container sx={{
                display : "flex",
                flexDirection : "column",
                justifyContent : "space-between",
                alignItems : "center"
            }}>
                <img scr="./solar_panel_field.jpg" alt="solar panel field"></img>
                
            </Container>
        </div>
    );
}

export default HomePage;
