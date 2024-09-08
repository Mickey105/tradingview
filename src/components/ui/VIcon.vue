<template>
  <i :class="['v-icon', { disabled: disabled }]">
    <svg
      :width="iconWidth"
      :height="iconHeight"
      class="icon-object"
      :style="styleObject"
    >
      <use :xlink:href="`/public/sprite.svg#${iconName}`"></use>
    </svg>
  </i>
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    required: false,
    default: 15,
  },
  height: {
    type: Number,
    required: false,
    default: 15,
  },
});

const styleObject = computed(() => {
  return { fill: props.color };
});

const iconName = computed(() => {
  let name = props.icon;
  if (props.selected && name === "Radio") {
    name = "RadioActive";
  }
  return name;
});

const iconWidth = toRefs(props).width;
const iconHeight = toRefs(props).height;
</script>

<style scoped>
.icon-object {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
}
</style>
