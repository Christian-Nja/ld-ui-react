'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Collection;

var _react = _interopRequireDefault(require('react'));

require('./Collection.css');

var _Entity = _interopRequireDefault(require('./Entity'));

var _config = _interopRequireDefault(require('./config'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * css
 */

/**
 * internal modules
 */
function Collection(props) {
    var style = props.style ? props.style : {
        collectionLabel: {
            color: 'black',
            fontSize: 20,
            textAlign: 'center'
        },
        collectionContainer: {
            borderRadius: _config['default'].style.borderRadius,
            width: _config['default'].style.containerWidth
        }
    };
    return /*#__PURE__*/_react['default'].createElement('div', null, /*#__PURE__*/_react['default'].createElement('h1', {
        style: style.collectionLabel
    }, props.entities[0].collectionLabel), /*#__PURE__*/_react['default'].createElement('section', {
        className: 'collection-container container',
        style: style.collectionContainer
    }, props.entities.map(function (entity, i) {
        return /*#__PURE__*/_react['default'].createElement(_Entity['default'], {
            entity: entity,
            key: i
        });
    })));
}