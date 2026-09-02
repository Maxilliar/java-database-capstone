function renderFooter() {
  // Access the Footer Container
  const footer = document.getElementById("footer");

  // Safety check to ensure the element exists on the current page
  if (!footer) return;

  // Inject HTML Content
  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-container">
        
        <!-- Branding Section -->
        <div class="footer-logo">
          <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo">
          <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
        </div>
        
        <!-- Links Section -->
        <div class="footer-links">
          
          <!-- Company Links Column -->
          <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          
          <!-- Support Links Column -->
          <div class="footer-column">
            <h4>Support</h4>
            <a href="#">Account</a>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>
          
          <!-- Legals Links Column -->
          <div class="footer-column">
            <h4>Legals</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Licensing</a>
          </div>
          
        </div>
        
      </div>
    </footer>
  `;
}

// Call the function to populate the footer when the script loads
renderFooter();
