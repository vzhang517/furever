(function(){
  var animating = false;

  function animatecard(ev) {
    if (animating === false) {
      var t = ev.target;
      if (t.className === 'but-nope') {
        t.parentNode.classList.add('nope');
        animating = true;
        fireCustomEvent('nopecard',
          {
            origin: t,
            container: t.parentNode,
            item: t.parentNode.querySelector('.item')
          }
        );
      }
      if (t.className === 'but-yay') {
        t.parentNode.classList.add('yes');
        animating = true;
        fireCustomEvent('yepcard',
          {
            origin: t,
            container: t.parentNode,
            item: t.parentNode.querySelector('.item')
          }
        );
      }
      if (t.classList.contains('current')) {
        fireCustomEvent('cardchosen',
          {
            container: getContainer(t),
            item: t
          }
        );
      }
    }
  }

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
    var origin = getContainer(ev.target);
    if (ev.animationName === 'yay') {
      origin.classList.remove('yes');
    }
    if (ev.animationName === 'nope') {
      origin.classList.remove('nope');
    }
    if (origin.classList.contains('list')) {
      if (ev.animationName === 'nope' ||
          ev.animationName === 'yay') {
        origin.querySelector('.current').remove();
        if (!origin.querySelector('.item')) {
          fireCustomEvent('deckempty', {
            origin: origin.querySelector('button'),
            container: origin,
            item: null
          });
        } else {
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