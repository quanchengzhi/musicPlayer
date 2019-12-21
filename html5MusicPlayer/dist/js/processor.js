(function($, root) {
    var $scope = $(document.body),
        startTime,
        curDuration,
        oFrame,
        lastPercentage = 0;

    function formatTime(time) {
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }

    function render(duration) {
        curDuration = duration;
        lastPercentage = 0;
        updata(0);
        var allTime = formatTime(duration);
        $scope.find(".allTime").text(allTime);
    }

    function setProcessor(percentage) {
        var percent = (percentage - 1) * 100 + "%";
        $scope.find(".proTop").css({
            "transform": "translateX(" + percent + ")"
        })
    }

    function updata(percentage) {
        var curTime = formatTime(percentage * curDuration);
        $scope.find(".curTime").text(curTime);
        setProcessor(percentage);
    }

    function start(percent) {
        if (percent === undefined) {
            lastPercentage = lastPercentage;
        } else {
            lastPercentage = percent;
        }
        cancelAnimationFrame(oFrame);
        startTime = new Date().getTime();

        function frame() {
            var curTime = new Date().getTime();
            var percentage = lastPercentage + (curTime - startTime) / (curDuration * 1000);
            if (percentage < 1) {
                updata(percentage);
                oFrame = requestAnimationFrame(frame);
            } else {
                cancelAnimationFrame(oFrame);
            }
        }
        frame();
    }

    function stop() {
        var curTime = new Date().getTime();
        lastPercentage = lastPercentage + (curTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(oFrame);
    }
    root.processor = {
        render: render,
        start: start,
        stop: stop,
        updata: updata
    };

}(window.Zepto, window.player || (window.player = {})))