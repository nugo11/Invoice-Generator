let signin = document.getElementsByClassName("signin")[0];
let logined = document.getElementsByClassName("logined")[0];
let preview = document.getElementsByClassName("preview")[0];
let submitSignin = document.getElementById("submitSignin");
let fullsubmit = document.getElementById("fullsubmit");

let EnterYourCompanyName = document.getElementById("EnterYourCompanyName");
let EnterYourID = document.getElementById("EnterYourID");
let currency = document.getElementById("currency");
let peyment = document.getElementById("payment");
let cash = document.querySelector(".cash");
let bank = document.querySelector(".bank");

document
  .querySelectorAll("[type=text]")
  .forEach((file) => file.setAttribute("autocomplete", "off"));

submitSignin.addEventListener("click", () => {
  if (
    EnterYourCompanyName.value === "" ||
    EnterYourID.value === "" ||
    currency.value === "noresult" ||
    peyment.value === "noresult"
  ) {
    EnterYourCompanyName.style.borderBottom = "2px solid red";
    EnterYourID.style.borderBottom = "2px solid red";
    currency.style.borderBottom = "2px solid red";
    peyment.style.borderBottom = "2px solid red";
  } else {
    signin.style.display = "none";
    logined.style.display = "flex";
  }

  let companyname = document.getElementById("companyname");
  let companyid = document.getElementById("companyid");
  let putCurrency = document.getElementById("putCurrency");
  companyname.textContent = EnterYourCompanyName.value;
  companyid.textContent = EnterYourID.value;
  putCurrency.textContent = currency.value;

  if (peyment.value === "cash") {
    bank.style.display = "none";
  } else {
    cash.style.display = "none";
  }

  if (document.body.clientWidth < 1000) {
    viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute('content', 'width=device-width, initial-scale=0.4, user-scalable=0');
  }
});

let recName = document.getElementById("recName");
let recID = document.getElementById("recID");
let recAdress = document.getElementById("recAdress");

let invNum = document.getElementById("invNum");
let stDate = document.getElementById("stDate");
let exDate = document.getElementById("exDate");

fullsubmit.addEventListener("click", () => {
  document.querySelector(".headnavigation").style.display = "none";
  addrow.style.display = "none";
  delrow.style.display = "none";
  fullsubmit.style.display = "none";
  Printbutton.style.display = 'block';
  document
    .querySelectorAll("input")
    .forEach((file) => file.setAttribute("disabled", "disabled"));
});

let addrow = document.getElementById("addrow");
let table = document.getElementsByTagName("tbody")[0];

addrow.addEventListener("click", () => {
  let addrow1 = document.getElementById("addrow");
  let addrowintable = document.createElement("tr");
  let trs = document.getElementsByClassName("counttrs");
  let trtextin =
    '<td><input class="disableItemInput" type="text" placeholder="Description of service or product..."style=width:100%><td class="counttrs"><input class="countnumbers1" type=number value=1><td><input class="countnumbers2" type=number value=1><td id="lasttdtable"><p class=tdamount>0</p>';

  if (trs.length === 15) {
    addrow1.textContent = "No more can be added";
  } else {
    table.appendChild(addrowintable);
    addrowintable.innerHTML = trtextin;
  }
  if (table.rows.length > 2) {
    delrow.style.display = "block";
  }

  countNumbers();
});

function countNumbers() {
  let countnumbers1 = document.getElementsByClassName("countnumbers1");
  let countnumbers2 = document.getElementsByClassName("countnumbers2");
  let tdamount = document.getElementsByClassName("tdamount");

  for (let t = 0; t < countnumbers1.length; t++) {
    countnumbers1[t].addEventListener("change", () => {
      let WholeNum = countnumbers1[t].value * countnumbers2[t].value;
      tdamount[t].textContent = WholeNum.toFixed(1);
      updateSubtotal();
    });
    countnumbers2[t].addEventListener("change", () => {
      let WholeNum = countnumbers1[t].value * countnumbers2[t].value;
      tdamount[t].textContent = WholeNum.toFixed(1);
      updateSubtotal();
    });
  }
}

countNumbers();

let tax = document.getElementById("tax");
tax.addEventListener("change", () => {
  updateSubtotal();
});

function updateSubtotal() {
  let subtotal = document.getElementById("subtotal");
  let tdamount = document.getElementsByClassName("tdamount");
  let tax = document.getElementById("tax");
  let subtotal1 = document.getElementById("total");

  let subtotalValueAr = Array.from(tdamount).reduce(
    (sum, td) => sum + Number(td.textContent),
    0
  );

  subtotal.textContent = subtotalValueAr;
  subtotal1.textContent =
    (Number(tax.value) / 100) * subtotalValueAr + subtotalValueAr;
}

let delrow = document.getElementById("delrow");
if (table.rows.length === 2) {
  delrow.style.display = "none";
}
let table1 = document.getElementsByTagName("tbody")[0];
let addrow2 = document.getElementById("addrow");

delrow.addEventListener("click", () => {
  var rowCount = table1.rows.length - 1;
  if (table1.rows.length === 2) {
    delrow.style.display = "none";
  } else {
    table1.deleteRow(rowCount);
  }

  if (table.rows.length === 2) {
    delrow.style.display = "none";
  }
  addrow2.textContent = "+ Line Item (Max 15)";
  updateSubtotal();
});

function delRowFoo(mouseevent, opacity) {
  delrow.addEventListener(mouseevent, () => {
    let table1 = document.getElementsByTagName("tbody")[0];
    let detectalltrforlast = document.getElementsByTagName("tr");
    var rowCount = table1.rows.length - 1;
    detectalltrforlast[rowCount].style.opacity = opacity;
    detectalltrforlast[rowCount].style.transition = "0.2s";
  });
}

delRowFoo("mouseenter", "0.2");
delRowFoo("mouseleave", "1");

let Printbutton = document.getElementById("Printbutton");

Printbutton.addEventListener("click", () => {
  var element = document.getElementsByClassName("invoice")[0];
  var opt = {
    margin:       0,
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 3, scrollY: 0 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
  html2pdf().from(element).set(opt).save();
  Printbutton.style.display = 'none';
});
