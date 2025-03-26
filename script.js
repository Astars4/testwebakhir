document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline li");
  const timelineWrapper = document.querySelector(".timeline-wrapper");
  const timeline = document.querySelector(".timeline");

  let currentPosition = 0;
  let activeItem = null;

  // Initialize timeline
  function initTimeline() {
    // Set first item as active
    if (timelineItems.length > 0) {
      setActiveItem(timelineItems[0]);
    }

    // Center the timeline
    centerTimeline();
  }

  // Set active item
  function setActiveItem(item) {
    if (activeItem) {
      activeItem.classList.remove("active");
    }

    item.classList.add("active");
    activeItem = item;

    // Center the active item
    centerActiveItem();
  }

  // Center the active item in view
  function centerActiveItem() {
    if (!activeItem) return;

    const wrapperWidth = timelineWrapper.clientWidth;
    const itemOffset = activeItem.offsetLeft;
    const itemWidth = activeItem.clientWidth;

    currentPosition = -(itemOffset - wrapperWidth / 2 + itemWidth / 2);
    updateTimelinePosition();
  }

  // Center the timeline on load
  function centerTimeline() {
    const wrapperWidth = timelineWrapper.clientWidth;
    const timelineWidth = timeline.scrollWidth;

    currentPosition = -(timelineWidth - wrapperWidth) / 2;
    updateTimelinePosition();
  }

  // Update timeline position
  function updateTimelinePosition() {
    const timelineWidth = timeline.scrollWidth;
    const wrapperWidth = timelineWrapper.clientWidth;

    // Limit scrolling
    const maxPosition = 0;
    const minPosition = -(timelineWidth - wrapperWidth);

    currentPosition = Math.min(
      maxPosition,
      Math.max(minPosition, currentPosition)
    );

    timeline.style.transform = `translateX(${currentPosition}px) translateY(-50%)`;
  }

  // Event listeners for timeline items
  timelineItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (item === activeItem) {
        item.classList.remove("active");
        activeItem = null;
      } else {
        setActiveItem(item);
      }
    });

    // Close button
    const closeBtn = item.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        item.classList.remove("active");
        activeItem = null;
      });
    }
  });

  // Keyboard arrow navigation
  document.addEventListener("keydown", function (e) {
    const wrapperWidth = timelineWrapper.clientWidth;

    if (e.key === "ArrowLeft") {
      // Move timeline to the left
      currentPosition += wrapperWidth * 0.5;
      updateTimelinePosition();
    } else if (e.key === "ArrowRight") {
      // Move timeline to the right
      currentPosition -= wrapperWidth * 0.5;
      updateTimelinePosition();
    }
  });

  // Touch and mouse events for horizontal scrolling
  let isDragging = false;
  let startX;
  let startPosition;

  timelineWrapper.addEventListener("mousedown", startDrag);
  timelineWrapper.addEventListener("touchstart", startDrag);

  timelineWrapper.addEventListener("mousemove", drag);
  timelineWrapper.addEventListener("touchmove", drag);

  timelineWrapper.addEventListener("mouseup", endDrag);
  timelineWrapper.addEventListener("touchend", endDrag);
  timelineWrapper.addEventListener("mouseleave", endDrag);

  function startDrag(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    startPosition = currentPosition;
    timelineWrapper.style.cursor = "grabbing";
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;

    const x = e.clientX || e.touches[0].clientX;
    const dx = x - startX;
    currentPosition = startPosition + dx;
    updateTimelinePosition();
  }

  function endDrag() {
    isDragging = false;
    timelineWrapper.style.cursor = "grab";
  }

  // Initialize
  initTimeline();

  // Handle window resize
  window.addEventListener("resize", function () {
    centerTimeline();
    if (activeItem) {
      centerActiveItem();
    }
  });
});
