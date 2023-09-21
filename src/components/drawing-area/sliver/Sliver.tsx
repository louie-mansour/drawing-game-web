import { FinishedDrawingPart } from '../DrawingArea'
import './sliver.scss'

const Sliver = ({ previousDrawingPart }: { previousDrawingPart: FinishedDrawingPart }) => {
  return (
    <div className="sliver">
      <img className="sliver__image" src={previousDrawingPart.base64Image} />
    </div>
  )
}

export default Sliver
