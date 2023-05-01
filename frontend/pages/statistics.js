import React from 'react';

import { useState } from 'react';
import SidebarCategory from '../components/sidebarCategory';

import Select from 'react-select'

import BreastResNet from '../components/explanations/breast/resNet'
import BreastSequential from '../components/explanations/breast/sequential';

import SkinSequential from '../components/explanations/skin/sequential';
import SkinResNet from '../components/explanations/skin/resNet';
import SurvivalLogistic from '../components/explanations/survival/logistic';
import CovidResNet from '../components/explanations/covid/resNet';
import CovidSequential from '../components/explanations/covid/sequential';
import CovidLogistic from '../components/explanations/covid/logistic';
import FaceResNet from '../components/explanations/face/resNet';
import FaceSequential from '../components/explanations/face/sequential';
import FaceLogistic from '../components/explanations/face/logistic';

const diagnostics = [
  { value: 'breast', label: 'Breast Cancer' },
  { value: 'skin', label: 'Skin Cancer' },
  { value: 'survival', label: 'Survival Chances' },
  { value: 'covid', label: 'Covid Diagnostic' },
  { value: 'face', label: 'Face Simptoms' }
]

function Statistics() {

  const [models, setModels] = useState([])
  
  const [diagnostic, setDiagnostic] = useState('');

  const [model, setModel] = useState('');

  const handleDiagnosticChange = (diagnostic) => {
    setDiagnostic(diagnostic);
    setModel(null);
    var options = [];
    if (diagnostic == 'breast' || diagnostic == "skin") {
      options = [
        { value: 'resnet', label: 'ResNet' },
        { value: 'sequential', label: 'Sequential' },
      ];
    };

    if (diagnostic == 'survival') {
      options = [
        { value: 'logistic', label: 'Logistic Regression' },
      ];
    };

    if (diagnostic == 'covid' || diagnostic == "face") {
      options = [
        { value: 'resnet', label: 'ResNet' },
        { value: 'sequential', label: 'Sequential' },
        { value: 'logistic', label: 'Logistic Regression' },
      ];
    };

    setModels(options);
  }
 
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
      <main class="overflow-y-scroll p-5 bg-white main h-screen overflow-hidden flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="text-lg font-bold text-center w-full">Model Statistics</div>
        Please choose the model you want to see
        <div className="flex mt-3">
          <div className="w-1/2">
            <div className="font-bold">Please choose the diagnostic</div>
            <Select className="w-5/6" options={diagnostics} onChange={(e)=>{handleDiagnosticChange(e.value)}} />
          </div>

          <div className="w-1/2">
            <div className="font-bold">Please choose the model</div>
            <Select value={model} className="w-5/6" options={models} onChange={(e) => {setModel(e)}} />
          </div>
        </div>
        {(diagnostic == 'breast') &&
          <>
            {(model && model.value == 'resnet') &&
              <BreastResNet/>
            }
            {(model && model.value == 'sequential') &&
              <BreastSequential/>
            }
          </>
        }
        {(diagnostic == 'skin') &&
          <>
            {(model && model.value == 'resnet') &&
              <SkinResNet/>
            }
            {(model && model.value == 'sequential') &&
              <SkinSequential/>
            }
          </>
        }

        {(diagnostic == 'survival') &&
          <>
            {(model && model.value == 'logistic') &&
              <SurvivalLogistic/>
            }
          </>
        }

        {(diagnostic == 'covid') &&
          <>
            {(model && model.value == 'resnet') &&
              <CovidResNet/>
            }
            {(model && model.value == 'sequential') &&
              <CovidSequential/>
            }
            {(model && model.value == 'logistic') &&
              <CovidLogistic/>
            }
          </>
        }

        {(diagnostic == 'face') &&
          <>
            {(model && model.value == 'resnet') &&
              <FaceResNet/>
            }
            {(model && model.value == 'sequential') &&
              <FaceSequential/>
            }
            {(model && model.value == 'logistic') &&
              <FaceLogistic/>
            }
          </>
        }
      </main>
    </div>
  );
}

export default Statistics;
