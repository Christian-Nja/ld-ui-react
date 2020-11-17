'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Collection;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

require('./Collection.css');

var _Entity = _interopRequireDefault(require('./Entity'));

var _config = _interopRequireWildcard(require('./config'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * A component to show a collection of items
 *
 * @component
 * @example
 * const collections = []
 * return <Collection collections={collections}>
 */
function Collection(props) {
    var THEME = (0, _react.useContext)(_config['default']);
    return /*#__PURE__*/_react['default'].createElement(_config['default'].Provider, {
        value: _config.themes[_config.DEFAULT_CONFIG]
    }, /*#__PURE__*/_react['default'].createElement('div', null, /*#__PURE__*/_react['default'].createElement('section', {
        className: 'collection-container container '.concat(props['class'].collectionContainer),
        style: THEME.style.collectionContainer
    }, props.entities.map(function (entity, i) {
        return /*#__PURE__*/_react['default'].createElement(_Entity['default'], {
            entity: entity,
            key: i,
            'class': props['class']
        });
    }))));
}

Collection.propTypes = {
    // List of class to custom style the component
    'class': _propTypes['default'].object.isRequired
};
Collection.defaultProps = {
    'class': {
        collectionLabel: '',
        collectionContainer: '',
        entityImage: '',
        entityLabel: '',
        entityContent: ''
    }
}; // * description A component to show a collection of objects
// * author Christian Colonna
// * date 09-11-2020
// * export