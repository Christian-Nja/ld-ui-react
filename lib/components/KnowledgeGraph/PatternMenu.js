'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = PatternMenu;

var _react = _interopRequireDefault(require('react'));

var _semanticUiReact = require('semantic-ui-react');

var _LayoutSelector = _interopRequireDefault(require('./LayoutSelector'));

var _InstancesButton = _interopRequireDefault(require('./InstancesButton'));

var _uri = require('../../utilities/uri');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var menuStyle = {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 10
};

function PatternMenu(props) {
    return /*#__PURE__*/_react['default'].createElement('div', {
        style: menuStyle
    }, /*#__PURE__*/_react['default'].createElement(_semanticUiReact.Menu, {
        vertical: true,
        inverted: true
    }, /*#__PURE__*/_react['default'].createElement(_LayoutSelector['default'], {
        value: props.layoutHandler.name,
        onClick: function onClick(newLayout) {
            props.layoutHandler.setLayout(newLayout);
        }
    }), props.selectedNodes ? /*#__PURE__*/_react['default'].createElement(_semanticUiReact.Menu.Item, null, 'Selected', /*#__PURE__*/_react['default'].createElement(_semanticUiReact.Menu.Menu, null, props.selectedNodes.map(function (selected, key) {
        return /*#__PURE__*/_react['default'].createElement(_semanticUiReact.Menu.Item, {
            key: key
        }, (0, _uri.getURILabel)(selected));
    }))) : null), props.selectedNodes ? /*#__PURE__*/_react['default'].createElement(_InstancesButton['default'], {
        getInstances: props.getInstances,
        selectedNodes: props.selectedNodes
    }) : null);
}