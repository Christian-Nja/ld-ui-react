'use strict';

function _typeof(obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require('react'));

var _reactDom = _interopRequireDefault(require('react-dom'));

var _graphin = _interopRequireWildcard(require('@antv/graphin'));

var _graphinComponents = require('@antv/graphin-components');

var _antd = require('antd');

require('@antv/graphin/dist/index.css');

require('@antv/graphin-components/dist/index.css');

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { 'default': obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj['default'] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }

function _iterableToArray(iter) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError('Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return'] != null) _i['return'](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// 引入Graphin CSS
var App = function App() {
    var _React$useState = _react['default'].useState({
            selected: [],
            data: _graphin.Utils.mock(5).circle().graphin()
        }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        state = _React$useState2[0],
        setState = _React$useState2[1];

    var data = state.data,
        selected = state.selected;

    var graphRef = /*#__PURE__*/_react['default'].createRef(null);

    _react['default'].useEffect(function () {
        var graph = graphRef.current.graph; // 按住Shift框选,按住Option键 多选，进行关系扩散

        var onNodeSelectChange = function onNodeSelectChange(e) {
            console.log('nodeselectchange', e);
            var nodes = e.selectedItems.nodes.map(function (node) {
                return node.get('model');
            });
            setState(_objectSpread(_objectSpread({}, state), {}, {
                selected: nodes
            }));
        };

        graph.on('nodeselectchange', onNodeSelectChange);
        return function () {
            graph.off('nodeselectchange', onNodeSelectChange);
        };
    }, [state]);

    var onExpand = function onExpand() {
        if (selected.length === 0) {
            _antd.message.info('请先选中/圈选节点');

            return;
        }

        var count = Math.round(Math.random() * 20);

        var expandData = _graphin.Utils.mock(count).expand(selected).type('company').graphin();

        setState(_objectSpread(_objectSpread({}, state), {}, {
            data: {
                // 还需要对Node和Edge去重，这里暂不考虑
                nodes: [].concat(_toConsumableArray(state.data.nodes), _toConsumableArray(expandData.nodes)),
                edges: [].concat(_toConsumableArray(state.data.edges), _toConsumableArray(expandData.edges))
            }
        }));
    };

    return /*#__PURE__*/_react['default'].createElement('div', {
        className: 'App'
    }, /*#__PURE__*/_react['default'].createElement('h3', null, '\u57FA\u4E8E\u529B\u5BFC\u7684\u8282\u70B9\u6269\u6563\uFF0C\u652F\u6301\u6309\u4F4FShift\u5708\u9009\uFF0C\u591A\u4E2A\u8282\u70B9\u540C\u65F6\u6269\u6563', /*#__PURE__*/_react['default'].createElement('button', {
        onClick: onExpand,
        style: {
            'float': 'right',
            height: '28px',
            lineHeight: '28px'
        }
    }, '\u70B9\u51FB\u6269\u6563')), /*#__PURE__*/_react['default'].createElement(_graphin['default'], {
        data: data,
        layout: {
            name: 'force',
            options: {
                defSpringLen: function defSpringLen(_edge, source, target) {
                    var _source$data$layout, _target$data$layout;

                    /** 默认返回的是 200 的弹簧长度 */

                    /** 如果你要想要产生聚类的效果，可以考虑 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短 */
                    var nodeSize = 30;
                    var Sdegree = (_source$data$layout = source.data.layout) === null || _source$data$layout === void 0 ? void 0 : _source$data$layout.degree;
                    var Tdegree = (_target$data$layout = target.data.layout) === null || _target$data$layout === void 0 ? void 0 : _target$data$layout.degree;
                    var minDegree = Math.min(Sdegree, Tdegree);
                    return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize * 2;
                }
            }
        },
        ref: graphRef
    }, /*#__PURE__*/_react['default'].createElement(_graphinComponents.Toolbar, {
        style: {
            position: 'absolute',
            bottom: 28,
            left: 28
        }
    })));
};

_reactDom['default'].render( /*#__PURE__*/_react['default'].createElement(App, null), document.getElementById('container'));