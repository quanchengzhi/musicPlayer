(function($, root) {
    var $scope = $(document.body);
    var controlManager;
    var $playList = $('<div class="playList">' +
        '<div class="playHead">播放列表</div>' +
        '<ul class="playListWrap"></ul>' +
        '<div class="closeBtn">关闭</div>' +
        '</div>');

    function render(data) {
        var html = '',
            len = data.length;
        for (var i = 0; i < len; i++) {
            html += '<li><h3>' + data[i].song + '-<span>' + data[i].singer + '</spam></h3></li>';
        }
        $playList.find('ul').html(html);
        $scope.append($playList);
        bindEvent();
    }

    function show(control) {
        controlManager = control;
        var index = controlManager.index;
        $playList.addClass('show');
        signSong(index);
    }

    function signSong(index) {
        $playList.find('.playing').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }

    function bindEvent() {
        $playList.on('click', '.closeBtn', function() {
            $playList.removeClass('show');
        })
        $playList.on("click", 'li', function() {
            var index = $(this).index();
            signSong(index);
            controlManager.index = index;
            $scope.trigger("playChange", [index]);
            setTimeout(function() {
                $playList.removeClass('show');
            }, 1000)
        })
    }
    root.playList = {
        render: render,
        show: show
    }
}(window.Zepto, window.player || (window.player = {})))