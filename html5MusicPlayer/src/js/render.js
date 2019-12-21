//封装渲染模块
(function($, root) {
    var $scope = $(document.body);
    //渲染歌曲信息
    function renderInfo(data) {
        var html = "<h1 class='songName'>" + data.song + "</h1>" +
            "<h3 class='singerName'>" + data.singer + "</h3>" +
            "<h4 class='albumName'>" + data.album + "</h4>";
        $scope.find(".songInfo").html(html);
    }
    //渲染歌曲图片
    function renderImage(src) {
        var img = new Image();
        img.onload = function() {
            $scope.find(".songImg img").attr("src", src);
            root.blurImg(img, $scope);
        }
        img.src = src;

    }

    function renderLikeBtn(isLike) {
        if (isLike) {
            $scope.find(".likeBtn").addClass("liked");
        } else {
            $scope.find(".likeBtn").removeClass("liked");
        }
    }
    root.render = function(data) {
        renderInfo(data);
        renderImage(data.image);
        renderLikeBtn(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})))