import React from "react";
import PropTypes from "prop-types";

//stateless function component
const Header = (props) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

Header.propTypes = {
  tagline: PropTypes.string.isRequired
}
//class component
//class Header extends React.Component {
//  render() {
//    return (
//      <header className="top">
//       <h1>
//          Catch
//          <span class="ofThe">
//            <span class="of">of</span>
//            <span class="the">the</span>
//          </span>
//          Day
//        </h1>
//        <h3 className="tagline">
//          <span>{this.props.tagline}</span>
//        </h3>
//      </header>
//    );
//  }
//}

export default Header;
