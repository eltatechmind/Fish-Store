import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };

  // the reason why here it's static is because we're declaring the PropTypes for all of the fish
  //and every single time we make a new fish it's not necessery to duplicate those proptypes
  //to every single one if they're gonna be the same for every single component, so I put static
  //which lives in the mama fish component we are unnecessery copying those prototypes to every single
  //instance.

  static propTypes = {
    //shape is a function that accept an object, where we specify what are all difference properties are
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string
    }),
    addToOrder: PropTypes.func
  };

  render() {
    //const {name, image} = Object.keys(this.props.details).map(key => this.props.details[key]);
    const { image, name, price, desc, status } = this.props.details;
    //const image = this.props.details.image;
    //const name = this.props.details.name;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add To Order" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
