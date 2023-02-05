<template>
  <div :class="{ isScrollStyle: props.isScroll == true }">
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <slot name="default">
          <c-form
            :options="props.options"
            label-width="100px"
            ref="form"
            @on-change="props.onChange"
            @before-upload="props.beforeUpload"
            @on-preview="props.onPreview"
            @on-remove="props.onRemove"
            @before-remove="props.beforeRemove"
            @on-success="props.onSuccess"
            @on-exceed="props.onExceed"
          >
            <template #uploadArea>
              <slot name="trigger"></slot>
            </template>
            <template #uploadTip>
              <slot name="tip"></slot>
            </template>
          </c-form>
        </slot>
      </template>
      <template #footer>
        <slot name="footer" :form="form"> </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { FormOptions } from '../../Form/src/types/types'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  onChange: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onExceed: {
    type: Function
  },
  isScroll: {
    type: Boolean,
    default: true
  }
})
const form = ref()
const emits = defineEmits(['update:dialogVisible'])
const dialogVisible = ref(props.dialogVisible)
watch(
  () => props.dialogVisible,
  (newVal) => {
    dialogVisible.value = newVal
    console.log('props.dialogVisible:' + newVal)
  }
)
watch(dialogVisible, (newVal) => {
  if (!newVal) {
    emits('update:dialogVisible', newVal)
    console.log('dialogVisible:' + newVal)
    console.log(props.dialogVisible)
  }
})
</script>

<style scoped lang="scss">
.isScrollStyle {
  :deep(.el-dialog) {
    overflow: scroll;
    height: 450px;
  }
}
</style>
