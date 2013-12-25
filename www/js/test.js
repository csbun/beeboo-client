(function (ajax) {
    'use strict';

    var test = document.getElementById('test'),
        localNotificationId = 1;

    function addText(t) {
        test.innerHTML = test.innerHTML + '<br>' + t;
    }
    window.clickBtn = function () {
        ajax('get', 'http://rec.uc.cn/video_topic/getVotes', {
            subjectId: 1
        }, function (data, text) {
            navigator.notification.vibrate(300);
            navigator.notification.beep(300);
            navigator.notification.alert('123', function () {
                addText(text);
            }, 'ajax');

            // 以下方法是安装了 localNotifications 插件
            // https://github.com/Wizcorp/phonegap-plugin-localNotifications
            // 貌似不可行，待测
            try {
                window.localNotification.add(localNotificationId++, {
                    seconds: 30,
                    message: 'chaaaarrrliieeeee: ' + localNotificationId,
                    badge: 1
                });
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