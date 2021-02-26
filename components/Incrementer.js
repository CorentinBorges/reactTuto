Incrementer.defaultProps ={
    start: 0,
    step: 1,
}

export default class Incrementer extends React.Component{
    constructor (props){
        super(props);
        this.state={
            number: props.start, 
            timer: null, 
            button: <button onClick={this.stopIncrement.bind(this)}>Pause</button>};
    }

    componentDidMount(){
        this.playIncrement();
    }

    componentWillUnmount(){
        window.clearInterval(this.state.timer)
    }

    increment(){
        this.setState((state,props) => ({number: state.number + props.step}))
    }

    stopIncrement(){
        window.clearInterval(this.state.timer)
        this.setState({
            timer: null,
            button: <button onClick={this.playIncrement.bind(this)}>Play</button>
        })
    }
    playIncrement(){
        window.clearInterval(this.state.timer)
        this.setState({
            timer: window.setInterval(this.increment.bind(this), 1000),
            button: <button onClick={this.stopIncrement.bind(this)}>Pause</button>
        })
    }

    reset(){
        this.stopIncrement();
        this.playIncrement();
        this.setState((state, props) => ({number: props.start}))
    }

    render() {
        return <div>
            <p>le nombre est {this.state.number}</p>
            {this.state.button}
            <button onClick={this.reset.bind(this)}>Reset</button>
        </div>
    }
}