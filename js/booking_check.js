const bookingInfo = document.getElementById("booking-info");
const paymentFinished = document.getElementById("payment-finished");

let price = 0;
let i = 1;
let k = 1;
let ll = 1001;

if (localStorage.getItem("l") == null) {
  localStorage.setItem("l", JSON.stringify(1001));
}

let ticket_count = 0;

while (i <= parseInt(localStorage.getItem("movie count"))) {
  if (localStorage.getItem(i)) {
    const bookingStorageInfo = JSON.parse(localStorage.getItem(i));
    printInfo(bookingStorageInfo, i);
  }
  i++;
}

while (ll <= parseInt(localStorage.getItem("l"))) {
  if (localStorage.getItem(ll)) {
    const PaymentInfo = JSON.parse(localStorage.getItem(ll));
    printPaymentFin(PaymentInfo, ll);
  }
  ll++;
}

function printPaymentFin(PaymentInfo, ll) {
  const li = document.createElement("li");
  const movieName = document.createElement("h4");
  const date = document.createElement("h4");
  const time = document.createElement("h4");
  const seatNum = document.createElement("h4");
  const deleteBtn = document.createElement("button");

  li.id = ll;

  movieName.innerText =
    PaymentInfo[0] + " [" + PaymentInfo[3].length * 9000 + "원 결제 완료]";
  date.innerText = PaymentInfo[1];
  time.innerText = "시간 : " + PaymentInfo[2];
  seatNum.innerText = "좌석 : " + PaymentInfo[3];
  deleteBtn.innerText = "❌ 예매 취소";
  deleteBtn.addEventListener("click", deletePaymentList);

  li.appendChild(movieName);
  li.appendChild(date);
  li.appendChild(time);
  li.appendChild(seatNum);
  li.appendChild(deleteBtn);
  paymentFinished.appendChild(li);
}

function deletePaymentList(event) {
  const checkDelete = confirm("예매를 취소하시겠습니까?");
  if (checkDelete) {
    alert("예매가 취소되었습니다.");
    const li = event.target.parentElement;

    localStorage.removeItem(li.id);
    //localStorage.setItem(
    //  "l",
    //  JSON.stringify(parseInt(localStorage.getItem("l")) - 1)
    //);
    li.remove();
  }
}

function printInfo(bookingStorageInfo, i) {
  const li = document.createElement("li");
  const movieName = document.createElement("h4");
  const date = document.createElement("h4");
  const time = document.createElement("h4");
  const seatNum = document.createElement("h4");
  const button_delete = document.createElement("button");

  li.id = i;

  movieName.innerText = bookingStorageInfo[0];
  date.innerText = bookingStorageInfo[1];
  time.innerText = "시간 : " + bookingStorageInfo[2];
  seatNum.innerText = "좌석 : " + bookingStorageInfo[3];

  button_delete.innerText = "❌ 취소";
  button_delete.addEventListener("click", deleteBookingList);

  li.appendChild(movieName);
  li.appendChild(date);
  li.appendChild(time);
  li.appendChild(seatNum);
  li.appendChild(button_delete);
  bookingInfo.appendChild(li);
}

function deleteBookingList(event) {
  const checkDelete = confirm("해당 항목을 장바구니에서 제거하시겠습니까?");
  if (checkDelete) {
    alert("해당 항목을 장바구니에서 제거하였습니다.");
    const li = event.target.parentElement;

    localStorage.removeItem(li.id);
    //localStorage.setItem(
    //  "movie count",
    //  JSON.stringify(parseInt(localStorage.getItem("movie count")) - 1)
    //);
    li.remove();
  }
}

const paymentBtn = document.getElementById("payment");

paymentBtn.addEventListener("click", handlePayment);

function handlePayment() {
  const movie_count = localStorage.getItem("movie count");
  if (movie_count == 0) {
    alert("장바구니가 비어있습니다.");
  } else {
    k = 1;
    ticket_count = 0;
    while (k <= parseInt(movie_count)) {
      if (localStorage.getItem(k)) {
        const bookingStorageInfo = JSON.parse(localStorage.getItem(k))[3];
        ticket_count += bookingStorageInfo.length;
      }
      k++;
    }

    price = ticket_count * 9000;
    const checkpaymemt = confirm(
      "결제하시겠습니까? 총 가격은 " + price + "원입니다."
    );
    if (checkpaymemt) {
      alert("결제가 완료되었습니다.");

      l = parseInt(localStorage.getItem("l"));
      m = 1;

      while (m <= parseInt(movie_count)) {
        if (localStorage.getItem(JSON.stringify(m))) {
          localStorage.setItem(JSON.stringify(l), localStorage.getItem(m));
          localStorage.removeItem(JSON.stringify(m));
        }
        l++;
        m++;
      }

      localStorage.setItem("l", l);
      localStorage.setItem("movie count", 0);
      location.reload();
    }
  }
}
