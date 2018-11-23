import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  // you could assume that the props.match is coming in from router, so we assume it's an object
  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    // set constant object with value of this.props.match.
    const { params } = this.props.match;
    // first reinstate our localstorage.
    //getting from the localstorage after refresh the item value with key
    //equals to params.storeId which is the store name.
    const localStorageRef = window.localStorage.getItem(params.storeId);
    // print it.
    //console.log(localStorageRef);
    // if there's a value for the store id key in the localstorage then set the
    //order state to it's value after converting it back to object from the
    //string that is stored in the localstorage.
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // store reference to database in this.ref for firebase purpose.
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    // console log the order state currently now.
    //console.log(this.state.order);
    // store the store name and the value of of it's order after converting it
    //from object to string to be able to store it in the localstorage.
    window.localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. take a copy of the existing state.
    const fishes = { ...this.state.fishes };
    // 2. add new fishes to that fishes variable.
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state.
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    //1. take a copy of the current state
    const fishes = { ...this.state.fishes };
    //2. update that state
    fishes[key] = updatedFish;
    //3. set that to state
    this.setState({ fishes: fishes });
  };

  deleteFish = key => {
    // 1. take a copy of the state
    const fishes = { ...this.state.fishes };
    // 2. update the state  (you can't use delete with firebase, if you want to delete it from firebase you have to set the object property to null)
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. take a copy of state.
    const order = { ...this.state.order };
    // 2. either add to the order or, or update the number in our order.
    order[key] = order[key] + 1 || 1;
    // 3. call setstate to update our state object.
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. take a copy of state.
    const order = { ...this.state.order };
    // 2. remove that item from order (this time since we are not referencing to firebase and we're using the localstorage for orders, we can use delete comfortably)
    delete order[key];
    // 3. call setstate to update our state object.
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
            {/* object.keys will find the keys of all objects, then put them in 
            an array, map calls a provided callback function once for each 
            element in an array, in order, and constructs a new array from the 
            results. callback is invoked only for indexes of the array which 
            have assigned values, including undefined. */}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
