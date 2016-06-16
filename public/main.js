jQuery(function($) {
    function updateInfo() {
        $.ajax({
            url: '/getinfo',
            success: function(tempInfo) {
                console.log(tempInfo);
                $('#temperature').text(tempInfo.Temp + 'ºC');
                $('#humidity').text(tempInfo.Humidity + '%');
                setTimeout(updateInfo, 2000);
            }
        });
    }
    updateInfo();
});