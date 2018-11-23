import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  //listen on page refresh
  componentDidMount() {
    //firebase will see if we actually logged in and authenticated, and if that is true
    //it will going to pass us a user which we can in turn just pass to authhandler, which will again going to do all the checks and so on...
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    //1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    //console.log(store);
    //2. claim it if there is no owner
    if (!store.owner) {
      //save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    //3.  set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
    console.log(authData);
  };

  authenticate = provider => {
    //since it's dynamic I will use square bracket to reference the rest of the code
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('logging out!');
    await firebase.auth().signOut();
    this.setState({ uid: null});
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    //1. check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    //2. check if the are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!!</p>
          {logout}
        </div>
      );
    }

    //3. they must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
