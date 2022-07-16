
export default function CovidSequential() {
 
  return (
    <div className="mb-2 pt-2 pb-2 h-full w-full">
      <div class="relative text-gray-500 text-lg mb-3 flex-auto">
        You can find more about Sequential 
        <a className="ml-1 text-blue-500" target="_blank" href="https://keras.io/guides/sequential_model/">
          Here
        </a>
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        We used spectral images for the classifier.
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        You can look down to see some spectral images
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        <img src="images/covidSpectograme.JPG"/>
        <img src="images/CovidSpec.JPG"/>
      </div>
      <div class="font-bold relative text-gray-500 text-lg flex-auto">
        Cross-validation was used to train the model.
      </div>
      <div class="ml-3 flot-left text-left relative text-gray-500 text-lg flex-auto">
        The dataset was split in this way:
        <ul>
          <li>60% for training.</li>
          <li>20% for validation.</li>
          <li>20% for testing.</li>
        </ul>
        <div class="font-bold">We evaluated the model on the testing set using the next metrics:</div>
        <ul>
          <li>Accuracy.</li>
          <li>Precision.</li>
          <li>Recall.</li>
          <li>FMeasure.</li>
        </ul>
        We repeated the process and evaluated it each time. We obtained the following confidence intervals:
        <ul>
          <li class="font-bold">Accuracy - (0.665, 0.758).</li>
          <li class="font-bold">Precision - (0.649, 0.719).</li>
          <li class="font-bold">Recall - (0.734, 0.927).</li>
          <li class="font-bold">FMeasure - (0.696, 0.796).</li>
        </ul>
        <div className='h-10'/>
      </div>
    </div>
  );
}
