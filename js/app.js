const incomes = [
  new Income("Sueldo", 1100.0),
  new Income("Venta Coche", 1500.0),
];

const EgressS = [new Egress("Renta", 1000.0), new Egress("Ropa", 400)];

let appCharger = () => {
  headCharger();
  incomeCharger();
  egressCharger();
};

let totalincomes = () => {
  let totalIncome = 0;
  for (let income of incomes) {
    totalIncome += income.value;
  }
  return totalIncome;
};

let totalEgress = () => {
  let totalegress = 0;
  for (let egress of EgressS) {
    totalegress += egress.value;
  }
  return totalegress;
};

let headCharger = () => {
  let budget = totalincomes() - totalEgress();
  let percentEegress = totalEgress() / totalincomes();

  document.getElementById("budget").innerHTML = coinFormat(budget);
  document.getElementById("percent").innerHTML = formatPercent(percentEegress);
  document.getElementById("income").innerHTML = coinFormat(totalincomes());
  document.getElementById("egress").innerHTML = coinFormat(totalEgress());
};

const coinFormat = (value) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatPercent = (value) => {
  return value.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const incomeCharger = () => {
  let incomesHTML = "";
  for (let Income of incomes) {
    incomesHTML += createIncomeHTML(Income);
  }
  document.getElementById("list-incomes").innerHTML = incomesHTML;
};

const createIncomeHTML = (Income) => {
  let incomesHTML = `
  <div class="element cleanStyle">
  <div class="element_description">${Income.description}</div>
  <div class="right cleanStyle">
      <div class="element_value">${coinFormat(Income.value)}</div>
      <div class="element_delete">
          <button class="element_delete--btn">
              <ion-icon name="close-circle-outline"
              onclick="incomeDelete(${Income.id})"></ion-icon>
          </button>
      </div>
  </div>
</div>
    `;
  return incomesHTML;
};
const incomeDelete = (id) => {
  console.log(id);
  let deleteIndex = incomes.findIndex((Income) => Income.id === id);
  incomes.splice(deleteIndex, 1);
  headCharger();
  incomeCharger();
};

const egressCharger = () => {
  let egressHTML = "";
  for (let egress of EgressS) {
    egressHTML += createregressHTML(egress);
  }
  document.getElementById("list-egress").innerHTML = egressHTML;
};

const createregressHTML = (egress) => {
  let egressHTML = `
    <div class="element cleanStyle">
                    <div class="element_description">${egress.description}</div>
                    <div class="right cleanStyle">
                        <div class="element_value">- ${coinFormat(
                          egress.value
                        )}</div>
                        <div class="element_percent">${formatPercent(
                          egress.value / totalEgress()
                        )}</div>
                        <div class="element_delete">
                            <button class="element_delete--btn">
                                <ion-icon name="close-circle-outline"
                                onclick="egressDelete(${egress.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>`;
  return egressHTML;
};

const egressDelete = (id) => {
  let deleteIndex = EgressS.findIndex((egress) => egress.id === id);
  EgressS.splice(deleteIndex, 1);
  headCharger();
  egressCharger();
};

let addData = () => {
  let form = document.forms["form"];
  let type = form["type"];
  let description = form["description"];
  let valuE = form["value"];
  if (description.value !== "" && valuE.value !== "") {
    if (type.value === "income") {
      incomes.push(new Income(description.value, +valuE.value));
      headCharger();
      incomeCharger();
    } else if (type.value === "egress") {
      EgressS.push(new Egress(description.value, +valuE.value));
      headCharger();
      egressCharger();
    }
  }
};
