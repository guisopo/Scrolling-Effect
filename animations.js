(function () {
  'use strict';

  var paintings = document.querySelectorAll('.painting'),
      slider = document.querySelector('.paintings');


/*========================
      LAZY LOADING
  =========================*/

  window.addEventListener('load', function(event) {
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


  var ticking = false;


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
    var children = Array.from(slider.children);
    children.forEach(function(child) {
      animate(child);
    });

  }


  function map_range(currentPosition, startPoint, finalPoint, startValue, finalValue) {
    return (startValue + (finalValue - startValue) * (currentPosition - startPoint) / (finalPoint - startPoint)).toFixed(8);
  }


  function animate(item) {

      var itemPosition = (item.getBoundingClientRect().left);
      var itemWidth = item.offsetWidth;
      var windowWidth = window.innerWidth;
      var scaling;
      var opacity;

      var itemInsideWindow = (itemPosition < windowWidth + itemWidth && itemPosition > 0 - itemWidth);

      if (itemInsideWindow) {
	      
        var itemXPos = ((100 * (itemPosition + itemWidth/2)) / windowWidth).toFixed(8);
        
        if(itemXPos < 150 && itemXPos > 51) {
          scaling = map_range(itemXPos, 100, 50, 0.8, 1);
          opacity = map_range(itemXPos, 100, 50, 0.75, 1);
          item.style.transform = 'scale(' + scaling + ')';
          item.style.opacity = `${opacity}`;
          item.style.willChange = 'transform, opacity';
        }

        else if((itemXPos < 49 && itemXPos > -55)) {
          scaling = map_range(itemXPos, 50, 0, 1, 0.85);
          opacity = map_range(itemXPos, 50, 0, 1, 0.75);
          item.style.transform = 'scale(' + scaling + ')';
          item.style.opacity = `${opacity}`;
          item.style.willChange = 'transform, opacity';
        }
        
        else if (itemXPos > 100) {
          item.style.willChange = 'auto';
        }
        
      }

      ticking = false;
    }



}());



















//
//
// // ANIMATION PART
//
//
//
//   function onScroll() {
//     requestTick();
//   }
//
//   function requestTick() {
//     if(!ticking) {
//       requestAnimationFrame(animate);
//       ticking = true;
//     }
//   }
//
//   function map_range(actualPosition, startingPoint, endingPoint, startingValue, endingValue) {
//     return (startingValue + (endingValue - startingValue) * (actualPosition - startingPoint) / (endingPoint - startingPoint));
//   }
//
//   function animate() {
//     paintings.forEach(function(paint) {
//
//       paintingPosition = (paint.getBoundingClientRect().left);
//
//       if (paintingPosition < windowWidth + paint.offsetWidth && paintingPosition > 0 - paint.offsetWidth) {
//
//         var xPos = ((100 * (paintingPosition + paint.offsetWidth/2)) / windowWidth);
//
//         if(xPos < 100 && xPos > 52.5) {
//           var scalingUp = map_range(xPos, 100, 52.5, 0.95, 1.1);
//           var clarity = map_range(xPos, 100, 52.5, 0.5, 1.1);
//           paint.style.transform = 'translateX(500px) scale(' + scalingUp + ')';
//           paint.style.opacity = `${clarity}`;
//           paint.style.willChange = 'transform, opacity';
//         }
//
//         else if((xPos < 47.5 && xPos > 0)) {
//           var scalingDown = map_range(xPos, 47.5, 0, 1.1, 0.95);
//           var obscurity = map_range(xPos, 47.5, 0, 1.1, 0.5);
//           paint.style.transform = 'translateX(500px) scale(' + scalingDown + ')';
//           paint.style.opacity = `${obscurity}`;
//           paint.style.willChange = 'transform, opacity';
//         }
//         else if (xPos > 100) {
//
//           paint.style.willChange = 'auto';
//         }
//       }
//
//     });
//     ticking = false;
//   }
//
//
//   paints.addEventListener('scroll', onScroll, false);
//
// }());
