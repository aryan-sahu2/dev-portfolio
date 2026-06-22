import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.from('[data-gsap-hero]', {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out',
});

gsap.utils.toArray('[data-gsap-section]').forEach((section) => {
  gsap.from(section.querySelector('[data-gsap-fade]'), {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
});

const terminalSection = document.getElementById('logs');
if (terminalSection) {
  gsap.from(terminalSection.querySelector('.caption-mono'), {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: terminalSection,
      start: 'top 80%',
    },
  });
  gsap.from(terminalSection.querySelector('.display-md'), {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: terminalSection,
      start: 'top 80%',
    },
  });
  gsap.from(terminalSection.querySelector('.body-lg'), {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: terminalSection,
      start: 'top 80%',
    },
  });
  gsap.from(terminalSection.querySelector('[data-gsap-fade]'), {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: terminalSection,
      start: 'top 80%',
    },
  });
}
