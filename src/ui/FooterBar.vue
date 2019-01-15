<template>
  <footer>
    <div class="container">
      <div class="columns">
        <div class="column is-1">
          <chevron/>
        </div>
        <div class="column">
          <div class="contact">
            <a class="phone" href="tel:8336774376">(833) OPS-HERO</a>

            <div class="address">2317 Broadway, Suite 130
              <br>Redwood City, CA 94063
            </div>

            <div class="social-links">
              <div>
                <ul>
                  <li class="social-link">
                    <a
                      href="https://www.linkedin.com/company/17928739"
                      role="menuitem"
                      target="_blank"
                      class="social-link__icon"
                      aria-label="Linkedin"
                    >
                      <span>Linkedin</span>
                    </a>
                  </li>
                  <li class="social-link">
                    <a
                      href="https://twitter.com/rundeck"
                      role="menuitem"
                      target="_blank"
                      class="social-link__icon"
                      aria-label="Twitter"
                    >
                      <span>Twitter</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="copyright">
              <span class="copyright-text">©2019 Rundeck. All Rights Reserved.</span>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </footer>
</template>
<script>
import Chevron from "@/ui/Chevron";

export default {
  name: "FooterBar",
  components: {
    Chevron
  }
};
</script>
<style lang="scss" scoped>
footer {
  flex: none;
  background-color: black;
  width: 100%;
  color: white;
  a {
    color: white;
  }
}
</style>
