import { reactive } from "vue";

const eventBus = reactive({
  events: {},

  // Emit an event with data
  emit(event, data) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].forEach((callback) => callback(data));
  },

  // Listen to an event
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  // Remove a listener
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  },
});

export default eventBus; // Ensure you are exporting the default
