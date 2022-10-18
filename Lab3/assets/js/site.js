const form = document.getElementById('form');

form.addEventListener('change', calculate);

function calculate() {
  const billTotal = document.getElementById('billTotal');
  const tip = document.getElementById('tip');
  const tipPercent = document.getElementById('tipPercent');
  const tipAmount = document.getElementById('tipAmount');
  const totalBillTip = document.getElementById('totalBillTip');

  let x = 0;
  let y = 0;

  if(isNaN(parseFloat(billTotal.value))){
    document.getElementById('error').style.display = "block";
    tipAmount.value = 0;
    totalBillTip.value = 0;
  }

  else{
    document.getElementById('error').style.display = "none";
    tipPercent.value = tip.value + "%";

    x = parseFloat(billTotal.value) * parseFloat(tip.value/100);
    tipAmount.value = x.toFixed(2);

    y = parseFloat(billTotal.value) + parseFloat(tipAmount.value);
    totalBillTip.value = y.toFixed(2);
  }

}
