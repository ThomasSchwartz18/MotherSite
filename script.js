function toggleNav() {
    var navBar = document.getElementById('nav-bar');
    var navMessage = document.getElementById('nav-message');
    navBar.classList.toggle('active');

    // Check for a container element (either #content or #about-section)
    var container = document.getElementById('content') || document.getElementById('about-section');
    if (container) {
        container.classList.toggle('shift');
    }
    
    if (navBar.classList.contains('active')) {
        // Instead of hiding immediately, add the "hidden" class to animate fade and shrink.
        navMessage.classList.add('hidden');
    } else {
        navMessage.classList.remove('hidden');
    }
}

function toggleDropdown(event) {
    event.preventDefault();
    var dropdown = event.target.closest('.dropdown');
    dropdown.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const loadingIndicator = document.getElementById('loading-indicator');
    const feedback = document.getElementById('form-feedback');
    
    let loadingInterval;
  
    function startLoading() {
      loadingIndicator.style.display = 'inline';
      let dots = 0;
      loadingIndicator.textContent = '';
      loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4; // cycle from 0 to 3 dots
        loadingIndicator.textContent = '.'.repeat(dots);
      }, 500); // update every 500ms
    }
    
    function stopLoading() {
      clearInterval(loadingInterval);
      loadingIndicator.style.display = 'none';
      loadingIndicator.textContent = '';
    }
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Disable the button to prevent additional clicks
        submitBtn.disabled = true;
        feedback.innerHTML = ''; // clear previous messages
        startLoading();
        
        // Collect form data
        const formData = new FormData(contactForm);
        
        // Use fetch to send data to FormSubmit
        fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          stopLoading();
          // Re-enable the button
          submitBtn.disabled = false;
          if (response.ok) {
            feedback.innerHTML = '<p style="color: green;">Message sent!</p>';
            contactForm.reset();
          } else {
            return response.json().then(data => {
              if (data.errors) {
                feedback.innerHTML = '<p style="color: red;">' + data.errors.join(", ") + '</p>';
              } else {
                feedback.innerHTML = '<p style="color: red;">Oops! There was a problem submitting your form.</p>';
              }
            });
          }
        })
        .catch(error => {
          stopLoading();
          submitBtn.disabled = false;
          console.error('Error:', error);
          feedback.innerHTML = '<p style="color: red;">Oops! There was a problem submitting your form.</p>';
        });
      });
    }
  });
  