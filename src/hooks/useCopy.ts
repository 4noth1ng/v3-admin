import { ElMessage } from 'element-plus'
export const useCopy = (text: string) => {
  let input = document.createElement('input')
  input.value = `<el-icon><${text} /></el-icon>`
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage.success('ε€εΆζε')
}
