'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
Object.defineProperty(exports, 'PatternNetwork', {
    enumerable: true,
    get: function get() {
        return _PatternNetwork['default'];
    }
});
Object.defineProperty(exports, 'PatternInstancesNetwork', {
    enumerable: true,
    get: function get() {
        return _PatternInstancesNetwork['default'];
    }
});
Object.defineProperty(exports, 'Collection', {
    enumerable: true,
    get: function get() {
        return _Collection['default'];
    }
});

var _PatternNetwork = _interopRequireDefault(require('./components/KnowledgeGraph/PatternNetwork'));

var _PatternInstancesNetwork = _interopRequireDefault(require('./components/KnowledgeGraph/PatternInstancesNetwork'));

var _Collection = _interopRequireDefault(require('./components/Collection/Collection'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }