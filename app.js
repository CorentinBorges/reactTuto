
function WelcomeFunc ({name, children}){
    return <div>
            <h1>Bonjour {name}</h1>
            <p>{children}</p>
        </div>
}

class Welcome extends React.Component{
    render() {
        return <div>
            <h1>Bonjour {this.props.name}</h1>
            <p>{this.props.children}</p>
        </div>
    }
}

class Clock extends React.Component{

    constructor (props){
        super(props);
        this.state = {date: new Date()}
        this.timer = null;
    }
//Avant qu'un composant soit monté
    componentDidMount(){
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }
//Avant qu'un composant soit démonté
    componentWillUnmount(){
        window.clearInterval(this.timer)
    }

    tick(){
        this.setState({date: new Date()})
    }

    render() {
        const date= new Date();
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Incrementer extends React.Component{
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

Incrementer.defaultProps ={
    start: 0,
    step: 1,
}

class ManualIncrementer extends React.Component{

    constructor(props){
        super(props),
        this.state = {n: 0}
    }

    render(){
        return <div>Valeur: {this.state.n} <button onClick={this.increment.bind(this)}>Incrémenter</button></div>
    }

    increment(){
        this.setState((state,props) => ({n: state.n + 1}))
    }
}

function Home(){
    return <div>
        <Welcome name = "Dorothé"/>
        <Welcome name = "Jean" />
        <Incrementer />
    </div>
}


class Home2 extends React.Component{
    constructor (props) {
        super(props),
        this.state=  {
            nom: 'Jean',
            sel: ['demo2', 'demo1'],
            checked: true
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleChangeSel=this.handleChangeSel.bind(this);
        this.handleChangeCheck=this.handleChangeCheck.bind(this);
    }

    handleChange(e){
        this.setState({nom: e.target.value})
    }

    handleChangeSel(e){
        this.setState({
            sel: Array.from(e.target.selectedOptions).map(o => o.value)
        })
    }

    handleChangeCheck(e){
        this.setState({
            checked: e.target.checked
        })
    }

    render() {
        return <div>
            <label htmlFor="nom">Mon nom</label>
            <textarea type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange} ></textarea>
            <p>{this.state.nom}</p>
            <select value={this.state.sel} onChange={this.handleChangeSel} multiple>
                <option value="demo1">Demo 1</option>
                <option value="demo2">Demo 2</option>
                <option value="demo3">Demo 3</option>
            </select>
            <p>Afficher values selected: {JSON.stringify(this.state.sel)}</p>
            <label htmlFor="check">Checked ?</label>
            <input type="checkbox" id="check" checked={this.state.checked} onChange={this.handleChangeCheck}></input>
           { this.state.checked ? <div> Un message affiché si je coche la checkbox</div> : null}
        </div>
    }
}


function Field({name, value, onChange, children}){
        return <div className="form-group">
            <label htmlFor={name}>{children}</label>
            <input type="text" onChange={onChange} id={name} className="form-control" name={name} value={value}  />
        </div>
}

function Checkbox({name, value, onChange, children}){
    return <div className="form-check">
        <input type="checkbox" onChange={onChange} id={name} className="form-check-input" name={name} checked={value}  />
        <label htmlFor={name} className="form-check-label">{children}</label>
    </div>
}

class Home3 extends React.Component{

    constructor (props) {
        super(props),
        this.state=  {
            nom: '',
            prenom: '',
            newsletter: false
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    handleChange(e){
        const name= e.target.name;
        const type=e.target.type;
        const value= type === 'checkbox' ? e.target.checked :  e.target.value

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const data= JSON.stringify(this.state)
        console.log(data)
    }
    render(){
        return <form className="container"  onSubmit={this.handleSubmit}>
                <Field name="nom" value={this.state.nom} onChange={this.handleChange} >Nom</Field>
                <Field name="prenom" value={this.state.prenom} onChange={this.handleChange} >Prénom</Field>
                <Checkbox name="newletter" value={this.state.newsletter} onChange={this.handleChange} >S'abonner à la newletter </Checkbox>
                <div className="form-group">
                    <button className="btn btn-primary">Envoyer</button>
                </div>
            </form>
    }
}

ReactDOM.render(<Home3 />, document.querySelector('#app'))

