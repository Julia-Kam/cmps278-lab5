function getSize() {
  return document.getElementById("slider").value;
}

function getMeet() {
  var checkboxes = document.getElementsByName("meat");
  var checkboxesChecked = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i]);
    }
  }
  return checkboxesChecked.length > 0 ? checkboxesChecked : [];
}

function getVeg() {
  var checkboxes = document.getElementsByName("veggies");
  var checkboxesChecked = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i]);
    }
  }
  return checkboxesChecked.length > 0 ? checkboxesChecked : [];
}

function getCheese(){
  var radioButtons = document.getElementsByName("cheeseoption");
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      console.log(i+1)
      return i+1;
    }
  }
  return 0;
}

const sliderElement = document.getElementById('slider');
const imageElement = document.getElementById('pizzaimage');
const textElement = document.getElementById('sizetext');

let pizzaSizePrice = 6;
let pizzaSize = 'small';

function ChangePizzaSize() {
  const value = sliderElement.value;
  switch (value) {
    case '1':
      pizzaSizePrice = 6;
      pizzaSize = 'Small';
      imageElement.setAttribute("width", 100);
      textElement.textContent = 'Small $6';
      break;
    case '2':
      pizzaSizePrice = 10;
      pizzaSize = 'Medium';
      imageElement.setAttribute("width", 150);
      textElement.textContent ='Medium $10';
      break;
    case '3': 
      pizzaSizePrice = 14;
      pizzaSize = 'Large';
      imageElement.setAttribute("width", 200);
      textElement.textContent = 'Large $14';
      break;
    case '4': 
      pizzaSizePrice = 16;
      pizzaSize = 'X-Large';
      imageElement.setAttribute("width", 250);
      textElement.textContent = 'X-Large $16';
      break;
  }
  
}

sliderElement.addEventListener('change', () => {
  ChangePizzaSize();
});

function calculateTotal() {
  return (pizzaSizePrice + (2 * getMeet().length) + getVeg().length + (getCheese()==3 ? 3 : 0));
}

const fillSummary = () => {
  const address = document.getElementById('dlvrTo');
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');
  const phonenumber = document.getElementById('mobile');
  const city = document.getElementById('city');
  const addresstext = document.getElementById('address');
  const total = document.getElementById('total');
  
  address.setAttribute('style', 'white-space: pre;');
  address.textContent = firstname.value + ' ' + lastname.value + '\n' +
                        email.value + '\n' +
                        phonenumber.value + '\n' +
                        city.value + ' - ' + addresstext.value;

  const orderList = document.getElementById('orderList');
  orderList.innerHTML = ""
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(pizzaSize + ' size'))
  orderList.append(li);

  const selectedItems = getMeet().concat(getVeg());
  const cheeseoptions = document.getElementsByName("cheeseoption");
  for (var topping of cheeseoptions){
    if (topping.checked){
      selectedItems.push(topping);
    }
  }
  const paymentoptions = document.getElementsByName("paymentoption");
  for (var options of paymentoptions){
    if (options.checked){
      selectedItems.push(options);
    }
  }
  selectedItems.sort((a, b)=> (a.value > b.value)? 1 : -1);
  for(var item of selectedItems){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(item.value));
    orderList.append(li);
  }
  
  total.innerHTML = 'Total: ' + calculateTotal() + ' $';
}

function gotoPage(pageNumber){
  switch (pageNumber) {
    case 1:
      document.getElementById("form1").style.display="inherit";
      document.getElementById("form2").style.display = "none";
      document.getElementById("OrderSummary").style.display = "none";
      document.body.style.backgroundColor = "#01dddd";
      break;
    case 2:
      document.getElementById("form1").style.display="none";
      document.getElementById("form2").style.display="inherit";
      document.getElementById("OrderSummary").style.display="none";
      document.body.style.backgroundColor = "#e93a57";
      break;
    case 3:
      document.getElementById("form1").style.display="none";
      document.getElementById("form2").style.display="none";
      document.getElementById("OrderSummary").style.display="inherit";
      document.body.style.backgroundColor = "#3fc38e";
      break;
  }


}

function checkInfo(){
  const form2 = document.getElementById("form2");
    const requiredFields = form2.getElementsByClassName("requiredField");
    for(var field of requiredFields) {
      if (field.value == "") return false;
    }
    return true;
}


document.getElementById("goto2").addEventListener("click", (e) => {
  e.preventDefault();
  gotoPage(2);
});

document.getElementById("goto3").addEventListener("click", (e) => {
  e.preventDefault();
  if (!checkInfo()) {
    alert('Please fill all required fields');
    return;
  }
  gotoPage(3);
  fillSummary();
});

document.getElementById("backto1").addEventListener("click", (e) => {
  e.preventDefault();
  gotoPage(1);
});

document.getElementById("backto2").addEventListener("click", (e) => {
  e.preventDefault();
  gotoPage(2);
});
