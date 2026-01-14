// Base Component Logic
import { getTimeRemaining } from './utils.js';

export const initCountdowns = (selector = '.js-countdown') => {
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    const deadline = el.getAttribute('data-expires');
    if (!deadline) return;

    const updateClock = () => {
      const t = getTimeRemaining(deadline);

      if (t.total <= 0) {
        clearInterval(timeinterval);
        el.innerHTML = '<span class="text-danger">EXPIRED</span>';
        return;
      }

      // If we have days, show days/hours, else hours/minutes/seconds
      let html = '';
      if (t.days > 0) {
         html += `
           <div class="countdown__unit">
             <span class="countdown__value">${t.days}</span>
             <span class="countdown__label">days</span>
           </div>
           <div class="countdown__separator">:</div>
         `;
      }

      html += `
        <div class="countdown__unit">
          <span class="countdown__value">${('0' + t.hours).slice(-2)}</span>
          <span class="countdown__label">hrs</span>
        </div>
        <div class="countdown__separator">:</div>
        <div class="countdown__unit">
          <span class="countdown__value">${('0' + t.minutes).slice(-2)}</span>
          <span class="countdown__label">min</span>
        </div>
      `;

      // Only show seconds if less than 1 hour or specifically requested
      if (t.days === 0 && t.hours === 0) {
          html += `
            <div class="countdown__separator">:</div>
            <div class="countdown__unit">
              <span class="countdown__value">${('0' + t.seconds).slice(-2)}</span>
              <span class="countdown__label">sec</span>
            </div>
          `;
      }

      el.innerHTML = html;
    };

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  });
};

// Simple Tabs Implementation
export const initTabs = () => {
    const triggers = document.querySelectorAll('[data-tab-target]');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Remove active from all triggers in this group
            const group = trigger.closest('.tabs-group');
            if (group) {
                group.querySelectorAll('[data-tab-target]').forEach(t => t.classList.remove('tab--active'));
            }
            trigger.classList.add('tab--active');

            // Hide all contents, show target
            const target = document.querySelector(trigger.dataset.tabTarget);
            if (target) {
                const contentGroup = target.closest('.tabs-content-group');
                if (contentGroup) {
                    contentGroup.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
                }
                target.style.display = 'block';
            }
        });
    });
};
