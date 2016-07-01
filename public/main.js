jQuery(function($) {
    // Retrieve temperature/humidity data and display it
    function updateInfo() {
        $.ajax({
            url: '/getinfo',
            success: function(tempInfo) {
                // Make sure we have a temp before we display it
                if (undefined !== tempInfo.Temp) {
                    $('#temperature').text(tempInfo.Temp + 'ºC');
                }
                // Make sure we have a humidity before we display it
                if (undefined !== tempInfo.Humidity) {
                    $('#humidity').text(tempInfo.Humidity + '%');
                }
                setTimeout(updateInfo, 2000); // Update the data in 2s
            }
        });
    }

    // Kick things off with the first round of data
    updateInfo();
});