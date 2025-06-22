Document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointment-form");
  const tableBody = document.querySelector("#appointment-table tbody");

  // حاول تجيب المواعيد المتخزنة، ولو مفيش، ابدأ بقايمة فاضية
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  // دالة لحفظ المواعيد في ذاكرة المتصفح
  function saveAppointments() {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }

  // دالة لعرض كل المواعيد في الجدول
  function renderAppointments() {
    tableBody.innerHTML = ""; // امسح الجدول القديم عشان تعرض الجديد

    appointments.forEach((appt, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${appt.name}</td>
        <td>${appt.phone}</td>
        <td>${appt.account}</td>
        <td>${appt.date}</td>
        <td>${appt.timeFrom}</td>
        <td>${appt.timeTo}</td>
        <td>${appt.note}</td>
        <td><button class="delete-btn" data-index="${index}">حذف</button></td>
      `;
      tableBody.appendChild(row);
    });

    // إضافة مستمعين لزرار الحذف بعد ما تتعرض المواعيد
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const indexToDelete = e.target.dataset.index;
        deleteAppointment(indexToDelete);
      });
    });
  }

  // دالة لحذف موعد
  function deleteAppointment(index) {
    // إزالة الموعد من القايمة بناءً على الـ index بتاعه
    appointments.splice(index, 1);
    saveAppointments(); // احفظ القايمة بعد الحذف
    renderAppointments(); // اعرض الجدول تاني بعد الحذف
  }

  // لما تدوس على زرار "إضافة الموعد"
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // وقف السلوك الافتراضي للفورم (اللي هو بيعمل ريفرش للصفحة)

    // جمع كل البيانات من الحقول
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const account = document.getElementById("account").value;
    const date = document.getElementById("date").value;
    const timeFrom = document.getElementById("time-from").value;
    const timeTo = document.getElementById("time-to").value;
    const note = document.getElementById("note").value;

    // اعمل Object جديد للموعد
    const newAppointment = {
      name,
      phone,
      account,
      date,
      timeFrom,
      timeTo,
      note
    };

    // ضيف الموعد الجديد للقايمة
    appointments.push(newAppointment);
    saveAppointments(); // احفظ القايمة بالموعد الجديد
    renderAppointments(); // اعرض الجدول تاني عشان الموعد الجديد يظهر
    form.reset(); // فضي كل الحقول في الفورم عشان تضيف موعد جديد
  });

  // اول ما الصفحة تحمل، اعرض المواعيد اللي كانت متخزنة
  renderAppointments();
});
