import { useEffect } from 'react'

/**
 * useScrollAnimation — Fixed version
 *
 * Problem with old version: it ran during LoadingScreen (before any .reveal
 * elements existed), found nothing, and never ran again.
 *
 * Fix: uses a MutationObserver to watch for .reveal elements being added to
 * the DOM at any point, then immediately observes them with IntersectionObserver.
 * Also checks elements already in the viewport and shows them instantly.
 */
export function useScrollAnimation() {
  useEffect(() => {
    const SELECTORS = ['.reveal', '.reveal-left', '.reveal-right']

    /* ── IntersectionObserver — makes element visible when scrolled into view ── */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px 100px 0px' }
    )

    /* Track which elements we've already started observing */
    const observed = new WeakSet()

    function observeEl(el) {
      if (observed.has(el)) return
      observed.add(el)

      /* If already visible in viewport — show immediately */
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 100 && rect.bottom > 0) {
        el.classList.add('visible')
      } else {
        io.observe(el)
      }
    }

    /* Observe all existing .reveal elements right now */
    SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(observeEl)
    })

    /* Watch for new .reveal elements added to DOM (e.g. after loading screen) */
    const mo = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return  // skip text nodes
          /* Check the node itself */
          SELECTORS.forEach(sel => {
            if (node.matches && node.matches(sel)) observeEl(node)
          })
          /* Check all descendants */
          SELECTORS.forEach(sel => {
            if (node.querySelectorAll) {
              node.querySelectorAll(sel).forEach(observeEl)
            }
          })
        })
      })
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}