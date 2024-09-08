import React from 'react'

function Upload() {
  return (
    <dialog id="upload_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Upload Podcast</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>
  )
}

export default Upload