import React, {Component} from 'react';

class Organisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: ''
    };
  }

  componentDidMount() {
    fetch("/api/ice/organisation/1")
      .then(res => res.text()) //NEVER USE res.json if not JSON RESPONSE
      .then(
        (result) => {
        	console.log(result);
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        	console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      	<div>
      		{data}
      	</div>
      );
    }
  }
}

export default Organisation;