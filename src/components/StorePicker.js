import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";
class StorePicker extends React.Component {
  constructor() {
    super(); // will construct the component instance first
    // will bind the goToStore this inside (this) as the StorePicker this
    //method.
    // functions like render are already binds to the react components so no need to bind them inside the constructor
    this.goToStore = this.goToStore.bind(this);
  }

  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object
  };

  //another solution is convert the new methods to arrow functions which
  //differ from regular function that there 'this' is pointing to the outer
  //surface which is the class instance
  goToStore2 = event => {
    // 1. stop the form from submitting.
    event.preventDefault();
    // 2. print the class (component) instance constant variable which is
    //myInput which store an object contain value property which was
    //referenced by 'ref' from the input tag.
    // .value.value to get the value property of the value object which is
    //a property of myInput object.
    // first .value is a react thing get us the input, while the other is
    //JS get us the value.
    //console.log(this.myInput.value.value);
    // 3. change the page to /store/whatever-they-entered.
    const store = this.myInput.current.value;
    this.props.history.push(`/store/${store}`);
  };

  goToStore(event) {
    //1. stop the form from submitting
    event.preventDefault();
    //2. print the class (component) instance constant variable which is myInput which store an object contain value property which was referenced by 'ref' from the input tag
    // .value.value to get the value property of the value object which is a property of myInput object
    //first .value is a react thing get us the input, while the other is JS get us the value
    console.log(this.myInput.value);
  }
  // since render is built in function to react component, it will work like the arrow function pointing it's this to the outer surface which is the component
  render() {
    return (
      <React.Fragment>
        <p>Fish!</p>
        <form className="store-selector" onSubmit={this.goToStore2}>
          {/* comment */}
          <h2>Please Enter a Store</h2>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store =></button>
        </form>
      </React.Fragment>
    );
  }
}

export default StorePicker;
