'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _leafletIcon = _interopRequireDefault(require('../functions/leafletIcon'));

var _LeafletIconParams = _interopRequireDefault(require('../classes/LeafletIconParams'));

require('../icon.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

//import iconUrl from ;
var locationIconParams = new _LeafletIconParams['default']({
    iconUrl: require('../images/fluo-marker.png'),
    iconRetinaUrl: require('../images/fluo-marker.png'),
    iconWidth: 60,
    iconHeight: 75,
    className: 'ld-ui-div-icon'
});
var locationIcon = (0, _leafletIcon['default'])(locationIconParams);
var _default = locationIcon;
exports['default'] = _default;