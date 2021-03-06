import React from 'react';
import TestUtils from 'react-addons-test-utils';
import validate from '../../index';

import Joi from 'joi-browser';

import refreshComponentState from '../support/refreshComponentState';

import WrappedComponent from '../WrappedComponent';

validate.setJoi(Joi);

describe('clearValidation', function(){
  const joiSchema = {
    a: Joi.string().required(),
    b: Joi.string().required()
  };

  beforeEach(function () {
    this.refreshComponentState = refreshComponentState.bind(this);
    this.renderer = TestUtils.createRenderer();

    this.ValidatedComponent = validate(WrappedComponent, { joiSchema });

    this.renderer.render(<this.ValidatedComponent />);
    this.refreshComponentState();
  });

  describe('when called with no arguments', function(){
    it('then clears all errors', function(){
      this.component.props.changeValue('a', 'a');
      this.component.props.changeValue('b', null);
      this.component.props.validateAll();

      this.refreshComponentState();

      expect(this.component.props.a).toEqual('a');
      expect(this.component.props.errors).toEqual({ b: 'must be a string' });

      this.component.props.clearValidation();

      this.refreshComponentState();

      expect(this.component.props.a).toEqual('a');
      expect(this.component.props.b).toEqual(null);
      expect(this.component.props.errors).toEqual({});
    });

  });

  describe('when called with a string', function(){
    it('then clears errors for the attribute mentioned in that string', function(){
      this.component.props.changeValue('a', 'a');
      this.component.props.changeValue('b', null);
      this.component.props.validateAll();

      this.refreshComponentState();

      expect(this.component.props.a).toEqual('a');
      expect(this.component.props.errors).toEqual({ b: 'must be a string' });

      this.component.props.clearValidation('b');

      this.refreshComponentState();

      expect(this.component.props.a).toEqual('a');
      expect(this.component.props.b).toEqual(null);
      expect(this.component.props.errors).toEqual({ });
    });

  });

  describe('when called with an array string', function(){
    it('then clears errors and values for the attributes mentioned in the array', function(){
      this.component.props.changeValue('a', 'a');
      this.component.props.changeValue('b', null);
      this.component.props.validateAll();

      this.refreshComponentState();

      expect(this.component.props.a).toEqual('a');
      expect(this.component.props.errors).toEqual({ b: 'must be a string' });

      this.component.props.clearValidation(['b']);

      this.refreshComponentState();

      expect(this.component.props.a).toEqual('a');
      expect(this.component.props.b).toEqual(null);
      expect(this.component.props.errors).toEqual({ });
    });

  });
});
