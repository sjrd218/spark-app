<template>
  <span>
    <svg
      class="logo-image"
      width="159"
      height="23"
      viewBox="0 0 159 23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#F7403A">
        <path
          d="M0 21.065h13.404l2.501-3.945H2.501zM15.905 5.286L13.404 1.34H0l2.501 3.945zM18.406 9.23H5.002l1.25 1.973-1.25 1.973h13.404l1.25-1.973z"
        ></path>
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  name: "Chevron"
};
</script>

<style scoped lang="scss">
.logo-image [fill] {
  // fill: #fff !important;
}
.spark {
  color: #e34f43;
  display: inline-block;
  position: absolute;
  i {
    font-size: 1.5em;
    padding-left: 0.25em;
  }
}
</style>
