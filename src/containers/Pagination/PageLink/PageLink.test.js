import React from 'react';
import ReactDOM from 'react-dom';
import PageLink from './PageLink';
import { BrowserRouter } from 'react-router-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';
Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const element = document.createElement('ul');
  ReactDOM.render(
  <BrowserRouter>
    <ul>
      <PageLink pageNumber="2"/>
      <PageLink goToLast="true" pageNumber="100"/>
      <PageLink goToFirst="true" pageNumber="100"/>
    </ul>
  </BrowserRouter>,
  element);
  ReactDOM.unmountComponentAtNode(element);
});

// it('calls onClick event on click of a board square', () =>{
//   const onClick = jest.fn();
//   let wrapper = mount(
//     <BrowserRouter>
//       <ul>
//         <PageLink pageNumber="2"/>
//         <PageLink goToLast="true" pageNumber="100"/>
//         <PageLink goToFirst="true" pageNumber="100"/>
//       </ul>
//     </BrowserRouter>
//   );
//   wrapper.find('li').first().simulate('click');
//   expect(onClick).toBeCalledWith(0)
// })

// const testProps = props => ({
//   data: {
//     allLeads: [
//       {id: 1, name: 'John Doe'},
//       {id: 2, name: 'Jane Doe'}
//     ],
//     loading: false,
//   },
//   navigation: jest.fn((options, callback) => callback('Details', 1)),
//   ...props,
// })

// describe('interactions', () => {
//   let props
//   let wrapper
//   beforeEach(() => {
//     props = testProps()
//     wrapper = shallow(<PageLink {...props} />)
//   })
//   it('Press pagination link', () => {
//     const spy = jest.spyOn(navigation, 'navigate')
//     const wrapper = shallow(
//       <PageLink
//         navigation={navigation}
//         error={{}}
//         onLogin={jest.fn()}
//       />,
//     )
//     const forgotButton = wrapper.find('Button').at(0)
//     forgotButton.props().onPress()

//     expect(spy).toBeCalledWith('ForgotPassword')
//   })
// })

