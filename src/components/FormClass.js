import React, {Component} from 'react';

class FormClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  changeState = () => {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return (
        <div>
          <div className="form-class">
            <h1>FORM TEST CLASS {this.state.count}</h1>
            <button onClick={this.changeState}>Клик
            </button>
            <h2>Вы передали: {this.props.name}</h2>
          </div>
        </div>
    );
  }
}

export default FormClass;
