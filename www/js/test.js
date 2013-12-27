(function (ajax) {
    'use strict';

    var test = document.getElementById('test');

    function addText(t) {
        test.innerHTML = test.innerHTML + '<br>' + t;
    }
    window.clickBtn = function () {
        ajax('get', 'http://rec.uc.cn/video_topic/getVotes', {
            subjectId: 1
        }, function (data, text) {
            addText('onload');
            navigator.notification.vibrate(300);
            // navigator.notification.beep(1);
            navigator.notification.alert('123', function () {
                addText(text);
            }, 'ajax');

            // 以下方法是安装了 StatusBarNotification 插件
            // https://github.com/xydudu/StatusBarNotification
            try {
                window.plugins.statusBarNotification.notify(
                    'Put your title here',
                    'Put your message here'
                );
            }
            catch (e) {
                addText(e.message);
            }
            // localNotifications end
        }, function (xhr) {
            addText(xhr.toString());
        });
    };
})(window.ajax);