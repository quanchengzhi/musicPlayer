var root = window.player,
    $ = window.Zepto,
    $scope = $(document.body),
    songList,
    controlManager,
    audioManager = new root.AudioManager(),
    oDiv = document.getElementsByClassName('playBtn')[0],
    processor = root.processor,
    playList = root.playList;



function bindTouch() {
    var $slidePoint = $scope.find(".slidePoint");
    var offset = $scope.find(".proWrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on("touchstart", function(e) {
        processor.stop();
    }).on("touchmove", function(e) {
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if (percentage > 1 || percentage < 0) {
            percentage = 0;
        }
        processor.updata(percentage);
    }).on("touchend", function(e) {
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if (percentage < 0 || percentage > 1) {
            percentage = 0;
        }
        processor.start(percentage);
        var curDuration = songList[controlManager.index].duration;
        var duration = curDuration * percentage;
        if (audioManager.status == "pause") {
            oDiv.innerHTML = "播放";
        }
        audioManager.jumptoPlay(duration);
    })
}

$scope.on("playChange", function(e, index) {
    var curData = songList[index]
    root.render(curData);
    audioManager.setAudioSource(curData.audio);
    if (audioManager.status == "play") {
        audioManager.play();
        processor.start();
    }
    processor.render(curData.duration);
})

$scope.on("click", ".likeBtn", function() {
    var like = songList.isLike;
    if (like == false) {
        $scope.find(".likeBtn").removeClass("liked");
    } else {
        $scope.find(".likeBtn").addClass("liked");
    }
})

$scope.on("click", ".prevBtn", function() {
    var index = controlManager.prev();
    audioManager.play();
    oDiv.innerHTML = "播放";
    $scope.trigger("playChange", [index]);
})

$scope.on("click", ".nextBtn", function() {
    var index = controlManager.next();
    audioManager.play();
    oDiv.innerHTML = "播放";
    $scope.trigger("playChange", [index]);
})

$scope.on("click", ".playBtn", function() {
    if (audioManager.status == "play") {
        oDiv.innerHTML = "暂停";
        processor.stop();
        audioManager.pause();
    } else {
        oDiv.innerHTML = "播放";
        processor.start();
        audioManager.play();
    }
})
$scope.on("click", ".listBtn", function() {
    playList.show(controlManager);
})

$scope.find("#musicPlay").bind("ended", function() {
    var index = controlManager.next();
    $scope.trigger("playChange", [index]);
})


function getData(url) {
    $.ajax({
        url: url,
        type: "GET",
        success: successdFn,
        error: function() {
            console.log("error");
        }
    });
}


function successdFn(data) {
    songList = data;
    controlManager = new root.ControlManager(data.length);
    $scope.trigger("playChange", [0]);
    playList.render(data);
    bindTouch();
}
getData("/mock/data.json");