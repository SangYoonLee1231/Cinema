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
  const detailsBtn = document.createElement("button");

  li.id = ll;

  movieName.innerText =
    PaymentInfo[0] + " [" + PaymentInfo[3].length * 9000 + "원 결제 완료]";
  date.innerText = PaymentInfo[1];
  time.innerText = "시간 : " + PaymentInfo[2];
  seatNum.innerText = "좌석 : " + PaymentInfo[3];
  detailsBtn.innerText = "상세 내역";
  detailsBtn.addEventListener("click", handleDetailsBtn);
  deleteBtn.innerText = "❌ 예매 취소";
  deleteBtn.addEventListener("click", deletePaymentList);

  li.appendChild(movieName);
  li.appendChild(date);
  li.appendChild(time);
  li.appendChild(seatNum);
  li.appendChild(detailsBtn);
  li.appendChild(deleteBtn);
  paymentFinished.appendChild(li);
}

function handleDetailsBtn(event) {
  console.log(event);

  const settings =
    "toolbar=0,directories=0,status=no,menubar=0,scrollbars=auto,resizable=no,height=600,width=600,left=0,top=0";
  const windowObj = window.open("details.html", "상세 내역", settings);
  console.log(document);
  console.log(windowObj);
  //const detailList = windowObj.document.getElementById("detail-list");
  console.log(windowObj.document.getElementById("detail-list"));
  /*
  const li2 = document.createElement("li");
  const movieName2 = document.createElement("h4");
  const date2 = document.createElement("h4");
  const time2 = document.createElement("h4");
  const seatNum2 = document.createElement("h4");
  */
  const detailLi = event.target.parentElement;
  /*
  movieName2.innerText = detailLi.children[0].innerText;
  date2.innerText = detailLi.children[1].innerText;
  time2.innerText = detailLi.children[2].innerText;
  seatNum2.innerText = detailLi.children[3].innerText;
  */
  windowObj.document.getElementById("1").innerText =
    detailLi.children[0].innerText;
  windowObj.document.getElementById("2").innerText =
    detailLi.children[1].innerText;
  windowObj.document.getElementById("3").innerText =
    detailLi.children[2].innerText;
  windowObj.document.getElementById("4").innerText =
    detailLi.children[3].innerText;

  //li2.append(movieName2);
  //li2.append(date2);
  //li2.append(time2);
  //li2.append(seatNum2);

  //detailList.appendChild(li2);
}

function deletePaymentList(event) {
  const checkDelete = confirm("예매를 취소하시겠습니까?");
  if (checkDelete) {
    alert("예매가 취소되었습니다.");
    const li = event.target.parentElement;

    localStorage.removeItem(li.id);
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
    li.remove();
  }
}

const paymentBtn = document.getElementById("payment");

paymentBtn.addEventListener("click", handlePayment);

function handlePayment() {
  const movie_count = localStorage.getItem("movie count");
  if (movie_count == 0 || movie_count == null) {
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
