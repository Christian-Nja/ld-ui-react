'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _leafletIcon = _interopRequireDefault(require('../functions/leafletIcon'));

var _LeafletIconParams = _interopRequireDefault(require('../classes/LeafletIconParams'));

var _blackArrowheadPointingUpSvg = _interopRequireDefault(require('../uri-encoded-icons/black-arrowhead-pointing-up.svg.uri'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var blackArrowHeadIconParams = new _LeafletIconParams['default']({
    iconUrl: _blackArrowheadPointingUpSvg['default'],
    className: 'ld-ui-div-icon',
    iconAnchor: [15, 50],
    popupAnchor: [0, -50]
});
var blackArrowHeadIcon = (0, _leafletIcon['default'])(blackArrowHeadIconParams);
var _default = blackArrowHeadIcon;
exports['default'] = _default;