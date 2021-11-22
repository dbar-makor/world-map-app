import React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Map from './Map';

configure({ adapter: new Adapter() });

describe('<OrderBook>', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Map></Map>
    );
  });

  it('mounts without crashing', () => {
    wrapper.unmount();
  });
});