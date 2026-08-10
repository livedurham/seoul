const filterButtons = document.querySelectorAll('[data-filter]');
    const itineraryItems = document.querySelectorAll('.timeline-item');
    const dayBlocks = document.querySelectorAll('[data-day-block]');
    const dailyToggle = document.getElementById('dailyToggle');
    const daySelector = document.getElementById('daySelector');
    const dayButtons = document.querySelectorAll('.day-btn');
    const emptyState = document.getElementById('emptyState');
    let activeFilter = 'all';
    let dailyMode = false;
    let activeDay = '1';

    function updateView() {
      let visibleCount = 0;
      dayBlocks.forEach(block => {
        const dayVisible = !dailyMode || block.dataset.dayBlock === activeDay;
        block.hidden = !dayVisible;
        if (!dayVisible) return;

        let visibleInDay = 0;
        block.querySelectorAll('.timeline-item').forEach(item => {
          const categories = item.dataset.category.split(' ');
          const match = activeFilter === 'all' || categories.includes(activeFilter);
          item.hidden = !match;
          if (match) { visibleInDay += 1; visibleCount += 1; }
        });
        block.hidden = visibleInDay === 0;
      });
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
        updateView();
      });
    });

    dailyToggle.addEventListener('click', () => {
      dailyMode = !dailyMode;
      dailyToggle.classList.toggle('active', dailyMode);
      dailyToggle.setAttribute('aria-pressed', String(dailyMode));
      dailyToggle.textContent = dailyMode ? `Day ${activeDay} · Daily` : 'Daily Mode';
      daySelector.hidden = !dailyMode;
      updateView();
      if (dailyMode) document.getElementById('itinerary').scrollIntoView({ behavior: 'smooth' });
    });

    dayButtons.forEach(button => {
      button.addEventListener('click', () => {
        activeDay = button.dataset.day;
        dayButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn === button)));
        dailyToggle.textContent = `Day ${activeDay} · Daily`;
        updateView();
      });
    });
