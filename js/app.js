const incomes = [
  new Income("Sueldo", 1100.0),
  new Income("Venta Coche", 1500.0),
];

const Egress = [new egress("Renta", 1000.0), new egress("Ropa", 400)];

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
  return totalincome;
};

let totalEgress = () => {
  let totalegress = 0;
  for (let egress of egresss) {
    totalegress += egress.value;
  }
  return totalegress;
};

let headCharger = () => {
  let presupuesto = totalincomes() - totalEgress();
  let procentajeegress = totalEgress() / totalincomes();

  document.getElementById("presupuesto").innerHTML = coinFormat(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatPercent(procentajeegress);
  document.getElementById("Income").innerHTML = coinFormat(totalincomes());
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
  <div class="elemento limpiarEstilos">
  <div class="elemento_description">${Income.description}</div>
  <div class="derecha limpiarEstilos">
      <div class="elemento_value">${coinFormat(Income.value)}</div>
      <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
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
  for (let egress of Egress) {
    egressHTML += crearegressHTML(egress);
  }
  document.getElementById("list-egress").innerHTML = egressHTML;
};

const crearegressHTML = (egress) => {
  let egressHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_description">${
                      egress.description
                    }</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_value">- ${coinFormat(
                          egress.value
                        )}</div>
                        <div class="elemento_porcentaje">${formatPercent(
                          egress.value / totalEgress()
                        )}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick="egressDelete(${egress.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>`;
  return egressHTML;
};

const egressDelete = (id) => {
  let deleteIndex = egresss.findIndex((egress) => egress.id === id);
  egresss.splice(deleteIndex, 1);
  headCharger();
  egressCharger();
};

let addData = () => {
  let form = document.forms["form"];
  let type = form["type"];
  let description = form["description"];
  let value = form["value"];
  if (description.value !== "" && value.value !== "") {
    if (type.value === "Income") {
      incomes.push(new Income(description.value, +value.value));
      headCharger();
      incomeCharger();
    } else if (type.value === "egress") {
      egresss.push(new egress(description.value, +value.value));
      headCharger();
      egressCharger();
    }
  }
};
