import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

/**
 * @description Mocks the browser localStorage implementation
 */
class LocalStorageMock {
  store = {};

  /**
   * @description Mocks the clear method
   * @returns {null}
   */
  clear = () => {
    this.store = {};
  };

  /**
   * @description Mocks the getItem method
   * @param {String} name The name of the object to be retrieved
   * @returns {null}
   */
  getItem = name => (this.store[name] || null);

  /**
   * @description Mocks the setItem method
   * @param {String} name The name of the object to be set
   * @param {Object} value The object to be set
   * @returns {null}
   */
  setItem = (name, value) => {
    this.store[name] = value.toString() || 'undefined';
  };

  /**
   * @description Mocks the removeItem method
   * @param {String} name The name of the object to be removed
   * @returns {null}
   */
  removeItem = (name) => {
    delete this.state[name];
  };
}

global.localStorage = new LocalStorageMock();
