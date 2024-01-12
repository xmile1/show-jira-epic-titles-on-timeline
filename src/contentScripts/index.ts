// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const element = document.querySelectorAll('[data-testid^="roadmap.timeline-table-kit.ui.list-item-content.summary.title"]')
        if (element.length) {
          element.forEach((el) => {
            const parent = el.closest('[data-test-id^="roadmap.timeline-table.components.list-item.container-"]')

            if (parent) {
              const idNumber = parent.getAttribute('data-test-id')?.split('-').pop()
              const barElement = document.querySelector(`[data-testid="roadmap.timeline-table-kit.ui.chart-item-content.date-content.bar.draggable-bar-${idNumber}"]`)
              if (barElement) {
                const isInjected = barElement.querySelector('.injected-by-show-jira-epic-names')
                if (isInjected)
                  return

                const span = document.createElement('span')
                span.style.display = 'block'
                span.style.paddingLeft = '8px'
                span.style.textAlign = 'center'
                span.style.color = 'white'
                span.style.overflow = 'hidden'
                span.style.textOverflow = 'ellipsis'
                span.style.whiteSpace = 'nowrap'

                span.setAttribute('title', el.textContent || '')
                span.classList.add('injected-by-show-jira-epic-names')
                span.textContent = el.textContent || ''
                barElement.firstChild?.appendChild(span)
              }
            }
          })
          return
        }
      }
    }
  })

  observer.observe(document, { attributes: false, childList: true, subtree: true })
})()
