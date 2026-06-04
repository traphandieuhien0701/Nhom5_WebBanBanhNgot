// Đếm ngược Flash Sale — cập nhật mỗi giây
function startCountdown(targetHours, targetMinutes, targetSeconds) {
  let total = targetHours * 3600 + targetMinutes * 60 + targetSeconds;

  const h = document.getElementById('cd-h');
  const m = document.getElementById('cd-m');
  const s = document.getElementById('cd-s');

  const interval = setInterval(() => {
    if (total <= 0) { clearInterval(interval); return; }
    total--;

    const hh = Math.floor(total / 3600);
    const mm = Math.floor((total % 3600) / 60);
    const ss = total % 60;

    h.textContent = String(hh).padStart(2, '0');
    m.textContent = String(mm).padStart(2, '0');
    s.textContent = String(ss).padStart(2, '0');
  }, 1000);
}

// Bắt đầu từ 5h 19m 32s
startCountdown(5, 19, 32);