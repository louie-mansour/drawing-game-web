const SubmitButton = ({ completeDrawing }: { completeDrawing: () => void }) => {
  return (
    <button onClick={completeDrawing} type="submit">
      Click to submit
    </button>
  )
}

export default SubmitButton
