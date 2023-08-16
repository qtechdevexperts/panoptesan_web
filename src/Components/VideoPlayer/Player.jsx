import ReactPlayer from "react-player";
//import Editor from "react-video-editor";

export const Player = (props) => {
  
  const video = {
    path : props.path, 
    title : props.title
  }
  
  const handleEdit = (event) => {
    console.log('handle edit on player.jsx called', video)
    handleClose();
    props.edit(event, video)
  }

  const handleClose = () => {
    props.change();
  };
  return (
    <div
      className="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg h-max w-max">
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '1px'}}>
            
            <div style={{position: 'relative', width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'end'}}>
              <div style={{marginLeft: '10px', marginBottom: '4px'}}>
                <p style={{fontSize: '25px'}} className="font-bold text-start text-xl">{props.title}</p>
              </div>
              </div>

            <div style={{position: 'relative', width: '50%', display: 'flex', justifyContent: 'end'}}>
                  <button
                      type="button"
                      style={{backgroundColor: '#44B241', marginRight: '5px'}}
                      className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleEdit}
                    >
                      Edit Video
                  </button>

                  <button
                      type="button"
                      style={{backgroundColor: '#E23939', marginRight: '10px'}}
                      className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleClose}
                    >
                      Download
                  </button>
            </div>

            </div>
            <ReactPlayer url={props.path} controls={true} width="340" />

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                style={{backgroundColor: '#17a2b8', marginRight: '-15px'}}
                className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
