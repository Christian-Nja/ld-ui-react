'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = InstancesButton;

var _react = _interopRequireDefault(require('react'));

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function InstancesButton(props) {
    return /*#__PURE__*/_react['default'].createElement(_semanticUiReact.Button, {
        icon: true,
        labelPosition: 'left',
        onClick: function onClick() {
            props.getInstances(props.selectedNodes);
        }
    }, /*#__PURE__*/_react['default'].createElement(_semanticUiReact.Icon, {
        name: 'world'
    }), 'Explore Instances');
}