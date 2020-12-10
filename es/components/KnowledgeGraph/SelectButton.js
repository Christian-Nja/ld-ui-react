"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectButton;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function SelectButton(props) {
  var style = {
    backgroundColor: 'black',
    border: '2px solid',
    borderColor: props.active ? 'red' : 'green',
    color: 'white',
    borderRadius: 7,
    padding: 8
  };
  var label = props.active ? 'unselect' : 'select';
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style
  }, label);
}