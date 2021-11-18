const seatTable = document.getElementById("seat-chart-div");
const movieTable = document.getElementById("movie-select-div");

// 영화 선택 영역
let movie = null;
let movie_id = null;
let movie_color = false;

function handleMovieClick(event) {
  if (event.target.id == "movie-select-div") {
  } else if (event.target.id == "movies") {
  } else if (event.target.id == "movie-select") {
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
let seat_id = [];

function handleClick(event) {
  if (event.target.id == "table-seat") {
  } else if (event.target.id == "seat-select") {
  } else if (event.target.id == "seat-chart-div") {
  } else {
    seat = event.target;
    seat.classList.toggle("click");

    if (seat_id.includes(seat.id)) {
      for (let i = 0; i < seat_id.length; i++) {
        if (seat_id[i] === seat.id) {
          seat_id.splice(i, 1);
          i--;
        }
      }
    } else {
      seat_id.push(seat.id);
    }
  }
}

seatTable.addEventListener("click", handleClick);

// 예매 정보 모두 선택 완료시 값 저장 및 초기화
const button = document.getElementById("submit");
const movieInfo = document.getElementById("movie-info");

const MOVIE_LIST_KEY = "movie";
let movie_count = 0;
let movie_list = [];

function onBtnClick(event) {
  event.preventDefault();

  if (
    // 조건1. 모든 항목을 선택했는가?
    movie == null ||
    selectedDate == null ||
    selectedTime == null ||
    seat_id == null
  ) {
    alert("모든 항목을 선택해주세요.");
  } /*else if (
    localStorage.getItem(1) &&
    selectedDate == JSON.parse(localStorage.getItem(movie_count))[1] &&
    selectedTime == JSON.parse(localStorage.getItem(movie_count))[2]
  ) {
    alert("이미 같은 시간에 예매한 내역이 있습니다.");
  }*/ else {
    let answer = confirm("선택하신 내용을 예매 목록에 추가하시겠습니까?");
    if (answer) {
      movie_count += 1;
      movie_list.push(movie.innerText);
      movie_list.push(selectedDate);
      movie_list.push(selectedTime);
      movie_list.push(seat_id);

      localStorage.setItem(movie_count, JSON.stringify(movie_list));
      localStorage.setItem("movie count", movie_count);

      alert("선택하신 내용이 예매 목록에 성공적으로 추가되었습니다.");

      movie_list = [];

      // 시간, 날짜 모두 겹치는지 확인해서 localStorage에 추가
      // (이 때, 예매 내역 '삭제' 기능 태그,
      // 예매 내역 '확인' 기능도 만들어야함)
    }
  }
}
button.addEventListener("click", onBtnClick);

function deleteMovieList(event) {
  const li = event.target.parentElement;
  localStorage.removeItem(li.id);
  li.remove();
  movie_count -= 1;
}
