/**
 * nav.js — 共用導航列邏輯
 * - Active page highlighting based on current URL
 * - Mobile hamburger menu toggle
 * - Smooth scroll behavior for anchor links
 */

(function () {
  'use strict';

  // ============================================
  // Active Page Highlight
  // ============================================

  /**
   * Extracts the filename from a URL path.
   * Works with both http:// and file:// protocols.
   */
  function getFilename(path) {
    if (!path) return '';
    // Remove trailing slash if present
    var cleanPath = path.replace(/\/$/, '');
    // Get the last segment of the path
    var segments = cleanPath.split('/');
    return segments[segments.length - 1] || '';
  }

  function highlightActiveLinks() {
    var currentFilename = getFilename(window.location.pathname);

    // Select all nav links (desktop + mobile overlay)
    var desktopLinks = document.querySelectorAll('.navbar__link');
    var overlayLinks = document.querySelectorAll('.navbar__overlay-link');

    desktopLinks.forEach(function (link) {
      var linkFilename = getFilename(link.getAttribute('href'));
      if (linkFilename && linkFilename === currentFilename) {
        link.classList.add('navbar__link--active');
      } else {
        link.classList.remove('navbar__link--active');
      }
    });

    overlayLinks.forEach(function (link) {
      var linkFilename = getFilename(link.getAttribute('href'));
      if (linkFilename && linkFilename === currentFilename) {
        link.classList.add('navbar__overlay-link--active');
      } else {
        link.classList.remove('navbar__overlay-link--active');
      }
    });
  }

  // ============================================
  // Mobile Menu Toggle
  // ============================================

  function initMobileMenu() {
    var toggle = document.querySelector('.navbar__toggle');
    var overlay = document.querySelector('.navbar__overlay');

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', function () {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      var newState = !isExpanded;

      // Toggle hamburger button state
      toggle.setAttribute('aria-expanded', String(newState));

      // Toggle overlay visibility
      overlay.setAttribute('aria-hidden', String(!newState));

      // Prevent body scroll when menu is open
      document.body.style.overflow = newState ? 'hidden' : '';
    });

    // Close menu when an overlay link is clicked
    var overlayLinks = overlay.querySelectorAll('.navbar__overlay-link');
    overlayLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="#"]');
      if (!link) return;

      var href = link.getAttribute('href');
      // Only handle same-page anchor links
      if (!href || href === '#') return;

      var hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      var pathPart = href.substring(0, hashIndex);
      var hash = href.substring(hashIndex);

      // If there's a path part, check it matches the current page
      if (pathPart) {
        var currentFilename = getFilename(window.location.pathname);
        var linkFilename = getFilename(pathPart);
        if (linkFilename !== currentFilename) return;
      }

      // Find the target element
      var targetId = hash.substring(1);
      if (!targetId) return;

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Update URL hash without jumping
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', hash);
      }
    });
  }

  // ============================================
  // Initialize on DOM Ready
  // ============================================

  function init() {
    highlightActiveLinks();
    initMobileMenu();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
