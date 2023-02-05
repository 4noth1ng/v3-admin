import chooseIcon from './ChooseIcon'
import trend from './Trend'
import Menu from './InfinityMenu'
import ChooseArea from './ChooseArea'
import ChooseCity from './ChooseCity'
import ChooseTime from './ChooseTime'
import { App } from 'vue'
import ChooseDate from './ChooseDate'
import Form from './Form'
import ModalForm from './modalForm'
import Progress from './progress'
import DragableTable from './DragableTable'

const components = [
  chooseIcon,
  trend,
  Menu,
  ChooseArea,
  ChooseCity,
  ChooseDate,
  ChooseTime,
  Form,
  ModalForm,
  Progress,
  DragableTable
]

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item)
    })
  }
}