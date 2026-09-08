/* =========================================
   NEXORA AI — PREMIUM INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     1. MOBILE NAVIGATION
     ----------------------------------------- */

  const menuBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });
  }


  /* -----------------------------------------
     2. SMOOTH SCROLL
     ----------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* -----------------------------------------
     3. NAVBAR SCROLL EFFECT
     ----------------------------------------- */

  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });


  /* -----------------------------------------
     4. SCROLL REVEAL ANIMATION
     ----------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".feature-card, .pricing-card, .hero-content, .section-title, .demo-container, .faq-item"
  );

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    element.classList.add("reveal-hidden");
    revealObserver.observe(element);
  });


  /* -----------------------------------------
     5. AI DEMO
     ----------------------------------------- */

  const demoInput = document.querySelector("#ai-demo-input");
  const demoButton = document.querySelector("#ai-demo-button");
  const demoResponse = document.querySelector("#ai-demo-response");

  if (demoInput && demoButton && demoResponse) {

    demoButton.addEventListener("click", runDemo);

    demoInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        runDemo();
      }
    });

    function runDemo() {

      const question = demoInput.value.trim();

      if (!question) {
        demoInput.focus();
        return;
      }

      demoResponse.innerHTML = `
        <div class="demo-user">
          ${escapeHTML(question)}
        </div>

        <div class="demo-ai">
          <span class="ai-dot"></span>
          Nexora is thinking...
        </div>
      `;

      setTimeout(() => {

        demoResponse.innerHTML = `
          <div class="demo-user">
            ${escapeHTML(question)}
          </div>

          <div class="demo-ai">
            <strong>Nexora AI</strong>
            <p>
              Great question. Nexora can help you analyze,
              create, code and solve problems using AI.
            </p>
          </div>
        `;

      }, 900);
    }
  }


  /* -----------------------------------------
     6. PRICING TOGGLE
     ----------------------------------------- */

  const pricingToggle = document.querySelector("#pricing-toggle");

  if (pricingToggle) {

    pricingToggle.addEventListener("change", () => {

      const prices = document.querySelectorAll("[data-monthly]");

      prices.forEach(price => {

        const monthly = price.dataset.monthly;
        const yearly = price.dataset.yearly;

        price.textContent = pricingToggle.checked
          ? yearly
          : monthly;

      });

    });
  }


  /* -----------------------------------------
     7. FAQ ACCORDION
     ----------------------------------------- */

  document.querySelectorAll(".faq-question").forEach(question => {

    question.addEventListener("click", () => {

      const item = question.closest(".faq-item");

      if (!item) return;

      const alreadyOpen = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(other => {
        other.classList.remove("active");
      });

      if (!alreadyOpen) {
        item.classList.add("active");
      }

    });

  });


  /* -----------------------------------------
     8. COPY BUTTON
     ----------------------------------------- */

  document.querySelectorAll("[data-copy]").forEach(button => {

    button.addEventListener("click", async () => {

      const text = button.dataset.copy;

      try {

        await navigator.clipboard.writeText(text);

        const original = button.textContent;

        button.textContent = "Copied ✓";

        setTimeout(() => {
          button.textContent = original;
        }, 1500);

      } catch (error) {
        console.log("Copy failed");
      }

    });

  });


  /* -----------------------------------------
     9. BUTTON RIPPLE EFFECT
     ----------------------------------------- */

  document.querySelectorAll(
    "button, .btn, .cta-button"
  ).forEach(button => {

    button.addEventListener("click", function(e) {

      const ripple = document.createElement("span");

      ripple.className = "ripple";

      const rect = this.getBoundingClientRect();

      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

    });

  });


  /* -----------------------------------------
     10. CURSOR GLOW
     ----------------------------------------- */

  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {

    document.addEventListener("mousemove", e => {

      cursorGlow.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px)`;

    });

  }


  /* -----------------------------------------
     11. 3D CARD TILT
     ----------------------------------------- */

  document.querySelectorAll(".tilt-card").forEach(card => {

    card.addEventListener("mousemove", e => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -5;

      const rotateY =
        ((x - centerX) / centerX) * 5;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

    });

  });


  /* -----------------------------------------
     12. CURRENT YEAR
     ----------------------------------------- */

  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  /* -----------------------------------------
     13. ESCAPE USER INPUT
     ----------------------------------------- */

  function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
  }

});
