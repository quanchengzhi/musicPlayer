(function($, root) {
    function ControlManager(length) {
        this.index = 0;
        this.length = length;
    }
    ControlManager.prototype = {
        next: function() {
            return this.getIndex(1);
        },
        prev: function() {
            return this.getIndex(-1);
        },
        getIndex: function(val) {
            var index = this.index;
            var len = this.length;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.ControlManager = ControlManager;
}(window.Zepto, window.player || (window.player = {})))