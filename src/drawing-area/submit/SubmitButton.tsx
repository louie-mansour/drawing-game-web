const SubmitButton = ({ completeDrawing }: { completeDrawing: () => void }) => {
  return (
    <button className="submit-drawing" onClick={completeDrawing} type="submit">
      Click to submit
    </button>
  )
}

export default SubmitButton
