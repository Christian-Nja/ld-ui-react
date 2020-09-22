'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = Entity;

var _react = _interopRequireDefault(require('react'));

var _config = _interopRequireDefault(require('./config'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var NO_MESSAGE = '';

function Entity(props) {
    return /*#__PURE__*/_react['default'].createElement('article', {
        className: 'entity-container'
    }, /*#__PURE__*/_react['default'].createElement('div', {
        className: 'entity-content'
    }, props.entity.depiction ? /*#__PURE__*/_react['default'].createElement('figure', null, /*#__PURE__*/_react['default'].createElement('img', {
        src: props.entity.depiction,
        className: 'entity-image'
    })) : /*#__PURE__*/_react['default'].createElement(_config['default'].ITEM_ICON, {
        message: NO_MESSAGE,
        iconClassName: 'collectionIcon',
        descriptionClassName: 'descriptionIcon'
    }), /*#__PURE__*/_react['default'].createElement('div', null, props.entity.entityLabel)));
}