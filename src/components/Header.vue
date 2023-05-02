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
    <nav class="header-nav">
      <router-link
        class="header-nav__link"
        to="/"
      >
        Home
      </router-link>
      <router-link
        class="header-nav__link"
        to="/favorites"
      >
        Favorites
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped lang="scss">
.header {
  .header-logo__wrapper {
    display: flex;
    justify-content: center;
    margin: 50px 0;

    .header-logo__link {
      .header__logo-img {
        width: 100px;
        height: 100px;
        cursor: pointer;
      }
    }
  }

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
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
      text-decoration: none;
      color: #FFFFFF;
      font-size: 20px;
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
</style>
