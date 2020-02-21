import Mercury from "@postlight/mercury-parser"

window.onload = function() {
  const $startButton = document.querySelector('.start');

  $startButton.onclick = function() {
    Mercury.parse('https://olahraga.kompas.com/read/2018/08/21/12583778/semifinal-asian-games-gregoria-bawa-indonesia-unggul-1-0-atas-jepang').then(result => console.log(result));
  };
}