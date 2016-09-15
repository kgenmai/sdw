/* Google map */
function initialize() {
  var latlng = new google.maps.LatLng(34.4759887, 134.1724901);
  var myOptions = {
        zoom: 9,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP, //
        panControl: true, //1.左上の丸いの表示
        streetViewControl: true, //2.左の黄色い人形(pegman=ペグマン)表示
        zoomControl: true, //3.左の上下スライダー表示
        mapTypeControl: true, //4.右上の「地図/航空写真」表示
        scaleControl: false, //5.右下の定規の表示
        overviewMapControl: false //6.右下の概観マップの表示
        //disableDefaultUI: true  //全コントローラを非表示
  };
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: 'ピンにマウスを乗せたときのタイトル'
  });
}
