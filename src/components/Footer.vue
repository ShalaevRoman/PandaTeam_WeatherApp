<template>
  <div class="footer">
    <h1 class="footer-title">
      {{ $t('footerTitle') }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped lang="scss">
.footer-title {
  color: black;
  text-shadow: none;
  font-size: 12px;
}
</style>
