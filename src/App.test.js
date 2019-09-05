import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

Enzyme.configure({adapter:new EnzymeAdapter()})



/**
  * factory function to create a shallow wrapper for the App component
  * @function setup
  * @param {object} props - component props specific to this setup
  * @param {object} state - initial state for this setup
  * @returns {shallowWrapper}
*/
const setup = (props, state) => {
  const wrapper = shallow(<App {...props} />)
  state && wrapper.setState(state)

  return wrapper
}

/**
 * return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enxyme shallow wrapper to seach within.
 * @param {string} val - Vaue of data-test attribute for search
 */
const findByTestAttr = (wrapper, val)=> {
  return wrapper.find(`[data-test='${val}']`)
}

// Tests
test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
});

test ('renders increment button', ()=>{
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test ('renders counter display', ()=>{
  const wrapper = setup()
  const counter = findByTestAttr(wrapper, 'counter-display')
  expect(counter.length).toBe(1)
})

test ('counter starts at 0', ()=>{
  const wrapper = setup()
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0)
})

test ('clicking button increments counter in display', ()=>{
  const counter = 7
  const wrapper = setup(null, {counter})
  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')
  wrapper.update()

  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter + 1)
})

test ('clicking decrement button decrements counter in display', ()=>{
  const counter = 7
  const wrapper = setup(null, {counter})
  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')
  wrapper.update()

  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(counter - 1)
})

test ('app generates an error if decrement tries to go below zero', ()=>{
  const counter = 0
  const wrapper = setup(null, {counter})
  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')
  wrapper.update()

  const errorMsg = findByTestAttr(wrapper, 'counter-error')
  expect(errorMsg.exists()).toEqual(true)
})

test ('error clears on increment', ()=>{
  const counter = 0
  const wrapper = setup(null, {counter})
  const d_button = findByTestAttr(wrapper, 'decrement-button')
  const i_button = findByTestAttr(wrapper, 'increment-button')

  // decrement the counter to generate the error message
  d_button.simulate('click')
  wrapper.update()

  // increment the counter to remove the error
  i_button.simulate('click')
  wrapper.update()

  // const counterError = findByTestAttr(wrapper, 'counter-error')
  const errorMsg = findByTestAttr(wrapper, 'counter-error')
  expect(errorMsg.exists()).toEqual(false)
}) 
