$(document).ready(function () {
  const words = [
      { word: "always", translation: "завжди" },
      { word: "house", translation: "будинок" },
      { word: "friend", translation: "друг" },
      { word: "water", translation: "вода" },
      { word: "book", translation: "книга" },
      { word: "time", translation: "час" },
      { word: "car", translation: "машина" },
      { word: "day", translation: "день" },
      { word: "school", translation: "школа" },
      { word: "family", translation: "сім'я" }
  ];
  let currentStep = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
  }

  const shuffledWords = shuffle([...words]);
  const totalSteps = shuffledWords.length;

  function updateCard() {
      $("#word-card").text(shuffledWords[currentStep].word);
      $("#current-step").text(currentStep + 1);
      $("#total-steps").text(totalSteps);
      $("#translation-input").val("");
  }

  function showModal() {
      const percentage = (correctCount / totalSteps) * 100;
      let level = "Beginner";
      if (percentage > 80) level = "Advanced";
      else if (percentage > 50) level = "Intermediate";

      $("#language-level").text(level);
      $("#result-modal").fadeIn();
  }

  $("#check-button").click(function () {
      const userTranslation = $("#translation-input").val().trim();
      const correctTranslation = shuffledWords[currentStep].translation;

      if (userTranslation.toLowerCase() === correctTranslation.toLowerCase()) {
          correctCount++;
          $("#correct-count").text(correctCount);
      } else {
          incorrectCount++;
          $("#incorrect-count").text(incorrectCount);
      }

      currentStep++;
      if (currentStep < totalSteps) {
          updateCard();
      } else {
          showModal();
      }
  });

  $("#restart-button").click(function () {
      currentStep = 0;
      correctCount = 0;
      incorrectCount = 0;
      $("#correct-count").text(0);
      $("#incorrect-count").text(0);
      $("#result-modal").fadeOut();
      updateCard();
  });

  updateCard();
});