import React from 'react';
import ReactDOM from 'react-dom/client';
import './app_styles.css';

class Teleprompter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      direction: 0,
      speed: 1
    };
  }

  render() {
    return (
      <div id="app">
        <button id="forward" >FORWARD</button>
        <button id="backward" >BACKWARD</button>
        <button id="mode" >MODE</button>
        <div id="slide" style={{top: this.state.position}} >
          <p id="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In 
          iaculis nunc sed augue lacus viverra vitae. Facilisis mauris sit 
          amet massa vitae tortor condimentum lacinia quis. Turpis egestas 
          pretium aenean pharetra magna. Posuere morbi leo urna molestie at. 
          Non curabitur gravida arcu ac tortor dignissim. Lectus urna duis 
          convallis convallis tellus id interdum velit. Sagittis nisl rhoncus 
          mattis rhoncus urna neque viverra. Odio facilisis mauris sit amet 
          massa vitae. Enim ut sem viverra aliquet. Ipsum nunc aliquet bibendum
          enim facilisis. Eu ultrices vitae auctor eu augue ut lectus arcu. Hac
          habitasse platea dictumst quisque. Mus mauris vitae ultricies leo 
          integer malesuada nunc vel. Eget nunc lobortis mattis aliquam 
          faucibus purus in massa. Pellentesque nec nam aliquam sem et 
          tortor consequat id.

          Augue ut lectus arcu bibendum at varius vel. Et sollicitudin ac orci
          phasellus egestas tellus rutrum tellus pellentesque. Sed pulvinar 
          proin gravida hendrerit lectus a. Ultrices vitae auctor eu augue ut. 
          Sed libero enim sed faucibus turpis. Convallis tellus id interdum 
          velit laoreet. Facilisis magna etiam tempor orci eu lobortis 
          elementum nibh tellus. Fusce id velit ut tortor pretium viverra. 
          Convallis tellus id interdum velit laoreet. Justo donec enim diam 
          vulputate ut pharetra sit. Commodo elit at imperdiet dui. Elit ut 
          aliquam purus sit amet luctus venenatis lectus.

          At tellus at urna condimentum mattis pellentesque id nibh. Pharetra 
          diam sit amet nisl suscipit adipiscing. Sapien nec sagittis aliquam 
          malesuada bibendum arcu. A pellentesque sit amet porttitor eget 
          dolor morbi. Risus commodo viverra maecenas accumsan lacus. Nulla 
          facilisi morbi tempus iaculis urna id volutpat lacus. Auctor neque 
          vitae tempus quam pellentesque nec nam aliquam. Est sit amet 
          facilisis magna etiam. Habitasse platea dictumst quisque sagittis 
          purus sit. Adipiscing bibendum est ultricies integer quis auctor 
          elit sed vulputate. Feugiat in ante metus dictum at tempor. Aliquam 
          ut porttitor leo a diam sollicitudin tempor id. Nulla facilisi cras 
          fermentum odio eu. Sit amet consectetur adipiscing elit pellentesque 
          habitant. Semper risus in hendrerit gravida rutrum quisque non 
          tellus. Porttitor lacus luctus accumsan tortor posuere ac ut 
          consequat semper. Porttitor eget dolor morbi non arcu. Eros in 
          cursus turpis massa tincidunt dui ut. Imperdiet proin fermentum leo 
          vel. Sollicitudin nibh sit amet commodo nulla.
          </p>
        </div>
      </div>
    );
  }
}

const container = ReactDOM.createRoot(document.getElementById('app-container'));
container.render(<Teleprompter/>);