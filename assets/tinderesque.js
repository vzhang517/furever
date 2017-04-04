(function(){
  var animating = false;

  function animatecard(ev) {
    if (animating === false) {
      //element that triggered the event 
      var button = ev.target;
      if (button.className === 'no') {
        // add class nope to parent div .cardcontainer
        button.parentNode.classList.add('nope');
        animating = true;
        //send a reference to the button that was clicked, the container element, and a copy of the current card
        // allows you to read card before it gets removed from document?
        fireCustomEvent('nopecard',
          {
            origin: button,
            container: button.parentNode,
            item: button.parentNode.querySelector('.item')
          }
        );
      }
      if (button.className === 'yes') {
        button.parentNode.classList.add('yes');
        animating = true;
        fireCustomEvent('yepcard',
          {
            origin: button,
            container: button.parentNode,
            item: button.parentNode.querySelector('.item')

          }
        );
      }
      if (button.classList.contains('current')) {
        fireCustomEvent('cardchosen',
          {
            container: getContainer(button),
            item: button
          }
        );
      }
    }
  }
  // custom event fires when things happen to cards
  // get a payload that you can define
  function fireCustomEvent(name, payload) {
    var newevent = new CustomEvent(name, {
      detail: payload
    });
    document.body.dispatchEvent(newevent);
  }

  function getContainer(elm) {
    var origin = elm.parentNode;
    if (!origin.classList.contains('cardcontainer')){
      origin = origin.parentNode;
    }
    return origin;
  }

  function animationdone(ev) {
    animating = false;
    // get the container of the button
    var origin = getContainer(ev.target);
    if (ev.animationName === 'yay') {
      origin.classList.remove('yes');

      //grabbing the child div instead of the li might fix this
      // look into selecting child node?
      $("#favorited").append(origin.querySelector('.current'));
    }
    if (ev.animationName === 'nope') {
      origin.classList.remove('nope');
      origin.querySelector('.current').remove();
    }
    if (origin.classList.contains('list')) {
      if (ev.animationName === 'nope' ||
          ev.animationName === 'yay') {
        //if the deck is empty, show favorites page
        if (!origin.querySelector('.item')) {
          fireCustomEvent('deckempty', {
            origin: origin.querySelector('button'),
            container: origin,
            item: null
          });
          $("#resultsPage").css("display", "none");
          $("#favoritesPage").css("display", "inline"); 
        } else {
          //else add current to the next li 
          origin.querySelector('.item').classList.add('current');
        }
      }
    }
  }
  document.body.addEventListener('animationend', animationdone);
  document.body.addEventListener('webkitAnimationEnd', animationdone);
  document.body.addEventListener('click', animatecard);
  window.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('tinderesque');
  });
})();



  
