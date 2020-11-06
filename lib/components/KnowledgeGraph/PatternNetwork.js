'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _graphin = _interopRequireWildcard(require('@antv/graphin'));

require('@antv/graphin/dist/index.css');

require('./PatternNetwork.css');

var _Graph = _interopRequireDefault(require('../classes/Graph'));

var _ldUiHooks = require('../hooks/ld-ui-hooks');

var _uri = require('../../utilities/uri');

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Don't forget to import css

/**
 * css
 */
//# define CONSTANTS
var SUB_PATTERN = 'subPattern';
var SUPER_PATTERN = 'pattern'; // globals

var containerID = 'graph-container';
var specializationEdgeColor = '#000';
var compositionEdgeColor = '#000';

function PatternNetwork(props) {
    var _useWindowDimensions = (0, _ldUiHooks.useWindowDimensions)(),
        height = _useWindowDimensions.height,
        width = _useWindowDimensions.width;

    var containerStyle = {
        height: height * 80 / 100,
        // 80%
        width: width
    };
    var graph = new _Graph['default']();

    if (props.patterns.patternSpecializations) {
        graph.addRelations(props.patterns.patternSpecializations, _Graph['default'].relType.SUB, 'CircleNode', 24);
    }

    if (graph.toJson()) {
        return /*#__PURE__*/_react['default'].createElement(_graphin['default'], {
            data: graph.toJson()
        });
    }
}

var _default = PatternNetwork;
exports['default'] = _default;