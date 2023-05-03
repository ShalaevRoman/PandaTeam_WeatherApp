<template>
  <div class="modal">
    <div class="modal-content">
      <h1 class="modal-content__title">
        You are sure?
      </h1>
      <div class="modal-content__action">
        <button
          @click="closeModal()"
          class="action-close"
        >
          Close
        </button>
        <button
          @click="deleteItem()"
          class="action-agree"
        >
          Agree
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalComponent',
  methods: {
    deleteItem() {
      this.$emit('delete')
    },
    closeModal() {
      this.$store.commit('weatherData/SET_IS_OPEN_MODAL', false)
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
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

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  height: 300px;
  width: 300px;
  overflow: auto;

  .modal-content__action {
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
