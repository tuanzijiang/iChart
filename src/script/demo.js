/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#bbb',
    lineColor: '#bbb'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});