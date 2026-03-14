const createElements = (arr) => {
  const htmlElements = arr.map((ele) => `<span class="btn">${ele}</span>`)
  return htmlElements.join(" ");
}

const manageSpiner = (status) => {
    if(status == true){
      document.querySelector("#spinner").classList.remove("hidden")
      document.querySelector("#word-container").classList.add("hidden")
    } else {
      document.querySelector("#spinner").classList.add("hidden")
      document.querySelector("#word-container").classList.remove("hidden") 
    }
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
      const lessonBtn = document.querySelectorAll(".lesson-btn")
      lessonBtn.forEach(btn => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
    manageSpiner(true)
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive()
      const clickBtn = document.querySelector(`#lesson-btn-${id}`)
      clickBtn.classList.add("active")
      displayLevelWords(data.data)});
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  const res = await fetch(url)
  const deatils = await res.json()
  displayWordDetails(deatils.data)
  
}

const displayWordDetails = (word) => {
    const detailContainer = document.querySelector("#deatils-container")
    detailContainer.innerHTML = `
     <div>
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
        </div>
        <div>
          <h2 class="font-bold">Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h2 class="font-bold">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h2 class="font-bold">Synonym</h2>
          <div>
          ${createElements(word.synonyms)}
        </div>
        </div>
    
    `

    document.querySelector("#word_modal").showModal()
}

const displayLevelWords = (words) => {
  const wordsContainer = document.querySelector("#word-container");
  wordsContainer.innerHTML = "";

  if (words.length == 0) {
    wordsContainer.innerHTML = `<div class=" font-bangla text-center col-span-full rounded-xl py-10 space-y-6">
        <img class="mx-auto" src="./assets/alert-error.png"/>
      <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
    </div>`;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `<div class="card bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ  পাওয়া যায় নি"}</h2>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <div class="font-banla font-semibold text-2xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায় নি"}"</div>
      <div class="flex justify-between items-center">
        <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>`;
    wordsContainer.appendChild(card);
  });

  manageSpiner(false)
};

const displayLessons = (lessons) => {
  const levelContainer = document.querySelector(".level-container");
  levelContainer.innerHTML = "";

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>`;

    levelContainer.appendChild(btnDiv);
  }
};
loadLessons();
