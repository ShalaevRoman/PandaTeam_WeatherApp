<template>
  <div class="modal-limit">
    <div class="modal-limit__content">
      <h1 class="modal-limit__title">
        {{ limitModalDescription.title }}
      </h1>
      <p class="modal-limit__description">
        {{ limitModalDescription.subTitle }}
      </p>
      <div class="content__action">
        <button
          @click="closeModal()"
          class="action-close"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import  { mapGetters } from 'vuex'

export default {
  name: 'LimitModal',
  methods: {
    closeModal() {
      this.$store.commit('weatherData/SET_IS_LIMIT_STATE', false)
    }
  },
  computed: {
    ...mapGetters('weatherData', ['limitModalDescription']),
  }
}
</script>

<style scoped lang="scss">
.modal-limit {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
}

.modal-limit__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: black;
  border-radius: 10px;
  height: 300px;
  width: 300px;
  overflow: auto;
  color: white;
  .modal-limit__description {
    color: white;
  }

  .content__action {
    display: flex;
    justify-content: space-between;
    button {
      font-family: 'Ultra', sans-serif;
      border-radius: 5px;
      border: 1.5px solid gray;
      padding: 5px;
      cursor: pointer;
      color: white;
    }
    .action-close {
      background: #8f3128;
    }
    .action-agree {
      background: #175d3d;
    }
  }
}
</style>
