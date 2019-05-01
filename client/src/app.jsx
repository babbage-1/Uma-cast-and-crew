import React from 'react';
// import styled from 'styled-components';
import Carousel from './carousel.jsx';



// === STYLES === //

const Wrapper = window.styled.section`
  background: #eaeaea;
`;

// === DEFINE APP === //

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: 1,
      // urlID: parseInt(window.location.href.split('/')[3]),
      title: '2001: A SPACE ODYSSEY',
      cast: []
    };
  }

  // === ATTEMPTING TO GET MOVIE BY ID OR NAME FROM URL === //

  // setLookUp() {
  //   const pathname = window.location.pathname;
  //   const lookup = pathname.slice(1);
  //   console.log(lookup);
  //   if (isNaN(lookup)) {
  //     this.setState({
  //       title: lookup
  //     });
  //   } else {
  //     this.setState({
  //       movieId: Number(lookup)
  //     });
  //   }
  // }

  // === GET CAST MEMBERS BASED ON MOVIE ID === //


  getCast() {
    let idRoute = window.location.pathname;
    const host = window.location.origin;
    // let parsedId = Number(idRoute.split('').filter(char => char !== '/').join(''));
    const idArray = window.location.pathname.split("/");
    console.log(idArray);
    const idIndex = idArray.length - 2
    const idRouteModified = idArray[idIndex];
    console.log('THE MODIFIED ID I"M GOIN TO USE WORK DAMMIT', idRouteModified);
    // console.log('parseId in GET actors', parsedId);
    fetch(`${host}/actors/${idRouteModified || 1}`)
      .then(res => res.json())
      .then(castInfo => {
        console.log('cast info: ', castInfo);
        this.setState({
          cast: castInfo
        });
      }
      )
      .catch(err => {
        console.log(`getCast error: `, err);
      });
  }

  // === GET CAST MEMBERS BASED ON COMPONENT MOUNT === //

  componentDidMount() {
    this.getCast();
  }

  // === RENDER LIST OF CAST MEMBERS (for testing purposes) === //

  render() {
    return (
      <Wrapper>
        <Carousel castInfo={this.state.cast} title={this.state.title}/>
      </Wrapper>
    );
  }
}

export default App;