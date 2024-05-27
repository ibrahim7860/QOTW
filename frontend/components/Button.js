import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

class Button extends Component {
  handlePress(e) {
    if (this.props.onPress && !this.props.disabled) {
      this.props.onPress(e);
    }
  }

  render() {
    const { style, children, disabled } = this.props;
    const combinedStyles = [style];
    if (disabled) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={combinedStyles}
        disabled={disabled}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
