// Heavy Lifting Heroes Chicago — Interactive Main JS
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
      const isActive = navDrawer.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);
      menuToggle.innerHTML = isActive 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    // Close on link click
    navDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navDrawer.classList.remove('active');
        menuToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }

  // Interactive Moving Cost & Crew Estimator Calculator
  const homeSizeSelect = document.getElementById('calcHomeSize');
  const serviceTypeSelect = document.getElementById('calcServiceType');
  const distanceSelect = document.getElementById('calcDistance');
  const crewVal = document.getElementById('calcCrew');
  const truckVal = document.getElementById('calcTruck');
  const hoursVal = document.getElementById('calcHours');
  const waButton = document.getElementById('calcWaBtn');

  function updateEstimate() {
    if (!homeSizeSelect || !serviceTypeSelect || !distanceSelect) return;

    const size = homeSizeSelect.value;
    const service = serviceTypeSelect.value;
    const distance = distanceSelect.value;

    let crew = '2 Movers';
    let truck = '16ft Box Truck';
    let hours = '2 - 3 Hours';

    if (size === 'studio') {
      crew = '2 Movers';
      truck = service === 'labor' ? 'No Truck (Labor Only)' : '16ft Box Truck';
      hours = '2 - 3 Hours';
    } else if (size === '1bed') {
      crew = '2 Movers';
      truck = service === 'labor' ? 'No Truck (Labor Only)' : '18ft Box Truck';
      hours = '2.5 - 4 Hours';
    } else if (size === '2bed') {
      crew = '3 Movers';
      truck = service === 'labor' ? 'No Truck (Labor Only)' : '24ft Box Truck';
      hours = '3.5 - 5 Hours';
    } else if (size === '3bed') {
      crew = '3 - 4 Movers';
      truck = service === 'labor' ? 'No Truck (Labor Only)' : '26ft Box Truck';
      hours = '5 - 7 Hours';
    } else if (size === '4bed') {
      crew = '4 Movers';
      truck = service === 'labor' ? 'No Truck (Labor Only)' : '26ft Heavy Truck';
      hours = '6 - 9 Hours';
    } else if (size === 'office') {
      crew = '4 - 6 Movers';
      truck = service === 'labor' ? 'No Truck (Labor Only)' : 'Commercial Freight';
      hours = 'Custom Commercial Scope';
    }

    if (service === 'specialty') {
      crew = '3 - 4 Heavy Item Specialists';
      truck = 'Hydraulic Liftgate Truck';
    } else if (service === 'assembly') {
      truck = 'Fully Equipped Tool Kit';
    }

    if (crewVal) crewVal.textContent = crew;
    if (truckVal) truckVal.textContent = truck;
    if (hoursVal) hoursVal.textContent = hours;

    if (waButton) {
      const msg = `Hi Heavy Lifting Heroes team! I'm planning a move in Chicago and used your website calculator:%0A- Property Size: ${homeSizeSelect.options[homeSizeSelect.selectedIndex].text}%0A- Service Required: ${serviceTypeSelect.options[serviceTypeSelect.selectedIndex].text}%0A- Move Range: ${distanceSelect.options[distanceSelect.selectedIndex].text}%0A- Estimated Scope: ${crew} | ${truck} (${hours})%0ACould I get a free confirmation quote and check availability?`;
      waButton.href = `https://wa.me/12245781382?text=${msg}`;
    }
  }

  [homeSizeSelect, serviceTypeSelect, distanceSelect].forEach(select => {
    if (select) select.addEventListener('change', updateEstimate);
  });
  updateEstimate();

  // Sticky Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Smooth Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.card, .hero-stat-card, .review-card, .calc-card-container');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});
