import html2pdf from "html2pdf.js";

var opt = {
  margin: 0,
  filename: "FastWayTruckSales.pdf",
  html2canvas: { 
    dpi: 192,
    scale:4,
    letterRendering: true,
    useCORS: true,
    scrollY: 0
  },
  
  jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
};

var report = {
  margin: 0,
  filename: "FastWayTruckSales.pdf",
  html2canvas: { 
    dpi: 192,
    scale:4,
    letterRendering: true,
    useCORS: true,
    scrollY: 0
  },
  pagebreak: { mode: 'avoid-all', before: '#page2el' },
  jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
};

export const print = () => {
  var element = document.querySelector(".pdf-file-download").cloneNode(true);
  element.style.transform = "translateY(-10px)";
  element.classList.remove("shadow-sm");
  element.classList.remove("mt-5");
  var user = element.querySelector(".company-info-top-left");
  user.style.transform = "scale(.8)";
  user.style.marginLeft = "-20px";
  var title = element.querySelectorAll(".pdf-edit-title");
  title.forEach(elem => {
    elem.style.fontSize = ".8rem";
  });

  element.querySelector(".logo-box").style.width = "300px";
  //element.querySelector(".logo-box").style.marginLeft = "-20px";
  element.querySelector(".logo-box").style.marginTop = "20px";
  var smallerText = element.querySelectorAll(".pdf-edit-title-small");
  smallerText.forEach(elem => {
   elem.style.fontSize = ".7rem";
   elem.style.fontWeight = "500";
  });

  var smallerText = element.querySelectorAll(".print-heavy");
  smallerText.forEach(elem => {
   elem.style.fontWeight = "500";
  });



  var smallerText = element.querySelectorAll(".pdf-edit-title");
  smallerText.forEach(elem => {
   elem.style.fontWeight = "600";
  });

  element.querySelectorAll('.light-pd').forEach(elm => {
    elm.style.padding = "9px";
  })

  element.querySelectorAll('.light-padding').forEach(elm => {
    elm.style.padding = "15px 0";
  });

  console.log(element);

  html2pdf().from(element).set(opt).save();
};

export const printReport = () => {
  var element = document.querySelector(".pdf-report-download").cloneNode(true);
  element.style.transform = "translateY(-20px)";
  element.style.padding = "0px";
  element.style.margin = "0px";

  var user = element.querySelectorAll(".font-size-small").forEach(elm => {
    elm.style.transform = "scale(.8)";
  });
  //console.log(element);
  html2pdf().from(element).set(report).save();
}