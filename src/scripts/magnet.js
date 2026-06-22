document.querySelectorAll('[data-magnet]').forEach((el) => {
  const strength = parseFloat(el.dataset.magnetStrength) || 0.25;

  el.addEventListener('mouseenter', () => {
    el.style.setProperty('transition', 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
  });

  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.setProperty('transform', `translate(${x * strength}px, ${y * strength}px)`);
  });

  el.addEventListener('mouseleave', () => {
    el.style.setProperty('transition', 'transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)');
    el.style.setProperty('transform', 'translate(0, 0)');
  });
});
