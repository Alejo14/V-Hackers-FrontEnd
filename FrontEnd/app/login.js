(function () {
  var p = document.createElement('script');
  p.type = 'text/javascript';
  p.async = true;
  p.src = 'https://apis.google.com/js/client.js?onload=onLoadFunction';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(p, s);
})()
