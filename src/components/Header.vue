<template>
  <header class="header">
    <div class="header-logo__wrapper">
      <router-link
        class="header-logo__link"
        to="/"
      >
        <img
          class="header__logo-img"
          alt="logo"
          src="../assets/logo.png"
        >
      </router-link>
    </div>
    <div class="header-action__wrapper">
      <nav class="header-nav">
        <router-link
          class="header-nav__link"
          to="/"
        >
          {{ $t('headerNavHome') }}
        </router-link>
        <router-link
          class="header-nav__link"
          to="/favorites"
        >
          {{ $t('headerNavFavorite') }}
        </router-link>
      </nav>
      <div class="header-local">
        <a
          class="local-link"
          @click="setLocale('en')"
          href="#"
        >
          <flag
            iso="gb"
          />
        </a>
        <a
          class="local-link"
          @click="setLocale('ua')"
          href="#"
        >
          <flag
            iso="ua"
          />
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    setLocale (locale) {
      this.$i18n.locale = locale
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.header {
  .header-logo__wrapper {
    display: flex;
    justify-content: center;
    margin: 20px 0;

    .header-logo__link {
      .header__logo-img {
        width: 100px;
        height: 100px;
        cursor: pointer;
      }
    }
  }

  .header-local {
    display: flex;
    .local-link {
      text-decoration: none;
      span {
        cursor: pointer;
        border-radius: 50%;
        width: 30px;
        height: 20px;
        display: block;
        margin-right: 5px;
      }
    }
  }

  .header-action__wrapper {
    display: flex;
    justify-content: space-between;

    .header-nav :first-child {
      margin-right: 10px;
    }

    .header-nav {
      display: flex;
      flex-direction: row;

      .header-nav__link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 30px;
        background-color: initial;
        background-image: linear-gradient(-180deg, #018649, #175d3d);
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
        text-decoration: none;
        cursor: pointer;
        overflow: hidden;
        padding: 0 20px;
        pointer-events: auto;
        text-align: center;
        touch-action: manipulation;
        user-select: none;
      }
      .header-nav__link:hover {
        background: #00bd68;
      }
    }
  }

}

@media screen and (max-width: 460px) {
  .header {
    .header-nav {
      justify-content: space-between;
    }
  }
}
</style>
