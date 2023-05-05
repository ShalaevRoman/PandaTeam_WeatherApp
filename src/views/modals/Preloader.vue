<template>
  <div class="preloader-wrapper">
    <img
      class="preloader-img"
      src="../../assets/preloader.png"
      alt="preloader"
    >
  </div>
</template>

<script>
export default {
  name: 'PreloaderComponent'
}
</script>

<style scoped lang="scss">
.preloader-img {
  position: absolute;
  top: 70px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.preloader-img {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
