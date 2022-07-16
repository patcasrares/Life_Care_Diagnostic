import { useRouter } from "next/router"
import jsPDF from 'jspdf'

function savePDF(result) {
  var doc = new jsPDF('p', 'pt');
      
  doc.addFont('helvetica', 'normal')
  doc.text(20, 60, result, {
    maxWidth: 550
  })
     
  doc.save('breast.pdf')
}

function readDiagnostic(verdict) {
  if (verdict == '1')
    return "benign"
  if (verdict == '2')
    return "malign"
  if (verdict == '0')
    return `The patient has no tumour`
  return "";
}

export default function Popup({returnHref, firstName, lastName, verdict}) {
  const router = useRouter();
  var result = `The result for the patient ${firstName} ${lastName} is ` + "\n"
  result += readDiagnostic(String(verdict).charAt(0)) + " according to a ResNet made with adaptive learning rate with a probability of 85% \n";
  result += readDiagnostic(String(verdict).charAt(1)) + " according to ResNet with fixed learning rate with a probability of over 70%";
  
  const handleCancel = (e) => {
    router.push(returnHref)
  }
  return (
    <div>
      <div
        class="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
        id="modal-example-large">
        <div class="relative w-auto my-6 mx-auto max-w-6xl">
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div class="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
              <h3 class="text-3xl font-semibold">
                Result
              </h3>
              <button
                class="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onclick="toggleModal('modal-example-large')">
                <span class="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <i class="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div id="pdf">
              <div class="relative text-gray-500 text-lg p-6 flex-auto">
                <pre class="my-4 text-gray-500 text-lg leading-relaxed">
                  {result}
                </pre>
              </div>
            </div>
            <div class="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
              <button
                class="text-purple-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" onClick={handleCancel}>
                Close
              </button>
              <button
                class="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" onClick={()=>{savePDF(result)}}>
                Download Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex opacity-25 fixed inset-0 z-40 bg-black" id="modal-example-small-backdrop"></div>
    </div>
  )
}