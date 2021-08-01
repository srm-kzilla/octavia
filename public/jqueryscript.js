$(function myshuffle() {
  var container = $('#shuffled');
  container.shuffleLetters();
  setTimeout(function () {
    container.shuffleLetters({
      text: 'Octavia!',
    });
  }, 6000);
});
