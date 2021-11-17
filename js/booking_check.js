const bookingInfo = document.getElementById("booking-info");
let i = 1;

while (i <= parseInt(localStorage.getItem("movie count"))) {
  if (localStorage.getItem(i)) {
    const bookingStorageInfo = JSON.parse(localStorage.getItem(i));
    console.log(bookingStorageInfo);
    printInfo(bookingStorageInfo, i);
  }
  i++;
}

function printInfo(bookingStorageInfo, i) {
  const li = document.createElement("li");
  const movieName = document.createElement("h4");
  const date = document.createElement("h4");
  const time = document.createElement("h4");
  const seatNum = document.createElement("h4");
  //const button_info = document.createElement("button");
  const button_delete = document.createElement("button");

  li.id = i;

  movieName.innerText = bookingStorageInfo[0];
  date.innerText = bookingStorageInfo[1];
  time.innerText = "시간 : " + bookingStorageInfo[2];
  seatNum.innerText = "좌석 : " + bookingStorageInfo[3];

  //button_info.innerText = "예매 하기";
  //button_info.addEventListener("click", handleButtonInfo);

  button_delete.innerText = "❌ 취소";
  button_delete.addEventListener("click", deleteBookingList);

  li.appendChild(movieName);
  li.appendChild(date);
  li.appendChild(time);
  li.appendChild(seatNum);
  //li.appendChild(button_info);
  li.appendChild(button_delete);
  bookingInfo.appendChild(li);
}

function deleteBookingList(event) {
  const li = event.target.parentElement;
  localStorage.removeItem(li.id);
  li.remove();
}
