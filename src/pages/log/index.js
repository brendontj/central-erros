import React, {Component} from 'react';
import Header from '../../components/Header';
import Detail from '../../components/Detail';
import { withRouter } from 'react-router-dom';

class Log extends Component {

    
    render() {
        return (
            <React.Fragment>
                <Header />
                <Detail {...this.props}/>
            </React.Fragment>
        );
    }
}

export default withRouter(Log);