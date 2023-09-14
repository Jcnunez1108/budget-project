const ingresos = [
  new Ingreso("Sueldo", 1100.0),
  new Ingreso("Venta Coche", 1500.0),
];

const Egresos = [new Egreso("Renta", 1000.0), new Egreso("Ropa", 400)];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of Egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let procentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(procentajeEgreso);
  document.getElementById("ingreso").innerHTML = formatoMoneda(totalIngresos());
  document.getElementById("egreso").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresosHTML = `
  <div class="elemento limpiarEstilos">
  <div class="elemento_descripcion">${ingreso.descripcion}</div>
  <div class="derecha limpiarEstilos">
      <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
              <ion-icon name="close-circle-outline"
              onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
          </button>
      </div>
  </div>
</div>
    `;
  return ingresosHTML;
};
const eliminarIngreso = (id) => {
  console.log(id);
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
};

const cargarEgresos = () => {
  let egresoHTML = "";
  for (let egreso of Egresos) {
    egresoHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresoHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${
                      egreso.descripcion
                    }</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">- ${formatoMoneda(
                          egreso.valor
                        )}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(
                          egreso.valor / totalEgresos()
                        )}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick="eliminarEgreso(${
                                  egreso.id
                                })"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>`;
  return egresoHTML;
};

const eliminarEgreso = (id) => {
  let indiceEliminar = Egresos.findIndex((egreso) => egreso.id === id);
  Egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
};

let agregarDato = () => {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if (descripcion.value !== "" && valor.value !== "") {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
    } else if (tipo.value === "egreso") {
      Egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  }
};
