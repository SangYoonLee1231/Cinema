const seatTable = document.getElementById("seat-chart-div");
const movieTable = document.getElementById("movie-select-div");

// 영화 선택 영역
let movie = null;
let movie_id = null;
let movie_color = false;

function handleMovieClick(event) {
  if (event.target.id == "movie-select-div") {
  } else if (event.target.id == "movies") {
  } else if (movie_color == false) {
    movie = event.target;
    movie.classList.add("click");
    movie_id = movie.id;
    movie_color = true;
  } else {
    if (event.target.id == movie_id) {
      movie_id = null;
      movie.classList.toggle("click");
      movie_color = false;
    } else {
      event.target.classList.add("click");
      movie.classList.remove("click");
      movie = event.target;
      movie_id = movie.id;
    }
  }
}

movieTable.addEventListener("click", handleMovieClick);

// 날짜, 시간 선택 영역
const date = document.getElementById("date");
const time = document.getElementById("time");

let selectedDate = null;
let selectedTime = null;

function changeDate() {
  selectedDate = date.options[date.selectedIndex].text;
}

date.addEventListener("change", changeDate);

function changeTime() {
  selectedTime = time.options[time.selectedIndex].text;
}

time.addEventListener("change", changeTime);

// 좌석 선택 영역
let seat = null;
let seat_id = null;
let seat_color = false;

function handleClick(event) {
  if (event.target.id == "table-seat") {
  } else if (event.target.id == "seat-chart-div") {
  } else if (seat_color == false) {
    seat = event.target;
    seat.classList.add("click");
    seat_id = seat.id;
    seat_color = true;
  } else {
    if (event.target.id == seat_id) {
      seat_id = null;
      seat.classList.toggle("click");
      seat_color = false;
    } else {
      event.target.classList.add("click");
      seat.classList.remove("click");
      seat = event.target;
      seat_id = seat.id;
    }
  }
}

seatTable.addEventListener("click", handleClick);

// 예매 정보 모두 선택 완료시 값 저장 및 초기화
const button = document.getElementById("submit");

function onBtnClick() {
  console.log(movie.innerText);
  console.log(selectedDate);
  console.log(selectedTime);
  console.log(seat_id);
  // 시간, 날짜 모두 겹치는지 확인해서 localStorage에 추가
  // localStorage 저장시, 예매내역 HTMl태그 JS에서 생성, 추가
  // (이 때, 예매 내역 '삭제' 기능 태그,
  // 예매 내역 '확인' 기능도 만들어야함)
}

button.addEventListener("click", onBtnClick);
