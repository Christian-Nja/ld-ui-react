'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.DEFAULT_CONFIG = exports.themes = exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ldUiIcon = require('../../icon/ld-ui-icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DEFAULT_CONFIG = 'config1';
exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
var themes = {
    config1: {
        itemIcon: _ldUiIcon.BlackDotIcon,
        style: {
            collectionLabel: {
                color: 'black',
                fontSize: 20,
                textAlign: 'center'
            },
            collectionContainer: {
                borderRadius: '9px/8px',
                width: '40%',
                border: '1px solid rgba(0,0,0,0.15)',
                gridGap: 10
            },
            entityImage: {
                width: 60,
                height: 60
            },
            entityLabel: {
                color: 'black'
            },
            entityContent: {
                color: 'black'
            }
        }
    },
    config2: {
        itemIcon: _ldUiIcon.EmptyDotIcon,
        style: {
            collectionLabel: {
                color: 'black',
                fontSize: 20,
                textAlign: 'center'
            },
            collectionContainer: {
                borderRadius: '9px/8px',
                width: '60%',
                border: '1px solid rgba(0,0,0,0.15)',
                gridGap: '55px',
                padding: '50px'
            },
            entityImage: {
                width: 120,
                height: 120
            },
            entityLabel: {
                color: 'black'
            },
            entityContent: {
                color: 'black'
            }
        }
    }
};
exports.themes = themes;

var ThemeContext = /*#__PURE__*/_react['default'].createContext(themes[DEFAULT_CONFIG]);

var _default = ThemeContext;
exports['default'] = _default;