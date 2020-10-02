declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');
var parseString = require('xml2js').parseString;


export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentWillMount() {
        request
            .get('http://localhost:3000/api/orders')
            .end((err, res) => {
                const orders = JSON.parse(res.text).orders;
                debugger;
                //const orders = res.body;
                this.setState({
                    orders: orders[0].order
                });
            });
    }

    render() {

        debugger;
        const orders = Object.keys(this.state.orders).map((key) => {
            return (
                <li key={key}>Order: Id: {this.state.orders[key].$.id} xlink:href {this.state.orders[key].$["xlink:href"]}</li>
            )
        })

        //var o = this.state.orders;
        
        return (
            <div>
                <h3>Ordenes Prestashop</h3>
                {orders}
            </div>
            
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));