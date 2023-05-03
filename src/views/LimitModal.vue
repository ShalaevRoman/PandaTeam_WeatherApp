<template>
  <div class="modal-limit">
    <div class="modal-limit__content">
      <h1 class="content__title">
        Limit exceeded
      </h1>
      <p class="content__description">
        Delete an element to add a new one)
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
export default {
  name: 'LimitModal',
  methods: {
    deleteItem() {
      this.$emit('delete')
    },
    closeModal() {
      this.$store.commit('weatherData/SET_IS_LIMIT_STATE', false)
    }
  }
};
</script>

<style scoped lang="scss">
.modal-limit {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.modal-limit__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  height: 300px;
  width: 300px;
  overflow: auto;

  .content__description {
    font-family: 'Ultra', sans-serif;
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
