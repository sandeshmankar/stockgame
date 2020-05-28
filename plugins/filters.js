import Vue from "vue";

// First Digit
Vue.filter("firstDigit", value => {
  if (!value) return "";
  value = value.toString();
  let first = value[value.length - 2];
  let result = `<span >${first}</span>`;
  return result;
});

//Last Digit
Vue.filter("lastDigit", value => {
  if (!value) return "";
  value = value.toString();
  let last = value[value.length - 1];
  return `<span >${last}</span>`;
});

//Both Digit
Vue.filter("bothDigit", value => {
  if (!value) return "";
  value = value.toString();
  let first = value[value.length - 2];
  let last = value[value.length - 1];
  let result = Number(first) + Number(last);
  return `<span >${result}</span>`;
});

//Two Digit
Vue.filter("twoDigit", value => {
  if (!value) return "";
  value = value.toString();
  let first = value[value.length - 2];
  let last = value[value.length - 1];
  return `<span >${first}${last}</span>`;
});
// set color for lottery draw
Vue.filter("lastDraw2", value => {
  if (!value) return "";
  value = value.toString();
  let result = "." + value.split(".")[1];
  return result;
});

// set color for lottery draw
Vue.filter("lastDraw", value => {
  if (!value) return "";
  value = value.toString();
  let f = value[value.length - 2];
  let l = value[value.length - 1];
  let newS2 = value.substring(0, value.length - 2);
  let result = `${newS2}<span style="color:#ce3b6a;font-weight: bold;">${f}${l}</span>`;
  return result;
});
// currency format
Vue.filter("currency", (value, decimalCount = 2) => {
  if (!value) return "...";
  return formatCurrency(value, decimalCount);
});
// countdown bet close in
Vue.filter("betclosein", (value, loop) => {
  if (!value || !loop) return "...";
  if (value.stockStatus == "Closed") return "MARKET CLOSE";
  let result = "";
  // for  loop 1
  if (loop == 1) {
    // bet close
    if (value <= 20) {
      result =  window.$nuxt.$root.$t('msg.calculating');
    } else {
      result = "00:" + appendHero(value - 20);
    }
  }
  // for loop 5
  else {
    // bet close
    if (value <= 60) {
      result = "Calculating";
    } else {
      // let mm = "0" + parseInt(value / 60)
      // let ss = value % 60
      // result = mm + ":" + appendHero(ss)
      result = changeNumberToTime(value - 60);
    }
  }
  return result;
});
// set second to minute for 5 minute loop game
Vue.filter("lotterydraw", (value, loop) => {
  if (!value | !loop) return "...";
  if (value == "close") return "...";
  let result = "";
  // lottery draw loop 1 min
  if (loop == 1) {
    // if (value > 40) {
    //   value = value + 40 - 80;
    // } else {
    //   value = value + 20;
    // }
    result = "00:" + appendHero(value);
    // lottery draw loop 5 min
  } else {
    // if (value > 240) {
    //   value = value + 60 - 300;
    // } else {
    //   value = value + 60;
    // }
    result = changeNumberToTime(value);
  }
  return result;
});
// set bet status
Vue.filter("betstatus", (value, loop) => {
  if (!value | !loop) return "";
  if (value === "close") return "close";
  let result = "error";
  if (loop == 1) {
    if (value <= 20) {
      result = window.$nuxt.$root.$t("msg.calculating");
    } else {
      result = window.$nuxt.$root.$t("msg.accepting");
    }
  } else if (loop == 5) {
    if (value <= 60) {
      result = window.$nuxt.$root.$t("msg.calculating");
    } else {
      result = window.$nuxt.$root.$t("msg.accepting");
    }
  }
  return result;
});
// convert second to minute
function changeNumberToTime(value) {
  let result = "";
  let mm = "0" + parseInt(value / 60);
  let ss = value % 60;
  result = mm + ":" + appendHero(ss);
  return result;
}
// append 0 infort if number <=9
function appendHero(value) {
  let result = "";
  if (value < 10) {
    result = "0" + value;
  } else {
    result = value;
  }
  return result;
}
// set number format currency
function formatCurrency(
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}
// set color live price green or red
Vue.filter("livePriceColor", (current, previous) => {
  if (!current) return "";
  let color;
  current = current.replace(",", "");
  previous = previous.replace(",", "");
  if (parseFloat(current) > parseFloat(previous)) {
    color = "green";
  } else if (parseFloat(current) < parseFloat(previous)) {
    color = "red";
  }
  return `<span style="color:${color}">${current}<span hidden>${color}</span></span>`;
});

