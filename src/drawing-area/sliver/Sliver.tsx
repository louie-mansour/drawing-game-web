import { FinishedDrawing } from '../DrawingArea'
import './sliver.scss'

const Sliver = ({ previousDrawing }: { previousDrawing: FinishedDrawing }) => {
  return (
    <div className="sliver">
      <img className="sliver__image" src={previousDrawing.base64Image} />
    </div>
  )
}

export default Sliver
