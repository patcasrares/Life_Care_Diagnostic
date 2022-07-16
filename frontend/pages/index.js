import axios from 'axios'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Popup from '../components/popup';
import SidebarCategory from '../components/sidebarCategory';
import { useContextualRouting } from 'next-use-contextual-routing' 

function App() {

  const BASE_URL = "http://localhost:5000/breastCancer"
  const {makeContextualHref,returnHref} = useContextualRouting()
  const [image, setImage] = useState(null)
  const router = useRouter();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [verdict, setVerdict] = useState('')
  
  const makeDiagnostic = () => {
    const customHeader = {
      headers: {
        // Authorization: `Bearer ${getLocalStorageToken()}`,
        "Content-Type": 'multipart/form-data',
      },
    };

    var formData = new FormData();

    formData.append("image", image);
    formData.append("", "frontend");

   // alert(BASE_URL)
    axios.post(BASE_URL, formData, customHeader).then(response => {
      setVerdict(response.data)
      router.push(
        makeContextualHref({resource: "diagnostic", action: "diagnostic", verdict: response.data}), '/diagnostic', {shallow: true}
      );
    }).catch(error=>{
      console.log(error)
    })
  }

  const [openSubmenu,setOpenSubmenu] = useState(false)
 
  return (
    
    <div class="bg-blue-300 overflow-hidden flex flex-row min-h-screen bg-gray-100 text-gray-800">
      
      <aside
        class="sidebar w-80 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-800"
      >
        <div class="sidebar-header flex items-center justify-center py-4">
          <div class="inline-flex">
            <a href="#" class="text-green-500 inline-flex flex-row items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-10" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
            </svg>
              <span class="leading-10 text-green-500 text-2xl font-bold ml-1 uppercase">Life Care Diagnostic</span>
            </a>
          </div>
        </div>
        <div class="sidebar-content px-3 py-6">
          <ul class="flex flex-col w-full">
            <li class="my-px">
              <span class="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">Medical Diagnostics</span>
            </li>
            <SidebarCategory title="Breast Cancer Diagnostic" page="/"/>
            <SidebarCategory title="Skin Cancer Diagnostic" page="/skin"/>
            <SidebarCategory title="Survival Chances" page="/survival"/>
            <SidebarCategory title="Covid" page="/covid"/>
            <SidebarCategory title="Face Diagnostic" page="/video"/>
            <SidebarCategory title="Model Statistics" page="/statistics"/>
          </ul>
        </div>
      </aside>
      <main class="bg-blue-300 text-center items-center justify-center main h-screen overflow-hidden flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="mb-10 text-lg font-bold">Breast Cancer Diagnostic</div>
        <div class="rounded-3xl sm:w-full p-10 bg-white w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Patient's First Name
              </label>
              <input onChange={(e)=>{setFirstName(e.target.value)}} class={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white " + (firstName !=''? '' : ' border-red-500')} id="grid-first-name" type="text" placeholder="Jane"/>
              {firstName =='' && <p class="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Patient's Last Name
              </label>
              <input onChange={(e)=>{setLastName(e.target.value)}} class={"appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white " + (lastName !=''? '' : ' border-red-500')} id="grid-first-name" type="text" placeholder="Jane"/>
              {lastName =='' && <p class="text-red-500 text-xs italic">Please fill out this field.</p>}
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Radiography
              </label>
              <input class={"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " + (image? '' : ' border-red-500')} id="grid-password" onChange={(e)=>{setImage(e.target.files[0])}} type="file" placeholder="******************"/>
              {!image && <p class="text-red-500 text-xs italic">Insert the radiography here please</p>}
            </div>
          </div>
          <button onClick={makeDiagnostic} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Make diagnostic
          </button>
        </div>
        {(router.query.resource === "diagnostic") &&
          <Popup verdict={verdict} firstName={firstName} lastName={lastName} returnHref={returnHref}/> 
        }
      </main>
    </div>
  );
}

export default App;
