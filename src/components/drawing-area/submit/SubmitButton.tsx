const SubmitButton = ({ completeDrawingPart }: { completeDrawingPart: () => void }) => {
  return (
    <button className="submit-drawing" onClick={completeDrawingPart} type="submit">
      Click to submit
    </button>
  )
}

export default SubmitButton
