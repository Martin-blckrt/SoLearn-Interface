import '../styles/ResultsPage.css';

import React from "react";
import { useLocation } from 'react-router';
import { callPredictor } from '../components/misc/requests';
import Results from '../components/results/Results';
import Loading from '../components/results/Loading';

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const params = useLocation()
        return (
            <Component
                params={params.state}
                {...props}
            />
        );
    };
    
    return Wrapper;
  };

class ResultsPage extends React.Component {

    constructor(props){
        super(props);
        this.city_code = props.params.city_code;
        this.latitude = props.params.latitude;
        this.longitude = props.params.longitude;
        this.datas = null;
        this.state = {
            loading : true
        }
    }

    async componentDidMount(){
        try{
            const datas = await callPredictor(this.city_code, this.latitude, this.longitude);
            this.datas = JSON.parse(datas);
            console.log(this.datas);
        }catch(e){
            console.log(e);
        }
        this.setState({loading : false});
    }

    render(){
        return(
            <div>
            {!this.state.loading ?
                <Results datas={this.datas} city_name={this.props.params.city_name}></Results> 
            :
                <Loading></Loading>
            }  
            </div>     
        )
    }

}

export default withRouter(ResultsPage);
