const currentVersion = "1.0.7";

const appVersionKey = "appVersion";

function handleBreakingChanges() {
  const appVersion = localStorage.getItem(appVersionKey);

  // run script only if current version is upped
  if (!!appVersion && appVersion === currentVersion) {
    return;
  }

  let nextVerisonCheck = appVersion === "1.0.0" || appVersion === "1.0.1";
  if (nextVerisonCheck) {
    version100();
  }

  nextVerisonCheck = nextVerisonCheck || appVersion === "1.0.2";
  if (nextVerisonCheck) {
    version102();
  }

  nextVerisonCheck = nextVerisonCheck || appVersion === "1.0.3";
  if (nextVerisonCheck) {
    version103();
  }

  nextVerisonCheck = nextVerisonCheck || appVersion === "1.0.4";
  if (nextVerisonCheck) {
    version104();
  }

  nextVerisonCheck = nextVerisonCheck || appVersion === "1.0.5";
  if (nextVerisonCheck) {
    version105();
  }

  nextVerisonCheck = nextVerisonCheck || appVersion === "1.0.6";
  if (nextVerisonCheck) {
    version106();
  }

  nextVerisonCheck = nextVerisonCheck || appVersion === "1.0.7";
  if (nextVerisonCheck) {
    version107();
  }

  localStorage.setItem(appVersionKey, currentVersion);
}

function version100() {
  // delete appLayout and subLayout from local storage
  localStorage.removeItem("tabLayout");
  localStorage.removeItem("subLayout");
  localStorage.removeItem("gridsLayout");
  localStorage.removeItem("booksLayout");
}

function version102() {
  localStorage.removeItem("homeLayout");
  localStorage.removeItem("pricingLayout");
}

function version103() {
  localStorage.removeItem("homeLayout");
  localStorage.removeItem("pricingLayout");
}

function version104() {
  localStorage.removeItem("homeLayout");
  localStorage.removeItem("pricingLayout");
}

function version105() {
  localStorage.removeItem("homeLayout");
  localStorage.removeItem("pricingLayout");
  localStorage.removeItem("persist:root");
}

function version106() {
  localStorage.removeItem("pricingLayout");
}

function version107() {
  localStorage.removeItem("persist:root");
}

export default handleBreakingChanges;
