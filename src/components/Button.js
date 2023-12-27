import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}
      >
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}
export default Button;
