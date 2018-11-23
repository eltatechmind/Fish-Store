import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {

  static proptypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
  };

  handleChange = event => {
    //console log the new value edited in the boxes
    //console.log(event.currentTarget.value);
    // update that fish
    // 1. take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      // use computed property names where name will refer to which input was
      //updated, then will print it
      [event.currentTarget.name]: event.currentTarget.value
    };
    //console.log(updatedFish);
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      // we use name here in the inputs for knowing which item was updated using
      //the onchange event and handle change function.
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
