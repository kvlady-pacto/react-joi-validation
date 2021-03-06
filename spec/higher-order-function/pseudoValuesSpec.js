import React from 'react';
import TestUtils from 'react-addons-test-utils';
import validate from '../../index'
import Joi from 'joi-browser';

import refreshComponentState from '../support/refreshComponentState';

import WrappedComponent from '../WrappedComponent';

validate.setJoi(Joi);

describe('higher order function when the pseudoValues option', function(){

  beforeEach(function() {
    this.refreshComponentState = refreshComponentState.bind(this);
    this.renderer = TestUtils.createRenderer();

    this.validator = function({ values }, callback) {
      callback({ values, errors: { starSign: 'is not valid' } });
    };
  });

  describe('is not specified', function(){

    describe('and a validator places an error on attribute not present in the object', function(){

      beforeEach(function () {
        this.ValidatedComponent = validate(WrappedComponent, { validator: this.validator });

        this.renderer.render(<this.ValidatedComponent />);
        this.refreshComponentState();
      });

      it('then does not include the error', function(){
        this.component.props.changeValue('birthday', '01/01/2001', { validate: true });

        this.refreshComponentState();

        expect(this.component.props.errors).toEqual({});
      });
     });
  });

  describe('is a string', function(){

    describe('and a validator places an error on attribute not present in the object', function(){
      beforeEach(function () {
        this.ValidatedComponent = validate(WrappedComponent, { pseudoValues: 'starSign', validator: this.validator });

        this.renderer.render(<this.ValidatedComponent />);
        this.refreshComponentState();
      });

      it('then includes the error', function(){
        this.component.props.changeValue('birthday', '01/01/2001', { validate: true });

        this.refreshComponentState();

        expect(this.component.props.errors).toEqual({ starSign: 'is not valid' });
      });

     });

  });

  describe('is an array', function(){

    describe('and a validator places an error on attribute not present in the object', function(){
      beforeEach(function () {
        this.ValidatedComponent = validate(WrappedComponent, { pseudoValues: ['starSign'], validator: this.validator });

        this.renderer.render(<this.ValidatedComponent />);
        this.refreshComponentState();
      });

      it('then includes the error', function(){
        this.component.props.changeValue('birthday', '01/01/2001', { validate: true });

        this.refreshComponentState();

        expect(this.component.props.errors).toEqual({ starSign: 'is not valid' });
      });

     });

  });

 });

