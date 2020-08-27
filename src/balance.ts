let balance = 150;

export const incrementBalance = (value: number) => {
  balance += value;
  document.getElementById("balance").children[0].innerHTML = balance.toString();
};

export const decreaseBalance = (value: number) => {
  balance -= value;
  document.getElementById("balance").children[0].innerHTML = balance.toString();
};
