/* ── Booking: Dynamic Price Calculator ── */
(function () {
  var checkboxes = document.querySelectorAll('#booking-form input[type="checkbox"]');
  var totalBox = document.getElementById('total-box');
  var priceLines = document.getElementById('price-lines');
  var discountLine = document.getElementById('discount-line');
  var discountLabel = document.getElementById('discount-label');
  var discountAmount = document.getElementById('discount-amount');
  var totalAmount = document.getElementById('total-amount');
  var paymentInstructions = document.getElementById('payment-instructions');
  var bookingTotalInput = document.getElementById('booking-total');
  var selectedServicesInput = document.getElementById('selected-services-text');

  function updatePricing() {
    var selected = [];
    checkboxes.forEach(function (cb) {
      if (cb.checked) {
        selected.push({ price: parseInt(cb.dataset.price, 10), label: cb.dataset.label });
      }
    });

    if (selected.length === 0) {
      totalBox.style.display = 'none';
      paymentInstructions.style.display = 'none';
      return;
    }

    totalBox.style.display = 'block';
    paymentInstructions.style.display = 'block';

    var subtotal = selected.reduce(function (sum, s) { return sum + s.price; }, 0);

    var discount = 0;
    var serviceCount = selected.filter(function (s) { return s.price >= 65; }).length;
    if (serviceCount >= 3) {
      discount = 30;
      discountLabel.textContent = 'Bundle Discount (3+ services)';
    } else if (serviceCount >= 2) {
      discount = 15;
      discountLabel.textContent = 'Bundle Discount (2 services)';
    }

    var total = subtotal - discount;

    priceLines.innerHTML = selected.map(function (s) {
      return '<div class="total-line"><span>' + s.label + '</span><span>$' + s.price + '</span></div>';
    }).join('');

    if (discount > 0) {
      discountLine.style.display = 'flex';
      discountAmount.textContent = '-$' + discount;
    } else {
      discountLine.style.display = 'none';
    }

    totalAmount.textContent = '$' + total;
    bookingTotalInput.value = '$' + total;
    selectedServicesInput.value = selected.map(function (s) { return s.label; }).join(', ');
  }

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      var item = cb.closest('.checkbox-item');
      if (item) item.classList.toggle('checked', cb.checked);
      updatePricing();
    });
  });

  /* ── Booking Form AJAX Submission ── */
  var bookingForm = document.getElementById('booking-form');
  var bookingSuccess = document.getElementById('booking-success');
  var bookingError = document.getElementById('booking-error');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      bookingSuccess.style.display = 'none';
      bookingError.style.display = 'none';

      fetch('/', {
        method: 'POST',
        body: new FormData(bookingForm)
      })
      .then(function (res) {
        if (res.ok) {
          bookingSuccess.style.display = 'block';
          bookingForm.reset();
          checkboxes.forEach(function (cb) {
            var item = cb.closest('.checkbox-item');
            if (item) item.classList.remove('checked');
          });
          totalBox.style.display = 'none';
          paymentInstructions.style.display = 'none';
          bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          bookingError.style.display = 'block';
        }
      })
      .catch(function () {
        bookingError.style.display = 'block';
      });
    });
  }
})();

/* ── Contact Form AJAX Submission ── */
(function () {
  var contactForm = document.getElementById('contact-form');
  var contactSuccess = document.getElementById('contact-success');
  var contactError = document.getElementById('contact-error');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactSuccess.style.display = 'none';
      contactError.style.display = 'none';

      fetch('/', {
        method: 'POST',
        body: new FormData(contactForm)
      })
      .then(function (res) {
        if (res.ok) {
          contactSuccess.style.display = 'block';
          contactForm.reset();
          contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          contactError.style.display = 'block';
        }
      })
      .catch(function () {
        contactError.style.display = 'block';
      });
    });
  }
})();

/* ── Mobile Nav Toggle ── */
(function () {
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }
})();
