(function () {
  'use strict';

  const paintings = document.querySelectorAll('.painting'),
      slider = document.querySelector('.paintings');


/*========================
      LAZY LOADING
  =========================*/

  window.addEventListener('load', function() {
    createObserver();
  }, false);

  function createObserver() {
    let observer;
    let options = {
      threshold: [0, 1]
    };

    observer = new IntersectionObserver(handleIntersect, options);
    paintings.forEach(paint => observer.observe(paint));

    function handleIntersect(entries, observer) {
      for (let entry of entries) {
        var el = entry.target;
        var image = document.createElement('img');

          image.src = el.dataset.src;
          el.appendChild(image);

        observer.unobserve(el);
      };
    }
  }



  /*========================
      SLIDER SCROLL EFFECT
  =========================*/


  let ticking = false;


  function onScroll() {
      requestTick();
    }

  function requestTick() {
    if(!ticking) {
      requestAnimationFrame(animateArrayOfItems);
      ticking = true;
    }
  }

  slider.addEventListener('scroll', onScroll, false);

  function animateArrayOfItems() {
    let children = Array.from(slider.children);
    children.forEach(function(child) {
      animate(child);
    });

  }

  // function that calculates the css-transform value
  function map_range(currentPosition, startPoint, finalPoint, startValue, finalValue) {
    return (startValue + (finalValue - startValue) * (currentPosition - startPoint) / (finalPoint - startPoint)).toFixed(8);
  }

  // function that animates the item
  function animate(item) {

      let itemPosition = (item.getBoundingClientRect().left);
      let itemWidth = item.offsetWidth;
      let windowWidth = window.innerWidth;
      let scaling;
      let opacity;

      // check if the item is visible
      let itemInsideWindow = (itemPosition < windowWidth + itemWidth && itemPosition > 0 - itemWidth);
      // and if its visible...
      if (itemInsideWindow) {
	      // calculate the item position by percentage (0% = left of the window, 100% = right of the window)
        let itemXPos = ((100 * (itemPosition + itemWidth/2)) / windowWidth).toFixed(8);
        // animate styles from % to %
        if(itemXPos < 150 && itemXPos > 51) {
          scaling = map_range(itemXPos, 100, 50, 0.8, 1);
          opacity = map_range(itemXPos, 100, 50, 0.75, 1);
          item.style.transform = 'scale(' + scaling + ')';
          item.style.opacity = `${opacity}`;
          item.style.willChange = 'transform, opacity';
        }
        // animate styles from % to %
        else if((itemXPos < 49 && itemXPos > -55)) {
          scaling = map_range(itemXPos, 50, 0, 1, 0.85);
          opacity = map_range(itemXPos, 50, 0, 1, 0.75);
          item.style.transform = 'scale(' + scaling + ')';
          item.style.opacity = `${opacity}`;
          item.style.willChange = 'transform, opacity';
        }
        // set willChange to auto when not visible
        else if (itemXPos > 100) {
          item.style.willChange = 'auto';
        }

      }

      ticking = false;
    }

}());
