'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = PatternNetwork;

var _react = _interopRequireDefault(require('react'));

require('@antv/graphin/dist/index.css');

require('./PatternNetwork.css');

var _generics = require('../../utilities/generics');

var _Patterns = _interopRequireDefault(require('./Patterns'));

var _PatternInstances = _interopRequireDefault(require('./PatternInstances'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Don't forget to import css

/**
 * css
 */
function PatternNetwork(props) {
    var specializations = (0, _generics.defineProp)(props.patterns.specializations, []);
    var compositions = (0, _generics.defineProp)(props.patterns.compositions, []);
    var instances = (0, _generics.defineProp)(props.patterns.instances, null);
    return /*#__PURE__*/_react['default'].createElement('div', null, instances ? /*#__PURE__*/_react['default'].createElement(_PatternInstances['default'], {
        instances: instances,
        graphContainerStyle: graphContainerStyle
    }) : /*#__PURE__*/_react['default'].createElement(_Patterns['default'], {
        getInstances: props.getInstances,
        graphContainerStyle: graphContainerStyle,
        specializations: specializations,
        compositions: compositions
    }));
}

var graphContainerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto'
};