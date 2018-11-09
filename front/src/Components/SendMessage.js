import React, { Component } from "react";

export default class extends Component {
  state = {
    body: "",
  };

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  async submit(e) {
    e.preventDefault();

    await this.props.onCreate({ body: this.state.body });

    this.message.value = "";
  }

  render() {
    return (
      <form onSubmit={e => this.submit(e)} style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: '60px'
      }}>
        <input
          ref={m => {
            this.message = m;
          }}
          name="body"
          placeholder="body"
          onChange={e => this.handleChange("body", e)}
          className="message-input"
          style={{
            border: "none",
            borderTop: "1px solid #ddd",
            fontSize: "16px",
            padding: "30px",
            width: "100%",
          }}
        />
      </form>
    );
  }
}
